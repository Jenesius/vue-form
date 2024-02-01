<script setup>
import {FormField, Form, useFormValues} from '../../src';

const form = new Form();
const values = useFormValues(form)

</script>

# Field date

The field is used to select a date and handles time in ISO format.

- Keyword `date`.
- WhatWG [Спецификация](https://html.spec.whatwg.org/multipage/input.html#date-state-(type=date)).

## Params

### placeholder <Badge type = "info">Optional</Badge>

- Type: `string`
String label, displayed when there is no data in the field.

### mask <Badge type = "info">Optional</Badge>

- Type: `string`.
- By default: `YYYY/MM/DD`.

The mask sets the date display format. The mask can consist of characters of any character, however
keywords are `Y`, `M`, `D`, `H` and `h`. The corresponding values will be substituted for their position.

### handlers
- Type: 'array'
- By default: `[]`.

An array of handlers that can be used to enter fields. The array must consist of two elements. First
It is a handler of form model values of the “Date” type. The second handler is a converter from strings(values,
located inside the input fields) in the value that needs to be stored in the model data form.

#### Example

```vue

<template>
  <FormField type="date" :handlers="[handlerForm, handlerTo]" mask = "YYYY-MM-DD HH"/>
</template>
<script setup>
  import {DateController} from "jenesius-vue-form";

  function handlerFrom(formValue) {
    return new Date(formValue)
  }

  function handlerTo(strValue) {
    return DateController.ConvertToDate(strValue, 'YYYY-MM-DD HH').toISOString()
  }
</script>
```
In the current example, we have set a new mask for this field, and also defined handlers to convert the value to
ISO date format.

____ 

Also, all parameters common to all `FormField`. Information about them can be found on [this page](./form-field.md#params).

## Values

The field value is a string corresponding to the simplified extended
ISO format [(ISO 8601)](https://en.wikipedia.org/wiki/ISO_8601).

## Specification

- The field is available when using `Tab` and `Shift + Tab`.
- Date entry is possible using the input field.
- An additional controller is available for date selection: calendar.
- The calendar should not be available for `Tab` or `Shift + Tab`.
- Blocking fields cancels navigation using `Tab`.
  There is also a change in the style of `date`.
- If the validation fails, the field should change the `date` style.

## Examples

There are no additional-required parameters for this field, so we need to
specify only `type` and `name`:

::: code-group

```html
<form-field name = "created" type="date"/>
```

```ts
import {FormField} from "jenesius-vue-form";

```

:::

Default field:
<FormField  type = "date" name = "created" label = "Created date" />

____

In locked state:
<FormField disabled type = "date" name = "created" label = "Disabled" />

____

Field not validated:
<FormField :errors = "['Seleact this fields']" type = "date" name = "created" label = "With an errors" />

____

Changed value of `mask`:
<FormField mask = "YYYY_MM" type = "date" name = "deleted" label = "With new mask" />
_____


----
The current state of the form:
```ts-vue
{{values}}
```