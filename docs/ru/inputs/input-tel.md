<script setup>
import {FormField, Form, useFormValues} from '../../../src';

const form = new Form();
const values = useFormValues(form);

</script>

# tel field

The field is used to enter numerical values.

- Keyword `tel`.
- WhatWG [Specification](https://html.spec.whatwg.org/multipage/input.html#telephone-state-(type=tel)).

## Options

### autofocus <Badge type = "info">Optional</Badge>

- Type `boolean | 'true' | 'false'`

If this parameter is passed, when setting this field, control will be automatically transferred to it.

____

Also all parameters common to all `FormField`. Information about them can be found on [this page](./form-field.md#params).

## Meaning
This field works with a string value.

- The field is available when using `Tab` and `Shift + Tab`.
- Lock cancels `Tab` navigation.
- Blocking a field changes the style of `number`.
- Validation error changes `number` style.
- The resulting field value is a string of numbers.
- The field format is used exclusively for entering mobile numbers. In other cases, it is necessary
  use `text` and `pretty/modify` attributes.
- The field should display the icon of the country to which the entered phone belongs, empty - in case
  if the number could not be processed. The analysis of the entered data lies with `libphonenumber-js`.
- Icons used to display country affiliation are taken from [flagcdn.com](https://flagcdn.com).



## Example

There are no additional required parameters for this field, so we need to
specify only `type` and `name`:

::: code-group
```html
<form-field name="phone" type="tel"/>
```

```ts
import {FormField} from "jenesius-vue-form";
```
:::


Default field:
<FormField type = "tel" name = "phone" label = "Enter value" />

____

In locked state:
<FormField type = "tel" name = "phone" disabled label = "Disabled" />

____

Field not validated:
<FormField type = "tel" name = "phone" :errors = "['The password is too simple']" label = "Error" />

----
The current state of the form:
```ts-vue
{{values}}
```