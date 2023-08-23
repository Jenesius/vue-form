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
Функция проверяет, является ли переданное родительское имя действительно родителем для дочернего имени.
Звучит сложно. Вот пример:

parent: **address**,
child: **name** - false
child: **address.test** - true
child: **address.city.index** true

### Параметры

#### parentName <Badge tip = "tip">Обязательное</Badge>
Строковое значение родительского имени.
#### childName <Badge tip = "tip">Обязательное</Badge>
Строковое значение дочернего имени.

### Результат
Вернёт логическое значение: является ли первый параметр родителем для второго.

## checkNameInObject
Проверяет наличие поле в объекте. Объект должен быть [Grand](#grand).

### Параметры

#### object
Объект в котором производится поиск
#### name
Строковое название поле

### Результат

Логическое значение, true - если такое поле присутствует в объекте.

## checkPrimitiveValue

Вернёт **true** если переданное значение является примитивом(*null* или *undefined* или любое значение не являющееся объектом).

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

### grand
Объект является *grand*, если в нем не существует свойства, которое в себе имеет точку.

Следующий объект не является *grand*:
```ts
const object ={
  "address": {
    "city": 1,
    "country.index": 2 // Ошибка здесь
  }
}
```

Самый простой способ привести объект к *grand* виду воспользоваться функцией [**grandObject**](#grandobject)

