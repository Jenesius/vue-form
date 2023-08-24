# Setting and Overwriting Fields

Of course, the fields described on the [previous page] (./form-fields) are indispensable. The field configuration itself is very simple.

## Configuration

This library has a field store. It looks simplified like this:

```ts
const store = {
     "date": import('input-date.vue'),
     "text": import('input-text.vue'),
     // And others
}
```
We don't have direct access to the repository, but we can **add** and **override** fields using `config`:

```ts
import {config} from "jenesius-vue-form";
import InputCountry from "./input-country.vue";
import InputText from "./new-input-text.vue";

config({
     inputTypes: {
         country: InputCountry, // Create a new field
         text: InputText, // Override existing
     }
})
```

It's good practice to create new fields for the same types (select, radio, checkbox) but in different directions
use. For example, you need to display an element to select a country. The best practice would be to create
*input-country.vue*, defining a list of countries there and connecting to `<form-field type = "select"/>`.

## New field

In cases with countries, the widget will look like this:

```vue
<template>
    <div>
        <form-field
            v-bind = "$attrs"
            type="select"
            :options = "countryOptions"
        />
    </div>
</template>
<script setup>
import {FormField} from "jenesius-vue-form";

const countryOptions = [
    { label: 'Canada', value: 'ca' },
    { label: 'Australia', value: 'au' },
    // other
]
</script>
```

We have overridden *type* and *options*, but have used the `v-bind:$attrs` construct to forward all
props and events.

::: warning DIV
Pay attention to the `<div>`, it is necessary so that there is no automatic forwarding of parameters. Without
its options won't work.
:::

## Options

If you set the field via **config** and then use **formField** then the following props are available to you:

```ts
defineProps<{
    name:string
    modelValue: any
    ...
}>()
```

### name
The string value of the field name.

### modelValue
The value of the field received from the form.

### disabled
A Boolean value that evaluates to true if this field is disabled.

### changed
A Boolean value that evaluates to true if the field is marked as modified.

### errors
An array of strings containing the error text. Is the result of incorrect field validation.

### options
processed array. More details can be found [here](./form-fields#select)