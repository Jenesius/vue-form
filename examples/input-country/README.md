# Input Country

1. Необходимо создать новый файл input-country.vue и разместить туда следующий код:
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
**Не забудьте** про то, что v-bind должен идти в начале.
**Не забудьте** обернуть input-field в div. Необходимо сделать так, чтобы он не был единственным дочерним элементом.

В данном примере мы передали все props в input-field используя v-bind.
Далее передаём options, их мы рассмотрим на втором шаге. Устанавливаем type и label по умолчанию.

2. Далее нам необходимо создать optionsCountries:
```vue
<script setup>
  const optionsCountries = {
    1: "German",
    2: "USA",
    3: "Russia"
  }
</script>
```
3. Последний шаг: добавить input в хранилище
```ts
// import InputCountry from "./input-country.vue"
import {config} from "jenesius-vue-form"
config({
  inputTypes: {
    country: InputCountry
  }
})
```

Данный пример демонстрирует, как легко можно создавать новые inputs поверх существующих, а затем
их удобно переиспользовать через хранилище.


This example uses the following functions:

- [Form Proxy](https://form.jenesius.com/guide/form-proxy.html#initialization)
- [Config](https://form.jenesius.com/guide/configuration.html#inputtypes)