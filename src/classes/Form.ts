import grandObject from "../utils/grand-object";
import mergeObjects from "../utils/merge-objects";
import EventEmitter from "jenesius-event-emitter";
import FormEvent from "./FormEvent";
import {getCurrentInstance, inject as injectVue, provide as provideVue} from "vue";
import getPropFromObject from "../utils/get-prop-from-object";
import debug from "../debug/debug";
import copyObject from "../utils/copy-object";
import {compareDifference, compareDTO, CompareItem, compareMergeChanges} from "../utils/compare-changes";
import DependencyQueue from "./DependencyQueue";
import CompareEvent from "./CompareEvent";
import {FormAvailability, FormSetValuesOptions, OnFunction} from "../types";
import splitName from "../utils/split-name";
import isEmptyObject from "../utils/is-empty-object";
import concatName from "../utils/concat-name";
import checkNameInObject from "../utils/check-name-in-object";
import insertByName from "../utils/insert-by-name";
import recursiveRemoveProp from "../utils/recursive-remove-prop";
import runPromiseQueue from "../utils/run-promise-queue";
import isPrefixName from "../utils/is-prefix-name";
import findNearestNameFromArray from "../utils/find-nearest-name-from-array";
import findNearestPrefixFromArray from "../utils/find-nearest-prefix-from-array";
import AvailabilityEvent from "./AvailabilityEvent";
import bypassObject from "../utils/bypass-object";
import isIterablePoint from "../utils/is-iterable-point";

/**
 * Main principe : GMN
 * G - Grand
 * M - Merge
 * N - Notify
 * Важно помнить про данный принцип. Любой последующие этап не может быть вызван без предыдущего. Это значит, что перед
 * Merge(M) всегда должен быть выполнен и Grand(G), для Notify(N) всегда должны быть выполнены M и G соответственно.
 */

/**
 * @description Необходимо пометить один принцип: данные передаваемые в CompareItem нужно только для сохранения изменений.
 * Всё состояние формы лежит сугубо в форме.
 * */

export default class Form extends EventEmitter implements FormDependence {
    static PROVIDE_NAME = 'form-controller';
    static EVENT_VALUE = 'value';
    static EVENT_AVAILABLE = 'available'

    /**
     * @description Событие срабатывает, когда форма была изменена или наоборот очищена. В таком случае отдаёт true/false
     * в каком состоянии находится форма.
     * */
    static EVENT_CHANGED = 'changed'
    
    static getParentForm() {
        return injectVue<Form | undefined>(Form.PROVIDE_NAME, undefined);
    }
    
    static getEventValueByName(name: string) {
        return `${Form.EVENT_VALUE}:${name}`
    }
    static getEventAvailabilityByName(name: string) {
        return `${Form.EVENT_AVAILABLE}:${name}`
    }
    static restoreFullName<T extends { name?: string, parent?: Form }>(elem: T): string {
        if (elem.parent) return `${Form.restoreFullName(elem.parent)}.${elem.name}`;
        return elem.name || '';
    }
    
    static getTargetName<T extends { name?: string, parent?: any }>(elem: T): string {
        const array = [];
        
        let target = elem;
        while (target.parent) {
            array.unshift(target.name);
            target = target.parent;
        }
        
        return array.join('.');
    }
    
    /**
     * @description Name of Entity.
     * */
    name?: string
    /**
     * @description Внутренний объект изменений. Хранит в себе значения полей, которые были установлены, используя флаг
     * changes: true в методе setValues или используя метод change.
     * */
    #changes = {};
    get changes(): any {
        if (this.parent) return getPropFromObject(this.parent.changes, Form.getTargetName(this));
        return this.#changes;
    }
    
