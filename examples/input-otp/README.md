# Creating Own Input

On the appearance of OneTime Password, we will analyze the creation of our entire input. Its implementation is not much different from
InputCountry (which you can see in the sunrise above). However, there are a few steps to follow:

1. Create a component in which to set works with modelValue:
```vue
<!--input-otp.vue-->
<template>
  <div>
    <p>{{$attrs.label}}</p>
    <input class = "input-otp" type = "text" v-bind = "$attrs" :value="$attrs.modelValue" @input = "$emit('update:modelValue', $event.target.value)"/>

    <div class = "error-list">
      <p
        v-for = "(error, index) in $attrs.errors"
        :key = "index"
      >{{error}}</p>
    </div>
  </div>
</template>
```
In this component, to reduce the year, there is an interaction with the input parameters through **$attrs**.
You can also create props, set a value through them, and work through them:
```ts
const props = defineProps<{
    modelValue?: string,
    label: string,
    errors: string[]
}>()
```

- errors - Standard *jenesius-vue-form*, always an array of strings that display the errors of the current
  input.

2. Next, you need to add it to the repository and use it anywhere:
```vue

<template>
    <input-field name = "one-time-password" type = "otp" maxLength = "5" required label = "Fill OneTime Password"/>
</template>
<script setup>
  import {config, InputField} from "jenesius-vue-form";
  import InputOTP from "input-otp.vue";
    config({
      inputTypes: {
        otp: InputOTP
      }
    })
</script>
```

This example uses the following functions:

- [Custom Widget](https://form.jenesius.com/guide/custom-widgets.html)
- [Config](https://form.jenesius.com/guide/configuration.html#inputtypes)