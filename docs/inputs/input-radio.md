<script setup>
import {FormField, Form, useFormValues} from '../../src';

const form = new Form();
const companies = {
	'a': "Apple",
    'h': "Huawei",
    's': "Samsung"
};
const values = useFormValues(form);

</script>


# Field radio

The field is used to select a single value from the provided set.

- Keyword `radio`.
- WhatWG [Specification](https://html.spec.whatwg.org/multipage/input.html#radio-button-state-(type=radio)).

## Params
### options <Badge type = "tip">Required</Badge>

- Type: [FormFieldOptions](./../fields/form-field-options).

The set of possible field values.
____

Also, all parameters common to all `FormField`. Information about them can be viewed
on [this page](./form-field.md#params).

## Value

When clicking or selecting the corresponding `radio` element, the value will be set to
according to the value in the `value` field of the passed `options`.

## Specification

- The object is available for access via `Tab` and `Shift + Tab`.
- Moving around the object is possible using `ArrowDown` and `ArrowUp`. Moving this way
  changes the value of a field.
- Selecting an element is possible by clicking on the corresponding element.
- **Cannot** select an element using `Enter` or `Space`.
- Blocking fields cancels navigation using `Tab`. There is also a change in the style of `radio`.
- If the validation fails, the field should change the `radio` style.
- 
## Examples

To connect a widget, you need to specify `type` and `options`:

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


By default:
<FormField :options = "companies" type = "radio" name = "company" label = "Select one" />

____

In disabled state
<FormField :options = "companies" type = "radio" name = "company" disabled label = "Disabled" />

____

Field not validated:
<FormField :errors = "['Seleact this fields']" :options = "companies" type = "radio" name = "company" label = "With error" />

____


----
The current state of the form:
```ts-vue
{{values}}
```