    #values = {}
    get values(): any {
        if (this.parent) {
            return this.parent.getValueByName(this.name as string) || {};
        }
        return mergeObjects({}, this.#values, this.#changes)
    };
    /**
     * @description Чистые значения формы. Которые изменяются при помощи setValues без опции change.
     * */
    get pureValues():any {
        if (this.parent) return getPropFromObject(this.parent.pureValues, this.name as string) || {}
        return this.#values;
    }
    
    get TEST_PURE_VALUE() {
        return this.#values;
    }
    
    private set values(values: any) {
        this.setValues(values, {
            clean: true
        });
    }
    
    dependencies = new DependencyQueue(this)
    
    #parent: Form | undefined;
    get parent() {
        return this.#parent
    };
    
    set parent(parent: Form | undefined) {
        this.#parent = parent;
    }
    
    constructor(params: Partial<FormParams> = {}) {
        super();
        
        this.name = params.name;
        const currentInstance = !!getCurrentInstance();
        
        debug.msg(`new form %c${Form.restoreFullName(this)}%c`, debug.colorName, debug.colorDefault, this);
        if (currentInstance) {
            const parent = Form.getParentForm();
            if (parent && !(params.parent === false || params.parent === null)) {
                parent.subscribe(this);
            }
        }
        if (params.provide !== false && currentInstance) provideVue(Form.PROVIDE_NAME, this); // Default providing current form for children.
    }
    
    setValues(values: any, options: Partial<FormSetValuesOptions> = {}): void {
        
        /*
        Неправильно!
        В данном случае target используется только для значения, а затем удаляется.
        С таким же успехом можно просто в values передавать {[target]: values}
        Тем самым мы убираем ту мощь, которая была возложена на target.
        Target должен оставаться в option и влиять на то, какие значения будут меняться.
        
        Так же будет полезен следующий метод:
        if (!checkNameInObject(values, target)) insertByName(values, target)
         */
        
        if (!options.executedFrom) {
            debug.msg(`Executed from not founded in options, values will be %c${Form.getTargetName(this)}`, debug.colorSuccess)
            options.executedFrom = Form.getTargetName(this);
        }
        
        // Текущий элемент имеет родителя - отправляем изменения наверх.
        if (this.parent) {
            debug.msg(`%c${this.name}%c emit changes to parent [%c${this.parent.name}%c]`, debug.colorName, debug.colorDefault, debug.colorFocus,debug.colorDefault);
            return void this.parent.setValues(values, options);
        }
        
        // Дошли до родительской формы. Теперь данные нужно завернуть и отправить вниз
        
        debug.group('SET VALUES');
        
        debug.msg("%cOptions:", debug.colorFocus, options)
        debug.msg("%cValues:", debug.colorFocus, values)
        
        /**
         * Первый этап: Приводим переданные значения в приведённы вид.
         * */
        const grandValues = grandObject(values);
        
        debug.msg('%cGrand Object:', debug.colorFocus, grandValues);
        
        // По options функция возвращает ссылку на объект, которые изменяется
        function getTargetValue(this: Form) {
            const fieldName = concatName(options.executedFrom, options.target);

            /**
             * @description Это неверный подход. Он чётче может сказать что изменилось, но точно не правильнее.
             * Предыдущее значение всегда должно браться только из values.
             * */
            // Если имеется change и clean - то мы не работаем с values, т.к. к нему примешены другие changes.
            //const values = (options.change && options.clean) ? this.pureValues : this.values;
            
            const values = this.values;
            
            return fieldName ? getPropFromObject(values, concatName(options.executedFrom, options.target)) : values;
        }
        
        const targetValues = getTargetValue.call(this)
        
        debug.msg('%cTarget Values:', debug.colorFocus, targetValues)
        
        // Если параметр clean, был передан, мы используем функцию полного сравнения, а не сравнения изменений.
        // Сливаем ExecutedFrom Target Name
        const compareResult = (options.clean ? compareDifference : compareMergeChanges)(targetValues, grandValues)
        .map(item => {
            item.name = concatName(options.executedFrom, options.target, item.name);
            return item;
        })

        /**
         * @description Т.к.есть механизм executedBy и target мы к compareResult должны добавить родительские изменения,
         * которые автоматически затрагиваются при изменении дочерних.
         * */
        function superCompare(this: Form, compareResult: CompareItem[], superName: string): CompareItem[] {
            const copy = copyObject(this.values);
            compareResult.forEach(data => {
                insertByName(copy, data.name, data.newValue);
            })
            // copy - end object.
            return splitName(superName)
            .map((name, index, arr) => {
                const fieldName = concatName(...arr.slice(0, index + 1));
    
                return compareDTO(fieldName, getPropFromObject(copy, fieldName), this.getValueByName(fieldName))
            });
        }
        
        // Если существует target, необходимо также для него добавить изменения в compareResult.
        // Для этого, мы разбиваем поле target и для каждого вложенного элемента вставляем CompareItem.
        // Разумеется это всё делать надо только в том случае, если compareResult не пустой
        if ((options.target || options.executedFrom) && compareResult.length) {
            
            debug.group('SUPER COMPARE')

            const test = superCompare.call(this, compareResult, concatName(options.executedFrom, options.target));
            compareResult.unshift(...test)
            
            debug.msg('Result', test);
            debug.groupEnd();
        }


        debug.msg('%cCompare result', debug.colorFocus, compareResult)
        
        // В зависимости от того, есть ли параметр change, происходит изменение values, или changes
        // При этом важно помнить, что при change: true, изменения касаются только this.changes
        // В случае, когда change: false, изменения затрагивают как this.values, так и удаление полей из this.changes.
        // Т.к. туда передаётся CompareItem[], то все изменения уже просчитаны и нам нужно их просто спроецировать на объект.
        this.mergeValues(compareResult, options.change);

        /**
         * @description Если текущий процесс не является changed - мы проходим по конечным точкам значений и проверяем:
         * Если поле до сих пор находится в статусе change -> мы должны подтвердить данное изменение и переместить их на
         * pureValues.
         * */
        if (!options.change) {
            const extendName = concatName(options.executedFrom, options.target)
            const extendValues = extendName ? {[extendName]: values} : values;

            bypassObject(extendValues)
            .forEach(point => {
                if (this.checkFieldChange(point.name))
                    this.acceptChanges(point.name)
            })
        }

        // После того как изменения были спроецированы на формы, происходит создание события и уведомления всех дочерних
        // и выполнения внешних событий.
        
        const event = new CompareEvent(compareResult);

        debug.msg('%cNew Values', debug.colorFocus, this.values)

        debug.group('DISPATCHING EVENT');
        this.dispatchEvent(event);
        debug.groupEnd();

        debug.groupEnd();
    }
    /**
     * @description Метод для принятия изменения и переноса их в pureValues
     * */
    acceptChanges(name?: string) {
        if (name) {

            if (!checkNameInObject(this.changes, name)) {
                debug.msg(`%cCan't accept%c changes for %c${name}%c, field not founded in changes.`,
                    debug.colorError, debug.colorDefault, debug.colorName, debug.colorDefault)
                return;
            }


            debug.msg(`%caccept%c changes for ${name}`, debug.colorSuccess, debug.colorDefault)
            const values = getPropFromObject(this.changes, name);

            recursiveRemoveProp(this.#changes, name);
            insertByName(this.#values, name, values);
        } else {
            mergeObjects(this.#values, this.#changes);
            this.#changes = {};
        }

    }
    
    /**
     * @description Метод проецирует цепочку изменений на форму.
     * @param compareResult {CompareItem[]} массив изменений, которые необходимо спроецировать
     * @param isChange {Boolean} флаг, указывающий какого типа будут изменения. В случае, если true, то изменения
     * проецируются только на changes, в противно случае: проецируются на values, но стирают часть changes, которая была
     * затронута.
     * */
    private mergeValues(compareResult: CompareItem[], isChange: boolean = false) {
        // Как раз определить, какая часть changes была затронута - самое сложное
        
        debug.group('MERGE VALUES PROCESS')
        //if (isChange) return mergeObjects(this.changes, compareResult);
        
        // Упразднённым полем называется поле, которому установлено простое значение(конечное)
        const abolishNames: string[] = []
        
        compareResult
        .forEach(item => {
            
            // Ранее было установлено простое поле
            // const isAbolish = abolishNames.find(name => (new RegExp(`^${name}\..*`)).test(item.name));
            const isAbolish = abolishNames.find(name => isPrefixName(item.name, name));

            if (isAbolish) {
                debug.msg(`Field is %cskipped%c %c${item.name}%c because its child field was previously set.`,
                    debug.colorError, debug.colorDefault, debug.colorName, debug.colorDefault);
                return;
            }
            
            // Если текущее значение - примитивное, а предыдущее нет - необходимо пометить данное поле как конечное, то
            // есть все дальнейшие(внутренние поля) - является упразднёнными и их не нужно проецировать на форму.
            if (!isIterablePoint(item.newValue) && !isEmptyObject(item.newValue) && !isAbolish) abolishNames.push(item.name);
            
            if (!isIterablePoint(item.newValue)) {
                mergeObjects(isChange ? this.#changes : this.#values, grandObject({
                    [item.name]: item.newValue
                }))
            }
            
            // Если при изменении новое значение совпадает со значением, находящимся в pureValues. Это означает, то
            // Что новое значение эквивалентно значению по умолчанию.
            // В таком случае рекурсивно чистим значение
            if (isChange && !isIterablePoint(item.newValue) && item.newValue === getPropFromObject(this.pureValues, item.name)) {
                recursiveRemoveProp(this.#changes, item.name)
            }
            
            // Если процесс изменения и значения для поля undefined, а такого значения нет в pureValue,
            // то и смысла в этом поле - нет, т.к. оно не имеет значения и не определено в pureValues. Происходит
            // рекурсивная очистка поля.
            if (isChange && item.newValue === undefined && !checkNameInObject(this.pureValues, item.name)) {
                debug.msg(`Removing useless field %c${item.name}%c from changes.`, debug.colorError, debug.colorDefault);
                recursiveRemoveProp(this.#changes, item.name)
            }
            
            // Если происходит изменения значений(не изменений), то мы должно аннулировать поля изменений(очищать их) на
            // которые было произведено влияние. Однако только на те, которые являются конечными точками, т.к. изменение
            // может затронуть лишь одно поле объекта, но при этом этот объект будет полностью помечен, как изменённый.
            if (
                ((!isIterablePoint(item.newValue) || !isIterablePoint(item.oldValue)) && !isChange)
                // || (item.newValue === undefined && isChange)
            ) {
                debug.msg(`%cRevert%c changes for %c${item.name}%c`,
                    debug.colorError, debug.colorDefault, debug.colorName, debug.colorDefault
                    );
                // this.cleanChangesByField(item.name);
                recursiveRemoveProp(this.#changes, item.name)
            }
            
        })
        

        debug.groupEnd()
        
    }
    
    getValueByName(name: string) {
        return getPropFromObject(this.values, name);
    }
    
    /**
     * @description Method using for change form's values. Current function is mnemonic for
     * *form.setValues(value, {change: true})* and just using for shortest form.
     * */
    change(data: any, options: Partial<Omit<FormSetValuesOptions, "change">> = {}) {
        const changeOption: Partial<FormSetValuesOptions> = options
        changeOption.change = true;
        this.setValues(data, changeOption);
    }
    
    /**
     * @description Return true if form includes changes, otherwise false.
     * */
    get changed() {
        return !!(this.changes && Object.keys(this.changes).length !== 0);
    }
    
    subscribe(element: any) {
        this.dependencies.add(element);
        return this.unsubscribe.bind(this, element);
    }
    
    unsubscribe(element: any) {
        this.dependencies.remove(element);
    }

    /**
     *
     * @param name - tracked field
     * @param callback
     * @description The method fires every time the given field has been changed.
     */
    oninput(name: string, callback: (newValue: any) => void) {
        return this.on(Form.getEventValueByName(name), callback)
    }
    onvalue(callback: (data: CompareItem) => void) {
        return this.on(Form.EVENT_VALUE, callback);
    }
    /**
     * @description Отправляет событие. Данный метод используется только для запуска события для себя и дочерних элементов.
     * Наша система построена так, что бы все значения идут от родителя к дочернему элементу (values, changes, event, other..)
     * */
    dispatchEvent<T extends FormEvent>(event: T) {
        
        
        if (event instanceof CompareEvent) {
            debug.msg(`[%c${Form.restoreFullName(this)}%c] %c${event?.comparison.length ? 'found updates' : 'not effect'}%c`,
                debug.colorName, debug.colorDefault,
                debug.colorFocus, debug.colorDefault,
                event?.comparison.length ? event : ''
                )

            if (event.comparison.length) this.emit(Form.EVENT_CHANGED, this.changed);

            // Проходим по всем дочерним элементам и уведомляем их
            this.dependencies.forEach(dep => {
                if (dep.name) {
                    dep?.dispatchEvent?.(CompareEvent.restoreByName(event, dep.name));
                }
            })
            // Проходим по всем изменениям и уведомляем их
            event.comparison.forEach(item => {
                debug.msg(`[%c${this.name}%c] Emit new value to %c${item.name}`, debug.colorName, debug.colorDefault, debug.colorName);
                this.emit(Form.getEventValueByName(item.name), item.newValue);
                this.emit(Form.EVENT_VALUE, item);
            })
        }
        
        if (event instanceof AvailabilityEvent) {
            debug.msg(`%c${Form.getTargetName(this)}%c handle AvailabilityEvent.`, debug.colorName, debug.colorDefault, event);

            if (event.newAvailability !== event.oldAvailability) {
                this.emit(Form.EVENT_AVAILABLE, event.newAvailability);
            }

            // Все dependencies
            this.dependencies.forEach(dep => {
                if (dep.name) {
                    dep?.dispatchEvent?.(AvailabilityEvent.restoreByName(event, dep.name))
                }
            })
            
            // ПРОХОД ПО СУЩЕСТВУЮЩИМ СОБЫТИЯМ
            Object
            .keys(this.events)
            .forEach(eventName => {
                const eventFieldName = /^available:(.*)/.exec(eventName)?.[1]; // Имя поля для которого есть обработчик
                if (!eventFieldName) return;
                const [sourceAv, oldAv] = AvailabilityEvent.GetFieldAvailability(event, eventFieldName);
                // Получаем ближайшее поле для текущего и его значение
                if (sourceAv !== oldAv) {
                    debug.msg(`Availability field %c${eventFieldName}%c: ${sourceAv} -> ${oldAv}.`, debug.colorName, debug.colorDefault);
                    this.emit(eventName, sourceAv) // Если состояние поменялось - уведомляем об этом
                }
            })
        }
    }
    
    cleanValues(values?: any) {
        debug.msg('Cleaning values')
        
        this.values = values || {};
    }
    
    /**
     * @description Отменяет изменения для переданного поля. Данная функция работает только с объектом changes и не
     * затрагивает объект values. Если в дочернее свойство объекта changes является объектом, но при этом количество
     * дочерних ключей равно 0, данной свойство полностью удаляется из объекта changes.
     * @param {String} fieldName Имя поля, для которого необходимо убрать статус 'changed'. В данном случае, изменение
     * для данного поля будет стёрто из объекта changes.
     * */
    cleanChangesByField(fieldName: string): void {
        if (this.parent) return void this.parent.cleanChangesByField(concatName(this.name, fieldName));
        
        // Если значение есть в pureValues - устанавливаем его
        // Иначе undefined
        this.setValues({
            [fieldName]: checkNameInObject(this.pureValues, fieldName) ? getPropFromObject(this.pureValues, fieldName) : undefined
        }, {
            change: true,
        })
        
    }
    
    /**
     * @description Метод используется для очистки changes. Иными словами происходит просто очистка всех changes.
     * */
    revert() {
        debug.msg('revert changes');

        if (this.parent) return void this.parent.cleanChangesByField(this.name as string);
        
        this.setValues(this.pureValues, {
            change: true,
            clean: true
        })
        
    }
    
    /**
     * @description Method check field on changed status. Return true if changes include some values for provided fieldName.
     * */
    checkFieldChange(fieldName: string) {
        return checkNameInObject(this.changes, fieldName);
    }
    
    /**
     * @description Method using for clear field. Dont set NULL. Remove field from values.
     * @example
     * { address: { city: 'Some' }, name: 'jack' } clearField('address')
     * {name: 'jack'}
     * */
    cleanField(fieldName: string) {
        
        this.setValues({
            [fieldName]: undefined
        })
        
        //deletePropByName(this.values, name);
        //deletePropByName(this.#changes, name);
        //this.cleanChanges(this.#changes);
    }
    
    
    /**
     * FRONT FORM LEVEL
     * */
    static EVENT_VERSION = 'form-version';
    #version: any;
    set version(data: any) {
        this.#version = data;
        this.emit(Form.EVENT_VERSION, this.version)
    }
    get version() {
        return this.#version;
    }
    onversion(callback: OnFunction<Form['version']>) {
        return this.on(Form.EVENT_VERSION, callback)
    }
    
    static EVENT_ID = 'form-id'
    #id: any;
    set id(data: any) {
        this.#id = data;
        this.emit(Form.EVENT_ID, this.id)
    }
    get id() {
        return this.#id;
    }
    onid(callback: OnFunction<Form['id']>) {
        return this.on(Form.EVENT_ID, callback)
    }

    static EVENT_WAIT = 'wait'
    #wait: boolean = false;
    set wait(v: boolean) {
        this.#wait = v;
        this.emit(Form.EVENT_WAIT, this.#wait);
    }
    get wait() {
        return this.#wait;
    }
    
    
    static EVENT_READ = 'read'
    /**
     * @description Function for read data (For example from DataBase)
     */
    #readData: FunctionHandleData = () => Promise.resolve();

    /**
     * @description Method takes read functions from all children elements, and
     * run it
     */
    get read() {
        debug.msg(`Reading data`);
        
        const array: FunctionHandleData[] = [];
        
        array.push(() => this.wait = true);
        array.push(
            ...this.dependencies.reduce((acc:any[], elemController:any) => {
                if (typeof elemController.read === 'function') acc.push(elemController.read.bind(elemController));
                return acc;
            }, [])
        )
        array.push(() => this.#readData?.());
        array.push((data:any) => this.emit(Form.EVENT_READ, data));
    
        return () => runPromiseQueue(array).finally(() => this.wait = false);
        
    }
    set read(callback: FunctionHandleData){
        this.#readData = callback;
    }
    
    static EVENT_SAVE = 'save'
    /**
     * @description Function for save data (Update/Create)
     */
    #saveData: FunctionHandleData | null = null;
    /**
     * @description The same with read. After saving run cleanChanges.
     */
    get save() {
        debug.msg(`Saving data`);
        const array: FunctionHandleData[] = [];
        
        array.push(() => this.wait = true);
        array.push(...this.dependencies.reduce((acc: Array<FunctionHandleData>, elemController: any) => {
            if (typeof elemController.save === 'function') acc.push(elemController.save.bind(elemController));
            return acc;
        }, []))

        if (this.#saveData || !this.parent) {
            array.push(() => this.#saveData?.())
            array.push((data: any) => this.emit(Form.EVENT_SAVE, data));
            /**
             * After success saving changes will be merged(overwrite) with values.
             * Is Bug: https://github.com/Jenesius/vue-form/issues/149
             * */
            array.push(this.acceptChanges.bind(this, undefined));
        }

        
        return () => runPromiseQueue(array).finally(() => this.wait = false);
    }
    set save(callback: FunctionHandleData) {
        this.#saveData = callback;
    }
    
    /**
     * @description The Boolean disabled attribute, when present, makes the element not mutable, focusable,
     * or even submitted with the form.
     * @return {Boolean} isDisabled
     * */
    #isAvailable: boolean = true
    set isAvailable(v: boolean) {
        this.#isAvailable = v;
    }
    get isAvailable() {
        return this.#isAvailable
    }

    get disabled() {
        return !this.enabled;
    }
    get enabled() {
        if (this.parent) return !this.parent.checkFieldDisable(this.name as string);
        return this.isAvailable;
    }

    onavailable(callback: (disabled: boolean) => any): any
    onavailable(fieldName: string, callback: (disabled: boolean) => any): any
    onavailable(arg1: ((disabled: boolean) => any) | string, arg2?: (disabled: boolean) => any):any {
        if (typeof arg1 === 'string') {
            if (!arg2) throw new Error('For named handler you need provided callback.');
            return this.on(Form.getEventAvailabilityByName(arg1), arg2);
        }

        return this.on(Form.EVENT_AVAILABLE, arg1);
    }
    disable(names?: string | string[]){
        debug.msg(`Disabling ${names || ''}`);
        this.available(false, (typeof names === "string" ? [names] : names) || [])
    }
    enable(names?: string | string[]) {
        debug.msg(`Enabling ${names || ''}`);
        this.available(true, (typeof names === "string" ? [names] : names) || [])
    }
    
    /**
     * Здесь принцип отличается от setValues. Он не является оптимизированным, однако является 100% рабочим.
     * В будущем будем оптимизировать.
     * Мы сперва строем выходной объект availability, а затем идём по dependencies и уведомляем их, если они были изменены.
     * Далее передаём объект в dispatchEvent.
     * */
    available(type: boolean, names: string[]):void {
        if (this.parent) return this.parent.available(type, names.length ? names.map(k => concatName(this.name, k)) : [this.name as string])
        debug.group(`AVAILABILITY %c${Form.getTargetName(this)}%c to %c${type}`, debug.colorName, debug.colorDefault, debug.colorFocus);

        const oldAvailable = this.isAvailable;
        if (names.length === 0) this.isAvailable = type;
        
        
        const copyAV = copyObject(this.#availabilities);

        /**MERGING DATA*/
        // Помечаем новые поля
        if (names.length) names.forEach(name => this.#availabilities[name] = true)
        else this.#availabilities = {}
        
        Object
        .keys(this.#availabilities)
        .forEach(key => {
            if ((names as string[]).find(name => isPrefixName(key, name) || name === key)) this.#availabilities[key] = type;
        })
        
        /**OPTIMIZATION*/
        const notOptimizeNames = Object.keys(this.#availabilities);

        notOptimizeNames
        .forEach(key => {
            const nearestAvailability = findNearestPrefixFromArray(notOptimizeNames, key);
            if (!nearestAvailability && this.#availabilities[key] === this.isAvailable) return  delete this.#availabilities[key];
            
            if (nearestAvailability) {
                if (this.#availabilities[nearestAvailability] === this.#availabilities[key] || this.#availabilities[nearestAvailability] === undefined)
                    return  delete this.#availabilities[key];
    
            }

        })

        debug.group('DISPATCHING EVENT');
        this.dispatchEvent(new AvailabilityEvent(this.#availabilities, copyAV, this.isAvailable, oldAvailable));
        debug.groupEnd();
        
        /**OPTIMIZATION END*/

        debug.groupEnd();
    }
    
    #availabilities: FormAvailability = {}
    
    get TEST_PURE_AVAILABILITIES() {
        return this.#availabilities;
    }
    /**
     * @description Вернёт true, если переданное поле является disabled.
     * */
    checkFieldDisable(fieldName: string): boolean {
        if (this.parent) return this.parent.checkFieldDisable(concatName(this.name, fieldName));
        const nearestName = findNearestNameFromArray(Object.keys(this.#availabilities), fieldName);
        if (!nearestName) return this.disabled;
        
        return !this.#availabilities[nearestName];
    }
    
    /**
     * @description Method using for validate form and all child items.
     * */
    validate(): boolean {
        const result = this.dependencies.reduce((acc, dep) => {
            const depValidationResult = (typeof dep.validate === "function") ?  dep.validate() : true;
            acc = acc && !!depValidationResult;
            return acc;
        }, true);
    
        debug.msg(`Validation %c${Form.getTargetName(this)}%c %c${result ? 'successful' : 'failed'}%c`,
            debug.colorName, debug.colorDefault,
            result ? debug.colorSuccess : debug.colorError, debug.colorDefault
        );
    
        return result;
    }

}

interface FormParams {
    name: string,
    provide: boolean,
    parent: Form | null | false
}

interface FormDependence {
    change(data: any): void,
    
    setValues(data: any): void,
}

export type FunctionHandleData = (...params: any) => Promise<any> | any | void;