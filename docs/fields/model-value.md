# Using v-model

We tried to do everything to make the use of this library comfortable. One of those moments
it's a *v-model* directive. The form description says that all dependent elements depend on the state
form, not the exact modelValue passed in. However, if the *name* property is not specified for the input field
input is given exactly by *model-value*:

::: warning Don't use modelValue with name
Using v-model(:modelValue) and **name** at the same time causes the form state to be saved in two places:
directly in the form and in the variable passed in modelValue. We do not recommend using both of these properties together.
Use [ComputedValue](./../guide/reactivity#computedValue) instead
and [setValues](./../guide/working-with-values#setValues) to get and change values.
:::

```vue

<template>
     <input-field name="city"/>
     <input-field v-model="input"/>
</template>
<script setup>
import {InputField} from "jenesius-vue-form";

const input = ref("");

</script>
```

In this example, we are registering two input fields. One will be attached to a form named *city* and the other
will not depend on the form, in which case it will rely on the value from *modelValue*.

Also don't forget to use *v-model* manual settings, this example is well described in
[documentation](https://vuejs.org/guide/components/v-model.html) for Vue. Using such a mechanism
you can get a non-editable field:
```vue
<template>
     <input-field label="City" v-model="value"/>
     <input-field label = "City (Local)" :model-value = "value"/>
</template>
```
A simple example is sufficient, where even when entering or selecting a value, the state of the field will not change.
However, once we add the name property, *model-value* will be ignored and you can also see this in the console
warning:
```vue
<template>
     <input-field label="City" v-model="value"/>
     <input-field label = "City (Local)" :model-value = "value" name = "city"/>
</template>
```
Now the second field depends on the state of the form, and not on the modelValue.