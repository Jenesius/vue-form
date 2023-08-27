<script setup>
import {FormField, Form, useFormValues} from '../../../src';

const form = new Form();
const companies = {
	'a': "Apple",
    'h': "Huawei",
    's': "Samsung"
};
const values = useFormValues(form);

</script>


# Поле radio

Поле используется для выбора единственного значений из предоставленного набора.

- Ключевое слово `radio`.
- WhatWG [Спецификация](https://html.spec.whatwg.org/multipage/input.html#radio-button-state-(type=radio)).

## Параметры


### options <Badge type = "tip">Обязательный</Badge>

- Тип [FormFieldOptions](./../fields/form-field-options).

Набор возможных значений поля.
____ 

Так же все параметры, общие для всех `FormField`. Информацию о них можно посмотреть
на [этой странице](./form-field.md#params).

## Значение

При нажатии или выборе соответствующего `radio` элемента, значение будет установлено в
соответствии со значением в поле `value` из переданных `options`.

## Спецификация

- Объект доступен для доступа через `Tab` и `Shift + Tab`.
- Перемещение по объекту возможна используя `ArrowDown` и `ArrowUp`. Перемещение таким способом
изменяет значение поля.
- Выбор элемента возможен по щелчку на соответствующий элемент.
- **Нельзя** выбрать элемент используя `Enter` или `Space`.
- Блокировка полей отменяет навигацию используя `Tab`. Также происходит изменение стилистики `radio`.
- При неудачной валидации поле должно изменить стилистику `radio`. 

## Пример

Для подключения виджета необходимо указать `type` и `options`:

::: code-group

```html
<form-field :options = "companies" type = "radio"/>
```
```ts
import {FormField} from "jenesius-vue-form";

const companies = {
	'a': "Apple",
	'h': "Huawei",
	's': "Samsung"
};
```

:::


Поле по умолчанию:
<FormField :options = "companies" type = "radio" name = "company" label = "Выбери одну из" />

____

В заблокированном состоянии:
<FormField :options = "companies" type = "radio" name = "company" disabled label = "Заблокированное" />

____

Поле не прошло валидацию:
<FormField :errors = "['Seleact this fields']" :options = "companies" type = "radio" name = "company" label = "С ошибкой" />

____


----
Текущее состояние формы:
```ts-vue
{{values}}
```