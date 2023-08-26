<script setup>
import {FormField, Form, useFormValues} from '../../../src';

const form = new Form();
const options = {
	r: "Красный",
    g: "Зелёный",
    y: "Жёлтый"
};
const values = useFormValues(form)

</script>

# Поле checkbox

Поле используется для множественного выбора значений из предоставленного набора.

- Ключевое слово `checkbox`.
- WhatWG [Спецификация](https://html.spec.whatwg.org/multipage/input.html#checkbox-state-(type=checkbox)).

## Параметры


### options <Badge type = "tip">Обязательный</Badge>

- Тип [FormFieldOptions](./../fields/form-field-options).


____ 

Так же все параметры, общие для всех `FormField`. Информацию о них можно посмотреть на [этой странице](./form-field.md#params).

## Значение

В качестве значения выступает **массив**, содержащий `value` выбранных элементов,
т.к. поле предназначено для множественного выбора. 

## Спецификация

- Навигация по объекту осуществляется при помощи нажатия `Tab` и `Shift + Tab`.
- Навигация **не** доступна по нажатию `ArrowDown` и `ArrowUp`.
- Выбор элементом возможен по щелчку на соответсвующий элемент,
а также по нажатию `Enter` или `Space` находясь на нужном элементе.
- Блокировка полей отменяет навигацию используя `Tab`. Также происходит изменение стилистики `checkbox`.
- При неудачной валидации поле должно изменить стилистику `checkbox`. 

## Примеры

Для подключения виджета воспользуйтесь стандартной компонентой `FormField`, а также необходимо
указать атрибуты `type` и `name`:
```vue
<template>
	<form-field
		name = "color"
		type = "checkbox"
		label = "Color"
		:options = "options"
	/>
</template>
<script setup>
import {FormField} from "jenesius-vue-form";

const options = {
	r: "Красный",
	g: "Зелёный",
	y: "Жёлтый"
}

</script>
```


----
Текущее состояние формы:
```ts-vue
{{values}}
```

Поле в обычно состоянии:
<FormField :options = "options" type = "checkbox" name = "color" label = "Select color" />
_____

Вид поля при его блокировки:
<FormField :options = "options" type = "checkbox" name = "color" disabled label = "Disabled status" />

_____
Вид поля в случае ошибки валидации:
<FormField :options = "options" type = "checkbox" name = "color" :errors = "['Seleact all options']" label = "With Error" />