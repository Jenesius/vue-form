import FormEvent from "./FormEvent";
import {FormAvailability} from "../types";
import isPrefixName from "../utils/is-prefix-name";
import findNearestNameFromArray from "../utils/find-nearest-name-from-array";



export default class AvailabilityEvent extends FormEvent{
    constructor(
        public sourceAvailability: FormAvailability,
        public oldAvailability: FormAvailability,
        public currentAvailability: boolean = true
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
        
        // Получаем состояние для текущего name.
        const nearestName = findNearestNameFromArray(name, Object.keys(event.sourceAvailability));
        const currentAvailability = nearestName ? event.sourceAvailability[nearestName] : event.currentAvailability
        
        return new AvailabilityEvent(
            get(event.sourceAvailability),
            get(event.oldAvailability),
            currentAvailability
            )
    }
}