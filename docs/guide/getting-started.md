# Quick start
This section contains information that allows you to customize the form and
manage all the functionality that spans the library.

## Creating a Form
To initialize the form, you also need to create:
```ts
import {Form} from "jenesius-vue-modal"
const form = new Form();
```
Connecting child elements, provide form to child component, setting
the form will make default values itself.

## Input connection
To add input fields, you can use standard components
provided by the library. However, you can also create your own
lean library functionality, [reed more](./custom-field).
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

By default, *InputField* will connect to the nearest parent form.
After that, all control over the input field will go to the *Form* instance.

## Setting and getting values
The main task of the form is to work with the data that has been entered.
user.
Use **form.values** to get data. To set values
you need to pass values to the **form.setValues** method

<script setup>
import WidgetExampleValues from '../components/widget-example-values.vue'
</script>
<WidgetExampleValues/>


----

In this article, the basic features of the library were considered.

- Detailed Form Documentation [here](/guide/form/index.md).
