# Utils
Здесь предоставлена информация о всех функциях, которых вы можете использовать у себя в проекте. Все функции
глубоко используются в самой библиотеке.

## bypassObject
Метод используется для того, чтобы пройтись по всем не [перебираемым значениям](#iterablePoint).

### Параметры

#### object <Badge type = "tip">Обязательный</Badge>
Объект, по которому будет совершён обход.

### Результат
Результатом является массив, элементы которого имеют следующий тип:
```ts
interface BypassItem {
	value: any,
	name: string,
	set: (x: any) => void
}
```

#### value
Значение конечной точки

#### name
Полный путь конечной точки

#### set
Функция для установки значения в точку

## checkCompositeName

## checkDeepValue

## checkNameInObject

## checkPrimitiveValue

## clickOutside

## compareDifference

## compareMergeChanges

## concatName

## convertOptionsObject

## copyObject

## deletePropByName

## findNearestNameFromArray

## findNearestPrefixFormArray

## getCastObject

## getLabelFormOptionRow

## getPropFormObject

## grandObject

## insetByName

## isEmptyObject

## isEndPointValue

## isPrefixName

## iterate-endpoint

## iterate-points

## mergeObjects

## parseFirstName

## plainObject

## recursiveRemoveProp

## runPromiseQueue

## splitName


### iterablePoint
Перебираемый объект не является:
- Примитивом
- Массив
- Замороженным объектом, `Object.frozen`
- Пустым объектом `(Object.keys.length === 0)`