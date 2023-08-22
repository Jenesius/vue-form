# Custom Widgets
You can still use your own input fields. If to speak
Exactly, this is a more versatile and more practical way. In order to connect
custom input fields, you can use two methods:

## Using config
This method is convenient in that we do not abandon the `InputField` functionality, but
overwrite part of it. This method is described [here](/guide/configuration#inputtypes).

Any *props* passed will also be passed to your component.
But! There are some differences worth mentioning:

- **options** Array of options, used for select/radio. Read more [here](/utils/convert-options-object). The data undergoes additional transformation and always has a place to be:

```ts
type Options = Array<{
    label: string,
    value: any
}>



```
- **disabled** Will be dynamically pulled from the form. Changed using *disable/enable* methods
- **errors** Is an array of strings
- **changed** Dynamically pulled out of the mold. True - if the field is marked as modified in the form.

## Own Components

For example, let's implement our own text input field.
```vue
<template>
    <input
        type = "text"
        :value="state.value"
        :disabled = "state.disabled"
        @input = "input.change($event.target.value)"
    >
</template>
<script setup>
    import {useInputState} from "jenesius-vue-form"
    const {state, input} = useInputState(props.name)
</script>
```
The *useInputState* method returns an instance of the Input class and a reactive state
this field. After using useInputState , the given input is automatically
connect to the parent form.

In this example, *state* and *state.disabled* were shown. To get an array
errors (string[]), in **useInputState** you need to pass the second parameter
ValidationGuard array:
```ts
const validation = [
	v => !!v || 'Field is required',
    v => (!!v && String(v).length >= 5) || 'Line length less than five'
]
useInputState(props.name, validation);
```
Usually instead of `const validation` the input parameter *props.validation* is used

## Composite Input
To implement composite inputs such as address (city, street, country), document
(number, code) you must use **FormProxy**. Full information about
compound fields and how to make them is [here](/guide/form-proxy).
