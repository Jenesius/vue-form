# Jenesius Vue Form
Heavy form system for Vue.js ( Only 3 Version ). Library provides a wide range of
functionality and interaction with form elements.

## Links
- [Documentation](https://form.jenesius.com/)
- Examples
- [GitHub](https://github.com/Jenesius/vue-form)
## Reason For Use

![](https://img.shields.io/npm/dm/jenesius-vue-form)
![](https://img.shields.io/npm/dt/jenesius-vue-form)
![](https://img.shields.io/github/issues/Jenesius/vue-form)
![](https://img.shields.io/github/stars/Jenesius/vue-form)

- 💪 The functionality of the form allows you to flexibly work with dependent elements.
- 🤝 Create complex interfaces with lots of dependencies. One page can contain many
forms that will be managed from one place.
- ✍ Connect your own input fields to the form. This gives flexibility and
independence on the part of the site design.

*Where the spirit does not work with the hand there is no art.* @Leonardo da Vinci

## Main Form
To create a form, you just need to create an instance. JenesiusVueForm will do
most of the work for you.
```ts
import {Form} from "jenesius-vue-modal"
const form = new Form()
```

### Main Form state
The reactive form state can be obtained from the **useFormState** hook:
```js
import {useFormState} from "jenesius-vue-modal"
const {state} = useFormState(form) // disabled changed
```

## Proxy Form
Composite objects (For example, Address, which contains country, city etc.)
can be created by calling the **useProxyState** hook.
```ts
import {useProxyState} from "jenesius-vue-modal"
const {state} = useProxyState(name);
```
In this example, the Composite field will automatically subscribe to the parent form,
and will also serve as a bridge for all its child elements.

## Input
When using the built-in input field, the library will do everything for you.
You don't need to sign it on the form yourself.
```vue
<template>
    <input-field type = "text" name = "user" label = "Username"/>
    <input-field type = "text" name = "age" label = "Age"/>
</template>
<script setup>
    import {Form, InputField} from "jenesius-vue-form"
    
    const form = new Form();
</script>
```

### Custom Input
In most cases, you will use your own input fields.
In this case, you need to implement a small layer:

```vue
<input type = "text" 
    @input = "input.change($event.target.value)" 
    :value="state.value"
    :disabled = "state.disabled"
>
```
```js
import {useInputState} from "jenesius-vue-modal"
const {state, input} = useInputState(props.name)
// state - {value, disabled, errors}
```
- **input** - an instance of Input which has several methods to work with
  form interaction.

## Full Functionality
I recommend going to the [documentation site](http://form.jenesius.com/),
which provides information on 
validation, form lock/unlock, and all the states of the form and input fields.
