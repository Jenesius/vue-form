<script setup>
import {FormField, Form, useFormValues} from '../../src';

const form = new Form();
const companies = {
	'a': "Apple",
    'h': "Huawei",
    's': "Samsung"
};
const colors = {
    white: 'White',
     black: 'Black',
     red: 'Red',
     yellow: 'Yellow',
     orange: 'Orange',
     green: 'Green',
     blue: 'Blue',
     purple: 'Purple',
     pink: 'Pink',
     brown: 'Brown',
     grey: 'Grey',
};
const values = useFormValues(form);

</script>

# Field select

The field is used to select a single value from the provided set.

- Keyword `select`.
- WhatWG [Specification](https://html.spec.whatwg.org/multipage/input.html#select-button-state-(type=select)).
- 
## Params

### options <Badge type = "tip">Required</Badge>

- Type: [FormFieldOptions](./../fields/form-field-options).

The set of possible field values.

### hiddenValues <Badge type = "info">Optional</Badge>

- Type: `any[]`

If this array is specified, then the selection will not contain the elements specified in `hiddenValues`.

### placeholder <Badge type = "info">Optional</Badge>

- Type: `string`

If no value is selected, a text label is shown.

### multiple <Badge type = "info">Optional</Badge>

- Type `boolean`

Данный параметр позволяет использовать множественную выборку. В таком случае modelValue будет обрабатываться как массив. 

### limit <Badge type = "info">Optional</Badge>

- Type `number`

Данный параметр устанавливает предельное количество выбираемых элементов, если используется атрибут `multiple`.


____ 

Also, all parameters common to all `FormField`. Information about them can be viewed
on [this page](./form-field.md#params).


## Value

On clicking or selecting the corresponding `select` element, the value will be set to
according to the value in the `value` field of the passed `options`. Если установлен атрибут `multiple`, то значение
будет проверяться на наличие в modelValue: если не было найдено, то будет добавлено, иначе - исключено.

## Specification

- The object is available for access via `Tab` and `Shift + Tab`.
- Moving around the object is possible using `ArrowDown` and `ArrowUp`. Moving this way
  changes the value of a field.
- Selecting an element is possible by clicking on the corresponding element.
- **Cannot** select an element using `Enter`.
- Using `Enter` expands or closes the dropdown list.
- An additional search controller is shown for a long list.
- Blocking fields cancels navigation using `Tab`. There is also a change in the style of `select`.
- If the validation fails, the field should change the style of the `select`.
- При использовании аттрибута `multiple` выборка не должна закрывать выпадающий список.
- In `miltiple:true` mode with `Shift` held down, the following transition order is used (`_` state value
  in which no element is selected, `->` - transition from one element to another, `0` - element not selected, `1` - element
  already selected):
  - _ -> 0 = _ , 1
  - 1 -> 0 = 1, 1
  - 1 -> 1 = 0, 1
  - 0 -> 0 = 1, 0
  - 0 -> 1 = 0, 0


## Examples

To connect a widget, you need to specify `type` and `options`:

::: code-group

```html

<form-field :options="companies" type="select"/>
```

```ts
import {FormField} from "jenesius-vue-form";

const companies = {
	'a': "Apple",
	'h': "Huawei",
	's': "Samsung"
};
const colors = {
  white: 'White',
  black: 'Black',
  red: 'Red',
  yellow: 'Yellow',
  orange: 'Orange',
  green: 'Green',
  blue: 'Blue',
  purple: 'Purple',
  pink: 'Pink',
  brown: 'Brown',
  grey: 'Grey',
};
```

:::

Default field:
<FormField :options = "companies" type = "select" name = "company" label = "Select one item" />

____

In locked state:
<FormField :options = "companies" type = "select" name = "company" disabled label = "Disabled" />

____

Field not validated:
<FormField :errors = "['Seleact this fields']" :options = "companies" type = "select" name = "company" label = "With Error" />

____

A field with many `options`. The search controller should be displayed:
<FormField :options = "colors" type = "select" name = "color" label = "A large number of colors" />

____

Using `hiddenValues` and setting the value to `['blue', 'purple', 'pink', 'brown', 'grey']`:
<FormField :options = "colors" hiddenValues = "['blue', 'purple', 'pink', 'brown', 'grey']" type = "select" name = "color" label = "Filtered colors" />

----

Использование `multiple`:
<FormField :options = "colors" type = "select" name = "multiple-color" multiple label = "Multiple colors" />

----

Использование `limit` = `2` вместе с `multiple`:
<FormField :options = "colors" type = "select" name = "multiple-color" multiple label = "Multiple colors" limit = "2" />


----
The current state of the form:

```ts-vue
{{values}}
```