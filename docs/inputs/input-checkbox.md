<script setup>
import {FormField, Form, useFormValues} from '../../src';

const form = new Form();
const options = {
	r: "Red",
    g: "Green",
    y: "Yellow"
};
const values = useFormValues(form);

</script>

# Field checkbox

The field is used for multiple selection of values from the provided set.

- Keyword `checkbox`.
- WhatWG [Спецификация](https://html.spec.whatwg.org/multipage/input.html#checkbox-state-(type=checkbox)).

## Params

### options <Badge type = "tip">Required</Badge>

- Type: [FormFieldOptions](./../fields/form-field-options).

The set of possible field values.
____ 

Also, all parameters common to all `FormField`. Information about them can be found on
[this page](./form-field.md#params).

## Value

The value is an **array** containing the `value` of the selected elements,
because the field is intended for multiple selection.

## Specification

- Navigate the object by pressing `Tab` and `Shift + Tab`.
- Navigation is **not** available by pressing `ArrowDown` and `ArrowUp`.
- Selecting an element is possible by clicking on the corresponding element,
  as well as by pressing `Enter` or `Space` while on the desired element.
- Blocking fields cancels navigation using `Tab`. There is also a change in the style of `checkbox`.
- If the validation fails, the field should change the `checkbox` style.

## Examples

To connect the widget, use the standard `FormField` component, and you also need to
specify the `type` and `name` attributes:
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
	r: "Red",
	g: "Green",
	y: "Yellow"
}

</script>
```

Field in normal state:
<FormField :options = "options" type = "checkbox" name = "color" label = "Select color" />
_____

View of the field when it is blocked:
<FormField :options = "options" type = "checkbox" name = "color" disabled label = "Disabled status" />

_____
Field type in case of validation error:
<FormField :options = "options" type = "checkbox" name = "color" :errors = "['Seleact all options']" label = "With Error" />


----
The current state of the form:
```ts-vue
{{values}}
```