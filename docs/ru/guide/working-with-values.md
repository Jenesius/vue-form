# Работа со значениями
На данной странице представлены все методы и свойства, которые вам пригодятся для работы с состоянием формы.

## Установка значения {setValues}

Основной задачей форм является поддержания текущего состояния(значения). Для изменения его используется метод **setValues**:
```ts
form.setValues({
    name: "Jack",
    age: 24
})
form.values // { name: "Jack", age: 24 }
```

### Параметры

#### values <Badge type="tip">Обязательный</Badge>
Значения, когда будут установлены для формы.

#### options <Badge type="info">Необязательный</Badge>
Необязательный параметр, объект со следующими свойствами:

::: info _
##### changed <Badge type="info">Необязательный</Badge>
Boolean значение, являются ли данные значения изменениями. Если *true*, то значения будут проецироваться на changes.

#### target <Badge type="info">Необязательный</Badge>
Имя целевого объекта для которого был вызван setValues. На данное свойство можно смотреть так, будто метод был вызван
из дочернего элемента, имя которого было передано в *target*.

#### clean <Badge type="info">Необязательный</Badge>
Нужно ли полностью перезаписывать предыдущее значение. По умолчанию *setValues* примешивает значение, но если установлен
`clean: true`, предыдущее значение будет полностью перезаписано новым.
:::

### Примеры использования

#### Установка значения
```ts
form.setValues({
    username: "Jack"
})
form.values // { username: "Jack" }
```

#### Установка значения с параметром target
```ts
form.setValues({
    city: "Emerald City"
}, { target: "address" })
form.values // { address: { city: "Emerald City" } }
```

#### Использование clean параметра
```ts
// Values: { username: "Jenesius", age: 24 }
form.setValues({ username: "Jenesius", age: 24 }) 

form.setValues({ 
    name: "Jask"
}, { clean: true })
form.values  // { name: "Jack" }
```

#### Использования target и clean вместе
```ts
form.setValues({
    name: "Jack",
    address: {
		city: "Emerald City"
    }
})

form.setValues({
    code: "00"
}, { target: "address", clean: true })
form.values // { name: "Jack", address: { code: "00" } }
```

#### Примешивание значения
```ts
form.setValues({
    address: {
		city: "Emerald City"
    }
})
// { address: { city: "Emerald City" } }

form.setValues({
	address: {
		code: "00"
	}
})
form.values // { address: { city: "Emerald City", code: "00" } }
```

## Изменение значений
Как уже понятно из **setValues**, если мы передаем `change: true`, то происходит работа именно с **changes** состоянием
формы. Для удобной работы был создан alias **change**, которые автоматически устанавливает параметр changed.
```ts
form.change(data) // form.setValues(data, { changed: true })
```

## Отмена изменений
Чтобы отменить изменения(работа с changes) используется метод *revert*:
```ts{5}
form.setValues({username: "Jenesius", age: 24});
form.change({age: 23, father: true});
// Values: { username: "Jenesius", age: 23, father: true }

form.revert();
// Values: { username: "Jenesius", age: 24}
```

## Очистка значений
Чтобы полностью очистить форму используется метод **cleanValues**:
```ts
form.setValues({name: "Jack"})
form.cleanValues(); // Values: {}
```
Данный метод также принимает значения, которые будут установлены вместо текущего:
```ts
form.setValues({name: "Jack"})
form.cleanValues({age: 24}); // Values: { age: 24 }
```

## Значения формы (Values)
Из предыдущих примеров видно, что конечное значение формы находится в `form.values`:
```ts
form.setValues({age: 24});
form.values // { age: 24 }
```


## Изменения формы (Changes)
Чтобы получить только изменения, необходимо воспользоваться `form.changes`:
```ts{4}
form.setValues({ name: "Jack" })
form.change({ age: 24 })
form.values; // { name: "Jack", name: 24 }
form.changes; // { age: 24 }
```

## Получение значения по имени
В некоторых ситуациях есть надобность получения значения поля по имени. Для такого случая необходимо использовать
именно метод **getValueByName**.

### Параметры

#### name <Badge type="info">Необязательный</Badge>
Строковое название поля, для которого необходимо получить значение.

```ts{2}
form.setValues({ login: "Jack" });
form.getValueByName('login') // Jack
```
::: warning
Получение значения по имени свойства является ошибочным:
```ts
form.values['login'] // Wrong
form.getValueByName('login') // Correct
```
Если мы говорим про простые поля - это будет работать, однако в случае с составными полями (address.country) данный
способ не сможет найти нужное значение поля.
:::

## Подтверждение изменений
Для того чтобы подтвердить все изменения или только для конкретного поля, воспользуйтесь методом **acceptChanges**.
Метод очищает changes (целиком или единичное поле) и устанавливает очищенное значение в values.

### Параметра

#### name <Badge type = "info">Необязательное</Badge>
Если не передано - все изменения будет сперва проецированы на values, а затем очищены. Если значение 
передаётся оно должно быть строковым названием поля.

### Пример

```ts
const form = new Form();
form.change({ username: "Jack", age: 24, id: 1 })

form.acceptChanges('username');
form.pureValues; // { username: "Jack" }
form.changes ; // { age: 24, id: 1 }

form.acceptChanges();
form.pureValues; // { username: "Jack", age: 24, id: 1 }
form.changes; // {}
```

::: warning События
Использование данного метода не порождает события `изменения`. Это
важно учитывать при его использовании.
:::

## Очистка изменений для поля
Метод **cleanChangesByField** отменяет изменения для переданного поля. Данная функция работает только с объектом changes и не
затрагивает объект values. Если в дочернее свойство объекта changes является объектом, но при этом количество
дочерних ключей равно 0, данной свойство полностью удаляется из объекта changes.

```ts
form.setValues({age: 24})
form.change({name: "Jack", age: 25}); // { name: "Jack", age: 25 }
form.cleanChangesByField('name');
// Changes: { age: 25 }
// Values: { age: 25 }
```

## Проверка поля на изменение
Метод **checkFieldChange** проверяет изменения для переданного названия поля. В случае, если поле было изменено
вернёт true, false в противном случае.
```ts
form.change({name: "Jack"});
form.checkFieldChange('name') // true
form.checkFieldChange('age')  // false
```

## Статус формы (Changed)
Чтобы понять, что форма находится в изменённом состоянии необходимо получить значение свойства **changed**;
```ts
form.changed // false
form.change({ name: "Jack" })
form.changed // true
form.revert();
form.changed // false
```