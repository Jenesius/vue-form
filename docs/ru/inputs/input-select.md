

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

### multiple <Badge type = "info">Optional</Badge>

- Type `boolean`

Данный параметр позволяет использовать множественную выборку. В таком случае modelValue будет обрабатываться как массив.

### limit <Badge type = "info">Optional</Badge>

- Type `number`

Данный параметр устанавливает предельное количество выбираемых элементов, если используется атрибут `multiple`.


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
- **Нельзя** выбрать элемент используя `Enter`.
- Использование `Enter` раскрывает или закрывает выпадающий список.
- Для длинного списка показывается дополнительный контроллер поиска.
- Блокировка полей отменяет навигацию используя `Tab`. Также происходит изменение стилистики `select`.
- При неудачной валидации поле должно изменить стилистику `select`.
- При использовании аттрибута `multiple` выборка не должна закрывать выпадающий список.
- `Space` используется для выборки элементов.
- В режиме `miltiple:true` с зажатой `Shift` используется следующий порядок переходов (`_` означение состояние
в котором ни один элемент не выбран, `->` - переход с одного элемента на другой, `0` - элемент не выбран, `1` - элемент
уже был выбран):
  - _ -> 0 = _ , 1
  - 1 -> 0 = 1 , 1
  - 1 -> 1 = 0 , 1
  - 0 -> 0 = 1 , 0
  - 0 -> 1 = 0 , 0
  
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
<FormField :options = "colors" hiddenValues = "['blue', 'purple', 'pink', 'brown', 'grey']" type = "select" name = "color" label = "Отфильтрованные цвета" />

----

Использование `multiple`:
<FormField :options = "colors" type = "select" name = "multiple-color" multiple label = "Multiple colors" />

----

Использование `limit` = `2` вместе с `multiple`:
<FormField :options = "colors" type = "select" name = "multiple-color" multiple label = "Multiple colors" limit = "2" />



----
Текущее состояние формы:
```ts-vue
{{values}}
```