<script setup>
import {FormField, Form, useFormValues} from '../../../src';

const form = new Form();
const values = useFormValues(form)

</script>

# Поле single-checkbox

Поле может использоваться в качестве переключателя или для выбора одного значения
из двух.

- Ключевое слово `single-checkbox`.
- WhatWG [Спецификация](https://html.spec.whatwg.org/multipage/input.html#checkbox-state-(type=checkbox)).

## Параметры

### values <Badge type = "info">Необязательный</Badge>

- Тип `[any, any]`.
В случае, если данный параметр передан, то включенный параметр будет соответствовать `values[0]`
значение, а выключенный `values[1]`.
____ 

Так же все параметры, общие для всех `FormField`. Информацию о них можно посмотреть на [этой странице](./form-field.md#params).

## Значение

Если параметр **values** не был передан, то значение будет **true** - включён, **false** - выключен.
В случае, когда **values** передаётся, включенному значению будет соответствовать `values[0]`,
а выключенному оставшееся значение.

## Спецификация

- Поле доступно при использовании `Tab` и `Shift + Tab`.
- Выбор элемента возможен по щелчку на сам элемент.
- Выбор возможен по нажатию `Enter` или `Space`.
- Блокировка полей отменяет навигацию используя `Tab`.
Также происходит изменение стилистики `single-checkbox`.
- При неудачной валидации поле должно изменить стилистику `single-checkbox`. 

## Примеры

Для данного поля нет дополнительных обязательных параметров, по этому нам необходимо
указать лишь `type` и `name`:

::: code-group

```html
<form-field name = "hasPhone" type="single-checkbox"/>
```

```ts
import {FormField} from "jenesius-vue-form";

```

:::

Поле по умолчанию:
<FormField  type = "single-checkbox" name = "isAdmin" label = "Это администратор" />

____

В заблокированном состоянии: 
<FormField disabled type = "single-checkbox" name = "isAdmin" label = "Заблокированное" />

____

Поле не прошло валидацию:
<FormField :errors = "['Seleact this fields']" type = "single-checkbox" name = "isAdmin" label = "С ошибкой" />

____

Поле с переданными `values`: ```['yes', 'no']```
<FormField :values = "['yes', 'no']" type = "single-checkbox" name = "isAdmin" label = "С переданными values" />
_____




----
Текущее состояние формы:
```ts-vue
{{values}}
```