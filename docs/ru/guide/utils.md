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

## clickOutside <Badge type = "warning">Позже</Badge>

## compareDifference <Badge type = "warning">Позже</Badge>

## compareMergeChanges <Badge type = "warning">Позже</Badge>

## concatName

Метод используется для соединения переданных имён.

```ts
concatName('address', 'city', 'indxe'); // "address.city.index"
concatName('name', null, '', 'first'); // "name.first"
```

## convertOptionsObject

## copyObject

## deletePropByName

Удаляет значение по имени из объекта.

#### object
Исходный объект в котором будет производиться удаление.

#### name
Строковое значение(может быть составным *address.city.name") - название поле, которое необходимо удалить.

## findNearestNameFromArray

## findNearestPrefixFormArray

## getCastObject

## getLabelFormOptionRow

## getPropFormObject

Возвращает значение по имени из объекта.

#### object
Исходный объект в котором будет производиться поиск.

#### name
Строковое значение(может быть составным *address.city.name") - название поле, которое необходимо получить.


## grandObject

На вход получает объект данных, возвращает максимально упрощённо разложенный объект. под упрощением понимает то, что
любой имя, которое можно разложить будет разложено.

### Пример

#### Входные

```ts
{
    "user.name": "Jack",
    "address.city": {
        "code.value": 123
    }   
}
```

#### Результат

```ts
{
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

#### object
Исходный объект в который будет происходить вставка.

#### name
Строковое значение(может быть составным *address.city.name") - название поле, которое необходимо добавить

#### value
Любое значение.

## isEmptyObject
Метод вернёт true, если у полученного объекта нет дочерних элементов.

## isIterablePoint
Один из основных методов, которые используется в форме. Метод принимает значение и возвращает true, если объект
является [итерируемый](#iterablePoint). 

## isPrefixName
Вернёт true, если второй параметр является префиксом (родителем) первого. 

```ts
function isPrefixName(fieldName: string, prefix: string): boolean {} 
```

### Примеры

- address.city.name address -> **true**
- user.type.index user.type -> **true**
- position.city.type city -> **false**
- name name -> **false**

## iteratePoints

Метод принимает объект и возвращает массив, состоящего из каждого узла этого объекта.

### Примеры

#### Входные

```json
{"a": 1, "city": {"code": 2}}
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
const objectResult;
const result = utils.mergeObjects(objectResult, object1, object2);
```

objectResult будет иметь следующее значение:
```ts
{
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

### Примеры
- address.city.name -> **[address, city.name]**
- username -> **[username, ]**
- application.name -> **[application, name]**

## plainObject

Метод разворачивает объект, делая все не [итерабельные](#iterablepoint) поля - линейными.

### Пример

#### Ввод
```ts
{
    address: {
        city: 'Berlin'
    },
    index: 1
}
```

#### Вывод
```ts
{
    "address.city": "Berlin",
    "index": 1
}
```

## recursiveRemoveProp
Удаляет элемент из объекта по ключу. Если в удаляемом объект нет дочерних элементов - удаляет объект целиком.

## runPromiseQueue

## splitName
Метод принимает имя и возвращает массив подимён. Разделяет имя по точкам.


### iterablePoint
Перебираемый объект не является:
- Примитивом
- Массив
- Замороженным объектом, `Object.frozen`
- Пустым объектом `(Object.keys.length === 0)`
- Функцией

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

