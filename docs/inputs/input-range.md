<script setup>
import {FormField, Form, useFormValues} from '../../src';

const form = new Form();
const values = useFormValues(form);

</script>

# Field range

The field is used to enter numerical values.

- Keyword `range`.
- WhatWG [Specification](https://html.spec.whatwg.org/multipage/input.html#range-state-(type=range)).
- 
## Params

### autofocus <Badge type = "info">Optional</Badge>

- Type: `boolean | 'true' | 'false'`

If this parameter is passed, when setting this field, control will be automatically transferred to it.

### step <Badge type = "info">Optional</Badge>
- Type: `number | string`
This field has a mechanism to increase or decrease the entered number by 1. To change this parameter
the `step` attribute must be set.

### min <Badge type = "info">Optional</Badge>
- Type: `number | string`

Setting the lower limit of the value.


### max <Badge type = "info">Optional</Badge>
- Type: `number | string`

Setting the upper limit of the value.
____ 

Also ,all parameters common to all `FormField`. Information about them can be found on [this page](./form-field.md#params).

## Value
This field works with a string value.

## Specification

- The field is available when using `Tab` and `Shift + Tab`.
- Lock cancels `Tab` navigation.
- Blocking the field changes the style of `range`.
- Validation error changes `range` style.
- Use `min` and `max` attributes to limit input.
- 
## Examples

There are no additional-required parameters for this field, so we need to
specify only `type` and `name`:

::: code-group
```html
<form-field name = "volume" type="range"/>
```

```ts
import {FormField} from "jenesius-vue-form";
```
:::


Default field:
<FormField  type = "range" name = "volume" label = "Enter value" />

____

In locked state:
<FormField type = "range" name = "volume" disabled   label = "Disabled" />

____

Field not validated:
<FormField  type = "range" name = "volume" :errors = "['The password is too simple']"  label = "With error" />

____

Setting bounds via `max` and `min`:
<FormField  type = "range" name = "volume" max = "10" min= "0"  label = "From 0 to 100" />

____

Setting `step` to 2:
<FormField  type = "range" name = "volume" step = "2"  label = "With step eq 2" />

____

The current state of the form:
```ts-vue
{{values}}
```