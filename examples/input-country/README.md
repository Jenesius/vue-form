# Input Country

1. You need to create a new input-country.vue file and place the following code there:
```vue
<template>
  <div>
    <input-field
        v-bind="$attrs"
        :options = "optionsCountries"
        type = "select"
        label = "Country"
    />
  </div>
</template>
```

**Don't forget** v-bind must come first.

**Don't forget** to wrap the input-field in a div. You need to make sure that it is not the only child element.

In this example, we passed all the props to the input-field using v-bind.

Next, we pass options, we will consider them in the second step. Set the default type and label.
2. Next, we need to create optionsCountries:
```vue
<script setup>
  const optionsCountries = {
    1: "German",
    2: "USA",
    3: "Russia"
  }
</script>
```
3. Last step: add input to storage
```ts
// import InputCountry from "./input-country.vue"
import {config} from "jenesius-vue-form"
config({
  inputTypes: {
    country: InputCountry
  }
})
```

This example demonstrates how easy it is to create new inputs on top of existing ones and then
it is convenient to reuse them through storage.

This example uses the following functions:

- [Config](https://form.jenesius.com/guide/configuration.html#inputtypes)