import FormEvent from "./FormEvent";
import {FormAvailability} from "../types";
import isPrefixName from "../utils/is-prefix-name";
import findNearestNameFromArray from "../utils/find-nearest-name-from-array";


export default class AvailabilityEvent extends FormEvent{
    constructor(
        public sourceAvailabilities: FormAvailability,
        public oldAvailabilities: FormAvailability,
        
        public newAvailability: boolean = true,
        public oldAvailability: boolean = true
    ) {
        super('availability')

    }
    /**
     * @description Статическая функция, формирующая новые availability объект(event), но фильтруя сравнения по имени.
     * Используется для передачи только части объекта изменений в дочерний элемент.
     * */
    static restoreByName(event: AvailabilityEvent, name: string): AvailabilityEvent {
        // Вернёт объект только тех ключей, которые являются префиксом для запрошенного name.
        function get(availabilities: FormAvailability) {
            return Object
            .keys(availabilities)
            .filter(key => isPrefixName(key, name))
            .reduce((acc: FormAvailability, key) => {
                acc[key] = availabilities[key]
                return acc;
            }, {} )
        }
        
        const source = event.sourceAvailabilities;
        const old = event.oldAvailabilities;

        return new AvailabilityEvent(
            get(source),
            get(old),
            AvailabilityEvent.GetAvailability(source, name, event.newAvailability),
            AvailabilityEvent.GetAvailability(old, name, event.oldAvailability)
            )
    }
    /**
     * @description По переданному availabilities для нужного поля получает значение доступности. Третий параметр -
     * текущая доступность для целевого объекта.
     * */
    static GetAvailability(state: FormAvailability, name: string, defaultAvailability: boolean = true) {
        const nearestName = findNearestNameFromArray(name, Object.keys(state));
        return nearestName ? state[nearestName] : defaultAvailability;
    }
    
    /**
     * @description Более краткая форма для доступности. Используется для одного поля. Получает изменение доступности.
     * [Доступно ли поле сейчас, было ли оно доступно ранее]
     * */
    static GetFieldAvailability(event: AvailabilityEvent, fieldName: string): [boolean, boolean] {
        const sourceAv = AvailabilityEvent.GetAvailability(event.sourceAvailabilities, fieldName, event.newAvailability);
        const oldAv = AvailabilityEvent.GetAvailability(event.oldAvailabilities, fieldName, event.oldAvailability);
        return [sourceAv, oldAv]
    }
}