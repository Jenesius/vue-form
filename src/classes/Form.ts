import grandObject from "../utils/grand-object";
import mergeObjects from "../utils/merge-objects";
import EventEmitter from "jenesius-event-emitter";
import FormEvent from "./FormEvent";
import {getCurrentInstance, inject as injectVue, provide as provideVue} from "vue";
import getPropFromObject from "../utils/get-prop-from-object";
import debug from "../debug/debug";
import getCastObject from "../utils/get-cast-object";
import copyObject from "../utils/copy-object";
import {compareDifference, compareDTO, CompareItem, compareMergeChanges} from "../utils/compare-changes";
import DependencyQueue from "./DependencyQueue";
import CompareEvent from "./CompareEvent";
import {FormSetValuesOptions} from "../types";
import isEndPointValue from "../utils/is-end-point-value";
import splitName from "../utils/split-name";
import isEmptyObject from "../utils/is-empty-object";
import concatName from "../utils/concat-name";
import checkNameInObject from "../utils/check-name-in-object";
import insertByName from "../utils/insert-by-name";
import recursiveRemoveProp from "../utils/recursive-remove-prop";

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
    static EVENT_NAME = 'form-event'
    static PROVIDE_NAME = 'form-controller';
    static EVENT_CHANGE = 'change';
    static EVENT_VALUE = 'value';
    
    static getParentForm() {
        return injectVue<Form | undefined>(Form.PROVIDE_NAME, undefined);
    }
    
    static getEventValueByName(name: string) {
        return `${Form.EVENT_VALUE}:${name}`
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
    
    get TEST_PURE_VALUE() {
        return this.#values;
    }
    
    /**
     * @warning НЕ РАБОТАЕТ С РОДИТЕЛЕМ. ПРИ РАБОТЕ ЧЕРЕЗ CHILD БУДУТ ВОЗНИКАТЬ ОШИБКИ!!!
     * */
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
        
        console.log('%c[new-form]%c', 'color: blue', 'color:black', this.name, Form.getParentForm());
        if (currentInstance) {
            const parent = Form.getParentForm();
            if (parent)
                parent.subscribe(this);
        }
        if (params.provide !== false && currentInstance) provideVue(Form.PROVIDE_NAME, this); // Default providing current form for children.
    }
    
    private isTargetOptions<T extends Pick<FormSetValuesOptions, "target">>(options: Partial<FormSetValuesOptions>): options is T {
        return Object.prototype.hasOwnProperty.call(options, 'target');
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
    
            options.executedFrom = Form.getTargetName(this);
        }
        
        // Текущий элемент имеет родителя - отправляем изменения наверх.
        if (this.parent) {
            console.log(`[%c${this.name}%c] emit changes to parent [%c${this.parent.name}%c]`, 'color: red', 'color: black', 'color: red', 'color: black');
            return void this.parent.setValues(values, options);
        }
        
        // Дошли до родительской формы. Теперь данные нужно завернуть и отправить вниз
        
        console.group('[SET VALUES]');
        
        console.log("%cOptions:", 'color: blue', options)
        console.log("%cValues:", 'color: blue', values)
        
        /**
         * Первый этап: Приводим переданные значения в приведённы вид.
         * */
        const grandValues = grandObject(values);
        
        console.log('%cGrand Object:', 'color: blue', grandValues);
        
        // По options функция возвращает ссылку на объект, которые изменяется
        function getTargetValue(this: Form) {
            const fieldName = concatName(options.executedFrom, options.target)
            return fieldName ? getPropFromObject(this.values, concatName(options.executedFrom, options.target)) : this.values;
        }
        
        const targetValues = getTargetValue.call(this)
        
        console.log('%cTarget Values:', 'color: blue', targetValues)
        
        // Если параметр clean, был передан, мы используем функцию полного сравнения, а не сравнения изменений.
        const compareResult = (options.clean ? compareDifference : compareMergeChanges)(targetValues, grandValues)
        .map(item => {
            item.name = concatName(options.executedFrom, options.target, item.name);
            return item;
        })
        
        // Пока используется для того, чтобы добавить CompareResult для executedFrom и target
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
            
            console.group('SUPER COMPARE')
            
            const test = superCompare.call(this, compareResult, concatName(options.executedFrom, options.target));
            compareResult.unshift(...test)
            
            console.log('SUPER COMPARE:', test);
            console.groupEnd();
    
        }
        
        
        console.log('%cCompare result', 'color: blue', compareResult)
        
        // В зависимости от того, есть ли параметр change, происходит изменение values, или changes
        // При этом важно помнить, что при change: true, изменения касаются только this.changes
        // В случае, когда change: false, изменения затрагивают как this.values, так и удаление полей из this.changes.
        // Т.к. туда передаётся CompareItem[], то все изменения уже просчитаны и нам нужно их просто спроецировать на объект.
        this.mergeValues(compareResult, options.change);
        
        // После того как изменения были спроецированы на формы, происходит создание события и уведомления всех дочерних
        // и выполнения внешних событий.
        
        const event = new CompareEvent(compareResult);
        
        console.log('%cEvent:', 'color: blue', event);
        console.log('%cNew Values', 'color: blue', this.values)
        
        console.group('DISPATCHING EVENT');
        this.dispatchEvent(event);
        console.groupEnd();
        
        console.groupEnd();
        
        
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
        
        console.group('MERGE VALUEs PROCESS')
        //if (isChange) return mergeObjects(this.changes, compareResult);
        
        // Упразднённым полем называется поле, которому установлено простое значение(конечное)
        const abolishNames: string[] = []
        
        compareResult
        .forEach(item => {
            
            // Ранее было установлено простое поле
            const isAbolish = abolishNames.find(name => (new RegExp(`^${name}\..*`)).test(item.name));
            
            if (isAbolish) return;
            
            // Если текущее значение - примитивное, а предыдущее нет - необходимо пометить данное поле как конечное, то
            // есть все дальнейшие(внутренние поля) - является упразднёнными и их не нужно проецировать на форму.
            if (isEndPointValue(item.newValue) && !isAbolish) abolishNames.push(item.name);
            
            if (isEndPointValue(item.newValue) || isEmptyObject(item.newValue)) {
                mergeObjects(isChange ? this.#changes : this.#values, grandObject({
                    [item.name]: item.newValue
                }))
            }
            
            // Если происходит изменения значений(не изменений), то мы должно аннулировать поля изменений(очищать их) на
            // которые было произведено влияние. Однако только на те, которые являются конечными точками, т.к. изменение
            // может затронуть лишь одно поле объекта, но при этом этот объект будет полностью помечен, как изменённый.
            if ((isEndPointValue(item.newValue) || isEndPointValue(item.oldValue)) && !isChange) {
                console.log(`%cReturn%c changes for %c${item.name}`, 'color: red', 'color: black', 'color: green');
                this.cleanChangesByField(item.name);
            }
            
        })
        
        console.log(compareResult);
        
        console.groupEnd()
        
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
    
    oninput(name: string, callback: (newValue: any) => void) {
        return this.on(Form.getEventValueByName(name), callback)
    }
    
    /**
     * @description Отправляет событие. Данный метод используется только для запуска события для себя и дочерних элементов.
     * Наша система построена так, что бы все значения идут от родителя к дочернему элементу (values, changes, event, other..)
     * */
    dispatchEvent<T extends FormEvent>(event: T) {
        
        if (event instanceof CompareEvent) {
            console.log(`[%c${this.name}%c]: %c${event?.comparison.length ? '' : 'NOT EFFECT'}%c`, 'color: red', 'color: black', 'color: purple', 'color: black', 'Dispatch event', event)
            
            // Проходим по всем дочерним элементам и уведомляем их
            this.dependencies.forEach(dep => {
                if (dep.name) {
                    dep?.dispatchEvent(CompareEvent.restoreByName(event, dep.name));
                }
            })
            
            event.comparison.forEach(item => {
                console.log(`[%c${this.name}%c] Emit new value event to %c${item.name}`, 'color: red', 'color: black', 'color: red');
                this.emit(Form.getEventValueByName(item.name), item.newValue);
            })
        }
    }
    
    cleanValues(values?: any) {
        debug.msg('Cleaning values')
        
        /**
         * WARNING WARNING WARNING WARNING WARNING
         * в данном случаем мы сперва устанавливаем пустое значение, а потому уже нужное.
         * Эффективнее сразу устанавливать нужно значение
         * WARNING WARNING WARNING WARNING WARNING
         * */
        
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
        recursiveRemoveProp(this.#changes, fieldName);
    }
    
    /**
     * @description Метод используется для очистки changes. Иными словами происходит просто очистка всех changes.
     * */
    revert() {
        console.log('Form: %crevert changes', 'color: purple');
    
        if (this.parent) return void this.parent.cleanChangesByField(this.name as string);
        this.#changes = {};
    }
    
    /**
     * @description Method check field on changed status. Return true if changes include some values for provided fieldName.
     * */
    checkFieldChange(fieldName: string) {
        return checkNameInObject(this.changes, fieldName);
    }
}

interface FormParams {
    name: string,
    provide: boolean
}

interface FormDependence {
    change(data: any): void,
    
    setValues(data: any): void,
}

