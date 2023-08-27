<script setup>
import {FormField, Form, useFormValues} from '../../src';

const form = new Form();
const values = useFormValues(form)

</script>

# Field single-checkbox

The field can be used as a radio button or to select a single value
out of two.

- Keyword `single-checkbox`.
- WhatWG [Specification](https://html.spec.whatwg.org/multipage/input.html#checkbox-state-(type=checkbox)).
- 
## Params

### values <Badge type = "info">Optional</Badge>

- Type: `[any, any]`.
If this parameter is passed, then the included parameter will correspond to `values[0]`
value, and off `values[1]`.
____ 

Also, all parameters common to all `FormField`. Information about them can be found on [this page](./form-field.md#params).

## Value

If the **values** parameter was not passed, then the value will be **true** - enabled, **false** - disabled.
In the case where **values** is passed, the included value will match `values[0]`,
and off the remaining value.

## Specification

- The field is available when using `Tab` and `Shift + Tab`.
- Selecting an element is possible by clicking on the element itself.
- The choice is possible by pressing `Enter` or `Space`.
- Blocking fields cancels navigation using `Tab`.
  There is also a change in the style of `single-checkbox`.
- If the validation fails, the field should change the `single-checkbox` style.

## Examples

There are no additional-required parameters for this field, so we need to
specify only `type` and `name`:

::: code-group

```html
<form-field name = "hasPhone" type="single-checkbox"/>
```

```ts
import {FormField} from "jenesius-vue-form";

```

:::

Default field:
<FormField  type = "single-checkbox" name = "isAdmin" label = "Is Admin" />

____

In locked state:
<FormField disabled type = "single-checkbox" name = "isAdmin" label = "Disabled" />

____

Field not validated:
<FormField :errors = "['Seleact this fields']" type = "single-checkbox" name = "isAdmin" label = "With Error" />

____

Field with passed `values`: ```['yes', 'no']```
<FormField :values = "['yes', 'no']" type = "single-checkbox" name = "isAdmin" label = "With passed values" />
_____




----
The current state of the form:
```ts-vue
{{values}}
```