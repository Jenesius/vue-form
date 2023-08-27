<script setup>
import {FormField, Form, useFormValues} from '../../../src';

const form = new Form();
const values = useFormValues(form);

function prettyFn(v) {
     if (!v) return '';
     return `- ${v} - `;
}
function modifyFn(v) {
     if (!v) return '';
     return v.replace(/[^qwerty]/gi, '');
}

</script>

# Text field

The field is used to enter text.

- Keyword `text`. Used by default.
- WhatWG [Specification](https://html.spec.whatwg.org/multipage/input.html#text-(type=text)-state-and-search-state-(type=search)).

## Options

### autofocus <Badge type = "info">Optional</Badge>

- Type `boolean | 'true' | 'false'.

If this parameter is passed, when setting this field, control will be automatically transferred to it.

### placeholder <Badge type = "info">Optional</Badge>
- Type `string`

The string value of the prompt before entering data.

### maxlength <Badge type = "info">Optional</Badge>
- Type 'string | number'
  Limits the maximum input size.

### prefix <Badge type = "info">Optional</Badge>
- Type 'string'
  If this attribute is passed, it will be displayed before the input value.

### numeric <Badge type = "info">Optional</Badge>
- Type `boolean`
  If this attribute is specified, the input will be converted to a valid number. Note,
  that the return type remains string.

### pretty <Badge type = "info">Optional</Badge>
- Type [StringModify](./../guide/types#StringModify).

Used to change the display of a field. Does not change the value stored in the form.
These rules are accepted only after the field has become inactive.

### modify <Badge type = "info">Optional</Badge>
- Type [StringModify](./../guide/types#StringModify).

Function to change the input value. Unlike `pretty`, it works permanently.
Changes the value stored in the form.

____

Also all parameters common to all `FormField`. Information about them can be found on [this page](./form-field.md#params).

## Meaning

This field works with string values.

## Specification

- The field is available when using `Tab` and `Shift + Tab`.
- Lock cancels `Tab` navigation.
- Blocking a field changes the style of `text`.
- Validation error changes style of `text`.
- The `maxlength` attribute affects limits only when a value is entered. If the value
  will be set from the form and will exceed `maxlength` in length, it will not
  truncated in the field, but will be displayed completely.


## Examples


There are no additional required parameters for this field, so we need to
specify only `name`, because the `type` attribute defaults to `text`. `pretty` functions
and `modify` are in the `ts` tab:

::: code-group
```html
<form-field name="username"/>
```

```ts
import {FormField} from "jenesius-vue-form";

function prettyFn(v) {
if (!v) return '';
return `- ${v} - `;
}
function modifyFn(v) {
if (!v) return '';
return v.replace(/[^qwerty]/gi, '');
}
```
:::

Default field:
<FormField name = "username" label = "Enter Username" />

____

In locked state:
<FormField disabled name = "username" label = "Disabled" />

____

Field not validated:
<FormField :errors = "['The password is too simple']" name = "username" label = "Error" />

____

Limit field length using `maxlength`:
<FormField name = "username" label = "Enter Length 5" maxlength = 5 />

____

Using `prefix`:
<FormField name = "username" label = "Enter value" prefix = "username:" />

____

Entering a string converted to a number, using the `numeric` attribute:
<FormField name = "username" label = "Enter value" numeric />

____

Changing only the displayed value with `pretty`:
<FormField name = "username" label = "Pretty value input" :pretty = "prettyFn" />

____
Input changes via `modify`:
<FormField name = "username" label = "Use only q w e r t y" :modify = "modifyFn" />

----
The current state of the form:
```ts-vue
{{values}}
```