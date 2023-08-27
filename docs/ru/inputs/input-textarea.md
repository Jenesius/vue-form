<script setup>
import {FormField, Form, useFormValues} from '../../../src';

const form = new Form();
const values = useFormValues(form)

</script>

# textarea field

The field is used to enter long text.

- Keyword `textarea`.
- WhatWG [Specification](https://html.spec.whatwg.org/multipage/form-elements.html#the-textarea-element).

## Options

### autofocus <Badge type = "info">Optional</Badge>

- Type `boolean | 'true' | 'false'`

If this parameter is passed, when setting this field, control will be automatically transferred to it.

### autoresize <Badge type = "info">Optional</Badge>
- Type `boolean | number | string`

After entering the data, the field will stretch if this parameter is set.

If you pass `true`, the field will be
stretch to fit the text inside it.

Passing a numeric value will set the maximum number
rows that the field will display without scrolling. If this amount is exceeded
vertical scroll will appear.

### placeholder <Badge type = "info">Optional</Badge>
- Type `string`

The string value of the prompt before entering data.

____

Also all parameters common to all `FormField`. Information about them can be found on [this page](./form-field.md#params).

## Meaning

This field works with string values.

## Specification

- The field is available when using `Tab` and `Shift + Tab`.
- Lock cancels `Tab` navigation.
- Blocking a field changes the style of `textarea`.
- Validation error changes `textarea` style.
- When set to `autoresize` the size should always be checked when changing
  values

## Examples


There are no additional required parameters for this field, so we need to
specify only `type` and `name`:

::: code-group

```html
<form-field name="pass" type="textarea"/>
```

```ts
import {FormField} from "jenesius-vue-form";
```

:::

Default field:
<FormField type = "textarea" name = "description" label = "Enter a description" />

____

In locked state:
<FormField disabled type = "textarea" name = "description" label = "Disabled" />

____

Field not validated:
<FormField :errors = "['The password is too simple']" type = "textarea" name = "description" label = "Error" />

____

Automatic field increase when data changes:
<FormField autoresize type = "textarea" name = "description" label = "Doing more" />


----
The current state of the form:
```ts-vue
{{values}}
```