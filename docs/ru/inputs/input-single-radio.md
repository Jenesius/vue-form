<script setup>
import {FormField, Form, useFormValues} from '../../../src';

const form = new Form();

const values = useFormValues(form);
</script>


# Поле single-radio

Поле может использоваться в качестве переключателя или для выбора одного значения
из двух.


- Ключевое слово `single-radio`.
- WhatWG [Спецификация](https://html.spec.whatwg.org/multipage/input.html#radio-button-state-(type=radio)).

## Параметры

### values <Badge type = "info">Необязательный</Badge>

- Тип `[any, any]`.
  В случае, если данный параметр передан, то включенный параметр будет соответствовать `values[0]`
  значение, а выключенный `values[1]`.
____ 

Так же все параметры, общие для всех `FormField`. Информацию о них можно посмотреть
на [этой странице](./form-field.md#params).

## Значение

Если параметр **values** не был передан, то значение будет **true** - включён, **false** - выключен.
В случае, когда **values** передаётся, Включенному знаю будет соответствовать `values[0]`,
а выключенному оставшееся значение.

## Спецификация

- Выбор элемента возможен по щелчку на сам элемент.
- Выбор возможен по нажатию `Enter` или `Space`.
- Блокировка полей отменяет навигацию используя `Tab`.
  Также происходит изменение стилистики `single-radio`.
- При неудачной валидации поле должно изменить стилистику `single-radio`.

## Пример

Для данного поля нет дополнительных обязательных параметров, по этому нам необходимо
указать лишь `type` и `name`:

::: code-group

```html
<form-field name = "hasPhone" type = "single-radio"/>
```
```ts
import {FormField} from "jenesius-vue-form";
```

:::


Поле по умолчанию:
<FormField :options = "companies" type = "single-radio" name = "hasPhone" label = "Вы используете телефон?" />

____

В заблокированном состоянии:
<FormField :options = "companies" type = "single-radio" name = "hasPhone" disabled label = "Заблокированное" />

____

Поле не прошло валидацию:
<FormField :errors = "['Seleact this fields']" :options = "companies" type = "single-radio" name = "hasPhone" label = "С ошибкой" />

____

Поле с переданными `values`: ```['yes', 'no']```
<FormField :values = "['yes', 'no']" type = "single-radio" name = "isAdmin" label = "С переданными values" />


----
Текущее состояние формы:
```ts-vue
{{values}}
```