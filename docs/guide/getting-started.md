<script setup>
import {Form, FormField, useFormValues} from "./../../src/index";

const form = new Form();
const values = useFormValues(form)
</script>

# Let's Start Using

Creating a web application using **Vue** + **JenesiusVueForm** is an elegant and simple solution: a concise way to describe
fields allows you to simplify the development of components, the large functionality of the library allows you to write
multifunctional logic and Vue's reactivity keeps our interface simple.

## Installation
Install *jenesius-vue-form* as a dependency using any manager
packages:
```shell
npm i jenesius-vue-form
```


## Form

The main element of this library, oddly enough, is the Form class. It is the main link in the construction of forms,
because linking, data validation, value control is done automatically.

```ts
import {Form} from "jenesius-vue-form";

const form = new Form();
```

We have created an instance of the form, now we need to add reactive input fields to the interface. They are also provided
by this library.

### Introductory

```vue{2,3}
<template>
    <form-field name="username" label="Username"/>
    <form-field name="email" label="Email"/>
</template>

<script setup>
import {FormField, Form} from "jenesius-vue-form";

const form = new Form()
</script>
```
### Result

<FormField name = "username" label = "Username"/>
<FormField name = "email" label = "Email"/>

```json-vue
{{values}}
```


In the following sections of the guide, we will explore these and other interesting features in more detail.