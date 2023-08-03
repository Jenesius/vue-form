/**
 * @description Функция обрабатывает имя поля, возвращает первое возможное имя и остальные.
 * @example address.city.name -> [address, city.name]
 * @example username -> [username, ]
 * @example application.name -> [application, name]
 * */
export default function parseFirstName(name: unknown) {
    if (typeof name !== 'string') throw new Error('Name must be sting type.');
    
    const result = /([^.]*)\.?(.*)/.exec(name) as unknown as [string, string, string];
    return [result[1], result[2]]
}