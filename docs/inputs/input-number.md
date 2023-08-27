<script setup>
import {FormField, Form, useFormValues} from '../../src';

const form = new Form();
const values = useFormValues(form);

function prettyFn(value) {
    if (!value) return '0';
    return `- ${value} -`;
}

</script>

# Field number

The field is used to enter numerical values.

- Keyword `number`.
- WhatWG [Спецификация](https://html.spec.whatwg.org/multipage/input.html#number-state-(type=number)).


## Params

### autofocus <Badge type = "info">Optional</Badge>

- Type: `boolean | 'true' | 'false'`

If this parameter is passed, when setting this field, control will be automatically transferred to it.

### suffix <Badge type = "info">Optional</Badge>
- Type: `string`

If the data attribute is set, the text label will be displayed at the end of the field.

### step <Badge type = "info">Optional</Badge>
- Type: `number | string`

This field has a mechanism to increase or decrease the entered number by 1. To change this parameter
the `step` attribute must be set.

### pretty <Badge type = "info">Optional</Badge>
- Type [StringModify](./../guide/types#StringModify) | [StringModify](./../guide/types#StringModify)
  Used to change the display of a field. These rules are accepted only after
  field became inactive.

### placeholder <Badge type = "info">Optional</Badge>
- Type: `string`

The string value of the prompt before entering data.

____ 

Also, all parameters common to all `FormField`. Information about them can be found on [this page](./form-field.md#params).

## Value
This field works with numeric values.

## Specification

- The field is available when using `Tab` and `Shift + Tab`.
- Lock cancels `Tab` navigation.
- The value can be manipulated via an additional controller.
- Blocking a field changes the style of `number`.
- Validation error changes `number` style.
- The field allows you to enter numbers and symbols from `+-.,`.

## Examples

There are no additional-required parameters for this field, so we need to
specify only `type` and `name`. The `pretty` function is in the `ts` tab:

::: code-group
```html
<form-field name = "value" type="number"/>
```

```ts
import {FormField} from "jenesius-vue-form";

function prettyFn(value) {
	if (!value) return '0';
	return `- ${value} -`;
}
```
:::


Default field:
<FormField  type = "number" name = "value" label = "Enter value" />

____

In locked state:
<FormField type = "number" name = "value" disabled   label = "Заблокированное" />

____

Поле не прошло валидацию:
<FormField  type = "number" name = "value" :errors = "['The password is too simple']"  label = "With error" />

____

Field using `suffix` attribute:
<FormField  type = "number" name = "value" label = "Enter value" suffix = "mHz" />

____

Field with `step` value changed:
<FormField  type = "number" name = "value" label = "Enter value" step = "100" />
____

Changing the final display of a field with the `pretty` attribute:
<FormField  type = "number" name = "value" label = "Enter value" :pretty = "prettyFn" />

----
The current state of the form:
```ts-vue
{{values}}
```