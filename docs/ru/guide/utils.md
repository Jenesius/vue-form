# Utils
Здесь предоставлена информация о всех функциях, которых вы можете использовать у себя в проекте. Все функции
глубоко используются в самой библиотеке.

Каждый метод описанный здесь находится в объекте **utils**:
```ts
import {utils} from "jenesius-vue-form";

utils.bypassObject({});
```

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

### Пример

```ts
bypassObject({ login: "Jack", address: { city: "Berlin" } })
// [
//    { name: "login", value: "Jack", set: Function },
//    { name: "address.city", value: "Berlin", set: Function }
// ]
```

## checkCompositeName
Функция проверяет, является ли первый параметр предшествующим ключом для второго параметра.

### Параметры

#### parentName <Badge tip = "tip">Обязательное</Badge>
Строковое значение родительского имени.
#### childName <Badge tip = "tip">Обязательное</Badge>
Строковое значение дочернего имени.

### Пример

```ts
checkCompositeName('address', 'address.city')           // true
checkCompositeName('address.city', 'address.city')      // true

checkCompositeName('addr', 'address.city')              // false
checkCompositeName('username', 'address.city')          // false
checkCompositeName('address.city.index', 'address.city')// false
```

## checkNameInObject
Проверяет наличие поле в объекте. Переданный Объект должен быть [Grand](#grand).

### Параметры

#### object
Объект в котором производится поиск
#### name
Строковое название поле

### Результат

Логическое значение, true - если такое поле присутствует в объекте.

### Пример
```ts
const obj = { username: "Jack", address: { country: { code: 0 } } }

checkNameInObject(obj, "name");            // false
checkNameInObject(obj, "username");        // true
checkNameInObject(obj, "address.country"); // true
checkNameInObject(obj, "adress.test");     // false

```

## checkObjectForPrimitiveInstance

Данная функция используется для идентификации объектов, которые по своей
сути являются примитивами и для них не нужно делать отдельное копирование,
и заходить внутрь и итерировать их свойства. К таким объектам на данный
момент относятся:

- Date
- Blob
- Error

Также все остальные объекты наследуемые от них. Эта функция одна тех, 
при помощи которой происходит проверку на [isIterable](#isiterablepoint).

## checkPrimitiveValue

Вернёт **true** если переданное значение является примитивом(*null* или *undefined* или любое значение
не являющееся объектом или функцией).

## clickOutside <Badge type = "warning">Позже</Badge>

## compareDifference 

Метод используется для сравнения двух переданных объектов.

### Возвращаемое значение

Вернёт массив: результат сравнения. Результат сравнения из себя представляет название поля, которые
отличаются от исходного объекта. Если поле **N** присутствует в **newValue** и присутствует в объекте **oldValue** и его
значение в этих объектах идентичное - данное поле не будет возвращено в результате работы данной функции. В любых иных
случаях: В новом объекте поле есть, а в старом нет (поле было добавлено) или в старом объекте поле есть, а в новом нет
(поле было удалено) - поле будет выведено в результате. 

Массив состоит из элементов **CompareItem**:
```ts
interface CompareItem {
	name: string,
	oldValue: any,
	newValue: any,
}
```

### Параметры

#### oldValue
Первичный объект (или первоначальные значения)

#### newValue
Исходный объект (или конечные значения)

### Пример

```ts
const newValue = {
    name: "Jenesius",
    age: 24
}
const oldValue = {
    name: "Jenesius",
}

compareDifference(oldValue, newValue) 
// [ { name: "age", newValue: 24, oldValue: undefined } ]
```

## compareMergeChanges 

В отличие от предыдущего метода [compareDifference](#compareDifference), данная функция принимает объект, на который будут
производиться изменения, и изменения. Из этого можно сделать вывод, что второй объект необходим лишь для двух вещей:

1. Было ли поле изменено. В случае, если в изменениях пришло `{name: "J"}`, а в объекте и так было поле `{name: "J"}`,
то данное поле не будет помечено, как изменённое.
2. Чтобы получить старое значение(oldValue). То есть мы уже имеем набор изменений и полноценное сравнивать два объекта
не надо, а лишь надо спроецировать второй объект (изменения) на первый и сравнить, какие именно изменения будут
произведены.

Также нужно помнить, что изменения лишь проецируются на исходные значения. Иными словами, если
исходные значения `{coordinate: {x: 1}}`, а изменения `{coordinate: {y: 2}}` результирующий объект(который
предполагается): `{ coordinate: { x: 1, y: 2 } }` и в данном случае мы получаем, что у нас два изменения:
```ts
[
    { name: 'coordinate', newValue: { x: 1, y: 2 }, oldValue: { x: 1 } },
    { name: 'coordinate.y', newValue: 2, oldValue: undefined }
]
```

### Параметры

#### sourceValue
Первичный объект на который будут проецироваться изменения

#### changes
Объект изменений

## concatName

Метод используется для соединения переданных имён.

### Параметры

Принимает любой набор значений.

### Пример

```ts
concatName('address', 'city', 'indxe'); // "address.city.index"
concatName('name', null, '', 'first'); // "name.first"
```

## convertOptionsObject

Используется для конвертации значения в вид `OptionRow[]`, где OptionRow: 
```ts
interface OptionRow{
	label: string,
    value: any
}
```

В основном метод используется для option подобных поля, таких как select, radio, checkbox.

### Параметры

#### object <Badge type = "tip">Обязательный</Badge>
Исходный объект, который будет конвертирован в массив.

#### type <Badge type = "info">необязательный</Badge>
По умолчанию значение равно **undefined** и обработка значений идёт следующий образом: ключ объекта является **value**,
а значение этого ключа **label**. Но, если передать *reverse*, то будет наоборот: ключ - **label**, значение ключа **value**.

### Пример
```ts
const values = {
	name: "Jack",
    age: 24
}
convertOptionsObject(values)
// [ { value: 'name', label: "Jack" }, { value: 'age', label: "24" } ]

convertOptionsObject(values, 'reverse')
// [ { value: 'Jack', label: "name" }, { value: 24, label: "age" } ]
```

:::tip Почему значение с левой стороны?
Первостепенная причина заключается в том, что значение должно быть `уникальным`. Ключ объекта позволяет это сделать.
:::

## copyObject

Объект для копирования объектов. Возвращает копию переданного объекта. Сперва данная функция была реализована используя
`JSON.parse(JSON.stringify())`, однако в дальнейшем нам понадобилось копирование замороженных объектов. Что `JSON`
обеспечить не может.

### Параметры

#### object <Badge type = "tip">Необязательный</Badge>
Объект, которые необходимо скопировать

### Пример

```ts
const values = { username: "Jack", age: 24 }
const copy = copyObject(values)
copy.age = 25;
copy.age     // 25
values.age   // 24
```

## deletePropByName

Удаляет значение по имени из объекта.

### Параметры

#### object
Исходный объект в котором будет производиться удаление.

#### name
Строковое значение(может быть составным *address.city.name") - название поле, которое необходимо удалить.

### Пример

```ts
const values = { address: { city: "Berlin" } }
deletePropByName(values, "address.city");
values // { address: { } }
```

## findNearestNameFromArray

Функция находит ближайшее имя из переданного массива. В данной функции имена могут совпадать. Возвращает строку или undefined.

### Параметры

#### array <Badge type = "tip">Обязательное</Badge>
Массив строк по которым будет происходить поиск. Поиск осуществляется функцией [checkCompositeName](#checkcompositename)

#### name <Badge type = "tip">Обязательное</Badge>

Строковое значение поля для поиска.

### Пример
```ts
findNearestNameFromArray(['city', 'address'], 'address.city' ) // address
findNearestNameFromArray(['city', 'address.city', 'address'], 'address.city' ) // address.city
```

## findNearestPrefixFormArray

Функция ищет ближайший префикс из переданных в массиве. Возвращает строку или undefined. Префиксом не будет является
строка идентичной переданной. Главное условие - префикс должен быть меньшей длины, чем родительская строка.

### Параметры

#### array <Badge type = "tip">Обязательное</Badge>
Массив строк по которым будет происходить поиск. Поиск осуществляется функцией [isPrefixName](#isprefixname)

#### name <Badge type = "tip">Обязательное</Badge>

Строковое значение поля для поиска.

### Пример
```ts
findNearestPrefixFormArray(['city', 'address'], 'address.city' ) // address
findNearestPrefixFormArray(['city', 'address.city', 'address'], 'address.city' ) // address
```

## getCastObject

Функция возвращает слепок для переданного объекта.

### Параметры

#### object
Объект исходных значений.

#### cast
Объект, где у свойства значение может быть только `true`.

#### Пример
```ts
const values = {
	adderss: { city: "Berlin", code: 1 },
    login: "jenesius",
    username: "jack"
}
const cast = {
	address: {
		city: true
    },
    username: true
}

const result = getCastObject(values, cast);
// { address: { city: "Berlin" }, username: "jack" }
```

## getLabelFormOptionRow

Пока нет надобности убирать title, и полноценно его заменять на label, по этому в текущей системе
поддерживается эти два варианта. В будущем будем придерживаться политики сужения, чтобы был единственный ВЕРНЫЙ вариант
описания данных.

В **OptionRow** для совместимости была оставлена возможность использовать title, однако это является устаревшей записью.
Тем не менее для того, чтобы точно вытащить строковую метку в систему добавлен данный метод.

### Параметры

#### object <Badge type = "tip">Обязательный</Badge>
Объекта типа **OptionRow**.

### Пример

```ts
getLabelFromOptionRow({label: "Name", value: "test"}) // "Name"
getLabelFromOptionRow({title: "Login", value: "test"}) // "Login"
```

## getPropFormObject

Возвращает значение по ключу(может быть составным) из объекта.

### Параметры

#### object <Badge type = "tip">Обязательное</Badge>
Исходный объект в котором будет производиться поиск.

#### name <Badge type = "tip">Обязательное</Badge>
Строковое значение(может быть составным *address.city.name") - название поле, которое необходимо получить.

### Пример
```ts
const values = { username: "Jenesius", address: { city: "Berlin" } }
getPropFormObject(values, 'username'); // "jack"
getPropFormObject(values, 'username.test'); // undefined
getPropFormObject(values, 'address.city'); // "Berlin"
```

## grandObject

На вход получает объект данных, возвращает максимально упрощённо разложенный объект. Под упрощением понимает то, что
любой имя, которое можно разложить будет разложено (`address.city` -> `{address: { city }`). Возвращает новый объект.

### Параметры

#### object <Badge type = "tip">Обязательное</Badge>
Объект, который нужно разложить. 

### Пример

#### Входные

```ts
const input = {
    "user.name": "Jack",
    "address.city": {
        "code.value": 123
    }   
}
```

#### Результат

```ts
const result = {
    "user": {
        "name": "Jack"
    },
    "address": {
        "city": {
            "code": {
                "value": 123
            }
        }
    }
}
```

## insertByName

Вставляет значение по имени в объект.

### Параметры

#### object <Badge type = "tip">Обязательное</Badge>
Исходный объект в который будет происходить вставка.

#### name <Badge type = "tip">Обязательное</Badge>
Строковое значение(может быть составным *address.city.name") - название поле, которое необходимо добавить

#### value <Badge type = "tip">Обязательное</Badge>
Любое значение.

### Пример

```ts
const values = {}
insertByName(values, "address.city", "Berlin");
values // { address: { city: "Berlin" } }
```

## isEmptyObject
Метод вернёт **true**, если у полученного объекта нет дочерних элементов.

### Параметр

#### object <Badge type = "tip">Обязательное</Badge>
Объект, который проверяется на пустоту.

## isIterablePoint
Один из основных методов, которые используется в форме. Метод принимает
значение и возвращает true, если объект является [итерируемый](#iterablePoint). 

## isPrefixName
Вернёт true, если второй параметр является префиксом (родителем) первого. 

```ts
function isPrefixName(fieldName: string, prefix: string): boolean {} 
```

### Примеры

- `address.city.name`, `address` -> **true**
- `user.type.index`, `user.type` -> **true**
- `position.city.type`, `city` -> **false**
- `name`, `name` -> **false**

## isSimpleEqual

Функция проверяет два значения на идентичность. Не работает вглубь, однако
сравнить два пустых объекта или два пустых массива может.

```ts
function isSimpleEqual(value: unknown, other: unknown) {}
```

### Примеры

- `1`, `2` -> **false**
- `test`, `test` -> **true**
- `{}`, `{}` -> **true**
- `{a: 1}`, `{a: 1}` -> **false**

## iteratePoints

Метод принимает объект и возвращает массив, хранящий в себе значение каждого узла переданного объекта. Массив хранит 
элементы следующего типа:
```ts
interface Point {
	name: string,
    value: any
}
```

### Параметр

#### object <Badge type = "tip">Обязательное</Badge>
Объект по которому необходимо пройтись.

### Примеры

#### Входные

```ts
iteratePoints({"a": 1, "city": {"code": 2}})
```

#### Результат
```ts
[
 { name: 'a',            value: 1            },
 { name: 'city',         value: {code: 1}    },
 { name: 'city.code',    value: 2            },
]
```

## mergeObjects

Метод сливает все объекты(кроме первого) в первый.

```ts
function mergeObjects(originalValues: Values, ...newValues: Values[]) {}
```

### Пример

```ts
const object1 = {
	name: "Jack",
    city: {
		code: 2
    }
}
const object2 = {
	age: 24,
    city: {
		index: 1
    }
}
const objectResult = {};
const result = utils.mergeObjects(objectResult, object1, object2);
```

objectResult будет иметь следующее значение:
```ts
const result = {
	age: 24,
	name: "Jack",
    city:{
		coed: 2,
        index: 1
    }
}
```

## parseFirstName
Функция принимает и обрабатывает строковое имя поля, возвращает первое возможное имя и остальные.

### Параметр

#### fieldName <Badge type = "tip">Обязательное</Badge>
Строковое значение, которое необходимо разделить на части.

### Примеры
- address.city.name -> **[address, city.name]**
- username -> **[username, ]**
- application.name -> **[application, name]**

## plainObject

Метод разворачивает объект, делая все не [перебираемые](#iterablepoint) поля - линейными.

### Параметр

#### object <Badge type = "tip">Обязательное</Badge>
Объект, который нужно упростить

### Пример

#### Ввод
```ts
const result = plainObject({
    address: {
        city: 'Berlin'
    },
    index: 1
})
```

#### Вывод
```ts
const result = {
    "address.city": "Berlin",
    "index": 1
}
```

## recursiveRemoveProp
Удаляет элемент из объекта по ключу. 
Метод очень похож на метод [удаления ключа](#deletepropbyname), но главная его особенность - если в удаляемом объект
нет дочерних элементов - удаляет объект целиком. Это будет показано в примере.

### Параметры

#### object
Исходный объект в котором будет производиться удаление.

#### name
Строковое значение(может быть составным *address.city.name") - название поле, которое необходимо удалить.

### Пример

```ts
const values = { address: { city: "Berlin" } }
deletePropByName(values, "address.city");
values // { }
```

## runPromiseQueue <Badge type = "warning">Позже</Badge>

## splitName
Метод принимает имя и возвращает массив составных имен, разделяя имя по точкам.

### Параметр

#### name <Badge type = "tip">Обязательное</Badge>
Строковое значение, которое будут обрабатываться.

### Пример

```ts
splitName("addres"); // ["address"]
splitName("address.city.index"); // ["address", "city", "index"]
````

## Сокращённые понятия

### iterablePoint
Перебираемый объект не является:
- Примитивом
- Массив
- Замороженным объектом, `Object.frozen`
- Пустым объектом `(Object.keys.length === 0)`
- Функцией
- Объект наследуется от классов, которые проверяются в
[checkObjectForPrimitiveInstance](#checkobjectforprimitiveinstance)

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

