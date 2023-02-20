# Использование v-model

Мы постарались сделать всё, чтобы использование данной библиотеки было комфортным. Одним из таких моментов
является директива *v-model*. В описании формы сказано, что все зависимые элементы полагаются на состояние 
именно формы, а не переданного modelValue. Однако в случае, если свойство *name* не указано для поля ввода
input полагается именно на значение *model-value*:

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

В данном примере мы регистрируем два поля для ввода. Одно будет прикрепляться к форме по имени *city*, а другое
не будет зависеть от формы, в таком случае оно будет полагаться на значение из *modelValue*.

Также не забывайте про использование ручных настроек *v-model*, данный пример отлично описан в 
[документации](https://vuejs.org/guide/components/v-model.html) для Vue. Использование такого механизма
можно добиться не редактируемого поля:
```vue
<template>
    <input-field label = "City" v-model = "value"/>
    <input-field label = "City (Local)" :model-value = "value"/>
</template>
```
Достаточно просто пример, на котором даже при вводе или при выборе значения, состояние поля не будет изменяться.
Однако, как только мы добавим свойство name, *model-value* будет игнорироваться
```vue
<template>
    <input-field label = "City" v-model = "value"/>
    <input-field label = "City (Local)" :model-value = "value" name = "city"/>
</template>
```
Теперь второе поле полагается именно на состояние формы, а не на modelValue.


