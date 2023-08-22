<script setup>
import { ref } from 'vue'
import {InputField, Form, useFormValues} from '@/index.ts'

const form = new Form();
function modifyInput(a) {
	return a.replace(/[^ABab]/g, ''); 
}
function cleanPoints(a) {
    return a.replaceAll('.', '');
}
function splitPoint(a) {
    return (a || '').split('').join('.');
}
const values = useFormValues(form);
</script>

# Input Text
The most popular input field is `input-text`. In this library, as in the standard HTML specification,
if the value of the *type* attribute is not specified, it takes the value of **text**.

## Usage
To add an input field, you can use the simplified following construction:
```html
<input-field/>
```
Full version:
```html
<input-field type = "text"/>
```

This field type supports a large number of parameters that you can use to improve your UX.
project.

## autofocus

When this field is rendered, focus will be set to it.
```html
<input-field type = "text" autofocus/>
```

## maxlength

The maximum possible length of a value that the user can specify. For example, we indicate that in the field it is impossible
set more than 5 characters:
```html
<input-field maxlength = "3" name = "age"/>
```
<input-field maxlength = "3" name = "age"/>

::: warning Length control
If you set a value of 10 characters in a field where the maximum possible length is 5 characters, this is not
will cause an error. The value will be set. The *maxlength* property only works with user input.
:::

## prefix
To add a prefix to the input field (text label at the beginning of the input), you must use the **prefix** attribute:
```html
<input-field name = "name" prefix = "login"/>
```

<input-field name = "name" prefix = "login"/>

## modify
To automatically modify user input, use the **modify** attribute:

```vue

<template>
	<input-field name = "onlyAB" :modify = "modifyInput"/>
</template>
<script setup>
import {InputField} from "./index";
function modifyInput(a) {
	return a.replace(/[^ABab]/g, ''); // Available only A(a) and B(b)
}
</script>
```

<input-field name = "onlyAB" :modify="modifyInput" label = "Put just A and B"/>
Value: {{values.onlyAB}}

## pretty
Quite similar in functionality to *modify* attribute *pretty*. Its difference is that the value does not change, it changes
only the view value. Often modify and pretty are used together. This is easier to understand with an example:

```vue

<template>
	<input-field
        :pretty="splitPoint"
        :modify = "cleanPoints"
        label = "Text"
    />
</template>
<script setup>
import {InputField} from "./index";
function cleanPoints(a) {
	return a.replaceAll('.', '');
}
function splitPoint(a) {
	return (a || '').split('').join('.');
}
</script>
```

<input-field name = "prettySplit" :pretty="splitPoint" :modify = "cleanPoints" label = "Text"/>
Value: {{values.prettySplit}}

::: warning Value
Remember that the value that goes into modify is equal to the one that is in the input field (in the HTML input).
:::

## numeric
The attribute prohibits entering a non-number into the field.
```html
<input-field numeric />
```

<input-field  label = "Only Numeric" name = "numeric" numeric />