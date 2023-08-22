# Peculiarities

However, it is important to keep the following things in mind when working with forms:

## Fragmentation

If you pass a value:
```json
{
   "address.city": "Emerald City"
}
```
It converts to:
```json
{
   "address": {
     "city": "Emerald City"
   }
}
```
This is the basic principle of working with **Form** that you need to know. It can be very useful when working with **GraphQL**.
If the key is compound (has separators **.**), then it will be decomposed.

This is easier to show with an example. Let's say on the interface we need
show the address, which consists of two fields: Country and City. In the best traditions, we will create a separate field
for the address structure and describe the above two fields there:

```vue{3,4,13}
// input-address.vue
<template>
     <div>
         <form-field name = "country" label = "Country"/>
         <form-field name = "city" label = "City"/>
     </div>
</template>
<script setup lang="ts">
import {FormField, Form} from "jenesius-vue-form";

const props = defineProps({
     name: String
})
const form = new Form({name: props.name})
</script>
```
Next, we will connect this component to our project

```vue{4}
// app.vue
<template>
<input-address name="address"/>
<form-field name="address.city" label="Short City"/>
</template>
<script setup>
import {FormField, Form} from "jenesius-vue-form";
import InputAddress from "./input-address.vue";

const form = new Form();
</script>
```
Notice the **address.city** field. If you run this example, you will see that this field is double-sided.
link to the **city** field inside **input-address.vue**. To ensure this result, **Form** processes
input and simplifies it.


## Value Composition

There are three main places where data is stored in a form:

### pureValues
This is the deepest object. It stores the data that was set using **setValues** without a parameter
changed. In general, you will not use this property, but prefer the remaining two.
### changes
The object stores only those fields that have been changed. The object is changed when using **change** or setValues with
parameter `change: true`. This object is used when saving values, when we need to pull out only
changes without affecting values that were not touched.
### values
The object is dynamically calculated and stores a mixture of **changes** and **pureValue** or in other words the given object
is the result of merging the first two.