<script setup>
import {FormField, Form, useFormValues} from '../../src';

const form = new Form();
const values = useFormValues(form)

</script>

# Field password

The field is used to enter a password.

- Keyword `password`.
- WhatWG [Specification](https://html.spec.whatwg.org/multipage/input.html#password-state-(type=password)).

## Params

### autofocus <Badge type = "info">Optional</Badge>

- Type: `boolean | 'true' | 'false'`

If this parameter is passed, when setting this field, control will be automatically transferred to it.
____

Also, all parameters common to all `FormField`. Information about them can be found on [this page](./form-field.md#params).

## Meaning

This field works with string values.

## Specification

- The field is available when using `Tab` and `Shift + Tab`.
- Switching input modes is changed by the switch.
- Lock cancels `Tab` navigation.
- Blocking the field changes the style of `password`.
- Validation error changes `password` style.
- 
## Examples

There are no additional-required parameters for this field, so we need to
specify only `type` and `name`:

::: code-group

```html
<form-field name = "pass" type="password"/>
```

```ts
import {FormField} from "jenesius-vue-form";

```

:::

Default field:
<FormField  type = "password" name = "pass" label = "Enter password" />

____

In locked state:
<FormField disabled type = "password" name = "pass" label = "Disabled" />

____

Field not validated:
<FormField :errors = "['The password is too simple']" type = "password" name = "pass" label = "With error" />



----
The current state of the form:
```ts-vue
{{values}}
```