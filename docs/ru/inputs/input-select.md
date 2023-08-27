

<script setup>
import {FormField, Form, useFormValues} from '../../../src';

const form = new Form();
const companies = {
	'a': "Apple",
    'h': "Huawei",
    's': "Samsung"
};
const colors = {
    white: 'Белый',
    black: 'Черный',
    red: 'Красный',
    yellow: 'Желтый',
    orange: 'Оранжевый',
    green: 'Зеленый',
    blue: 'Синий',
    purple: 'Фиолетовый',
    pink: 'Розовый',
    brown: 'Коричневый',
    grey: 'Серый',
};
const values = useFormValues(form);

</script>


# Поле select

Поле используется для выбора единственного значений из предоставленного набора.

- Ключевое слово `select`.
- WhatWG [Спецификация](https://html.spec.whatwg.org/multipage/input.html#select-button-state-(type=select)).

## Параметры


### options <Badge type = "tip">Обязательный</Badge>

- Тип [FormFieldOptions](./../fields/form-field-options).

Набор возможных значений поля.

### hiddenValues <Badge type = "info">Необязательный</Badge>

- Тип `any[]`

Если данный массив указан, то в выборке будут отсутствовать элементы указанные в `hiddenValues`.

### placeholder <Badge type = "info">Необязательный</Badge>
- Тип `string`

В случае, если значение не выбрано - показывается текстовая метка.
____ 

Так же все параметры, общие для всех `FormField`. Информацию о них можно посмотреть
на [этой странице](./form-field.md#params).

## Значение

При нажатии или выборе соответствующего `select` элемента, значение будет установлено в
соответствии со значением в поле `value` из переданных `options`.

## Спецификация

- Объект доступен для доступа через `Tab` и `Shift + Tab`.
- Перемещение по объекту возможна используя `ArrowDown` и `ArrowUp`. Перемещение таким способом
  изменяет значение поля.
- Выбор элемента возможен по щелчку на соответствующий элемент.
- **Нельзя** выбрать элемент используя `Enter` или `Space`.
- Использование `Enter` или `Space` раскрывает или закрывает выпадающий список.
- Для длинного списка показывается дополнительный контроллер поиска.
- Блокировка полей отменяет навигацию используя `Tab`. Также происходит изменение стилистики `select`.
- При неудачной валидации поле должно изменить стилистику `select`.

## Пример

Для подключения виджета необходимо указать `type` и `options`:

::: code-group

```html
<form-field :options = "companies" type = "select"/>
```
```ts
import {FormField} from "jenesius-vue-form";

const companies = {
	'a': "Apple",
	'h': "Huawei",
	's': "Samsung"
};
const colors = {
	white: 'Белый',
	black: 'Черный',
	red: 'Красный',
	yellow: 'Желтый',
	orange: 'Оранжевый',
	green: 'Зеленый',
	blue: 'Синий',
	purple: 'Фиолетовый',
	pink: 'Розовый',
	brown: 'Коричневый',
	grey: 'Серый',
};
```

:::

Поле по умолчанию:
<FormField :options = "companies" type = "select" name = "company" label = "Выбери одну из" />

____

В заблокированном состоянии:
<FormField :options = "companies" type = "select" name = "company" disabled label = "Заблокированное" />

____

Поле не прошло валидацию:
<FormField :errors = "['Seleact this fields']" :options = "companies" type = "select" name = "company" label = "С ошибкой" />

____

Поле с большим количеством `options`. Должен отображаться контроллер поиска:
<FormField :options = "colors" type = "select" name = "color" label = "Большое число цветов" />

____

Использование `hiddenValues` и установка значения `['blue', 'purple', 'pink', 'brown', 'grey']`:
<FormField :options = "colors" hiddenValues = "['blue', 'purple', 'pink', 'brown', 'grey']" type = "select" name = "color" label = "Большое число цветов" />


----
Текущее состояние формы:
```ts-vue
{{values}}
```