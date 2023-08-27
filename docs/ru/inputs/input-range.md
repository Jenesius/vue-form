<script setup>
import {FormField, Form, useFormValues} from '../../../src';

const form = new Form();
const values = useFormValues(form);

</script>

# Поле range

Поле используется для ввода численных значений.

- Ключевое слово `range`.
- WhatWG [Спецификация](https://html.spec.whatwg.org/multipage/input.html#range-state-(type=range)).


## Параметры

### autofocus <Badge type = "info">Необязательный</Badge>

- Тип `boolean | 'true' | 'false'`

Если данный параметр передаётся, при установке данного поля, на него будет автоматически передано управление.

### step <Badge type = "info">Необязательный</Badge>
- Тип `number | string`
  Данное поле имеет механизм увеличения или уменьшения введённого числа на 1. Для изменения этого параметра
  необходимо задать атрибут `step`.

### min <Badge type = "info">Необязательный</Badge>
- Тип `number | string`

Установка нижней границы значения.


### max <Badge type = "info">Необязательный</Badge>
- Тип `number | string`

Установка верхней границы значения.

____ 

Так же все параметры, общие для всех `FormField`. Информацию о них можно посмотреть на [этой странице](./form-field.md#params).

## Значение
Данное поле работает со строковым значением.

## Спецификация

- Поле доступно при использовании `Tab` и `Shift + Tab`.
- Блокировка отменяет навигацию через `Tab`.
- Блокировка поля изменяет стилистику `range`.
- Ошибка валидации изменяет стилистику `range`.
- Для ограничения ввода используется `min` и `max` атрибуты.

## Пример

Для данного поля нет дополнительных обязательных параметров, по этому нам необходимо
указать лишь `type` и `name`:

::: code-group
```html
<form-field name = "volume" type="range"/>
```

```ts
import {FormField} from "jenesius-vue-form";
```
:::


Поле по умолчанию:
<FormField  type = "range" name = "volume" label = "Установите значение" />

____

В заблокированном состоянии:
<FormField type = "range" name = "volume" disabled   label = "Заблокированное" />

____

Поле не прошло валидацию:
<FormField  type = "range" name = "volume" :errors = "['The password is too simple']"  label = "С ошибкой" />

____

Установка границ через `max` и `min`:
<FormField  type = "range" name = "volume" max = "10" min= "0"  label = "От 0 до 10" />

____

Установка `step` в значение 2:
<FormField  type = "range" name = "volume" step = "2"  label = "С шагом 2" />

____

Текущее состояние формы:
```ts-vue
{{values}}
```