# Использование v-model

Мы постарались сделать так, чтобы пользоваться этой библиотекой было
комфортно. Один из таких моментов это директива *v-model*. В описании 
формы сказано, что все зависимые элементы связаны с состоянием формы, 
и не полагаются на значение modelValue. Однако, если свойство *name* 
не указано, то `form-field` полагается на *model-value*:

::: warning Не используйте modelValue с именем
Одновременное использование v-model(:modelValue) и **name** приводит к
сохранению состояния формы в двух местах: непосредственно в форме и в 
переменной, передаваемой в modelValue. Мы не рекомендуем использовать 
оба этих свойства вместе. Вместо этого используйте
[ComputedValue](./../guide/reactivity#computedValue)
и [setValues](./../guide/working-with-values#setValues) для получения 
и изменения значений.
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

В этом примере мы регистрируем два поля ввода. Один будет прикреплено 
к форме с именем *city*, а другое не будет зависеть от формы, и в этом
случае оно будет полагаться на значение из *modelValue*.

Также не забудьте использовать ручные настройки *v-model*, этот пример
хорошо описан в [документации](https://vuejs.org/guide/components/v-model.html)
для Vue. Используя такой механизма вы можете получить неизменяемое поле:
```vue
<template>
    <input-field label = "City" v-model = "value"/>
    <input-field label = "City (Local)" :model-value = "value"/>
</template>
```
Достаточно простого примера, на котором даже при вводе или выборе
значения состояние поля не изменится. Однако, как только мы добавим
свойство name, *model-value* будет игнорироваться, и вы также можете
увидеть это в консоли предупреждение:
```vue
<template>
    <input-field label = "City" v-model = "value"/>
    <input-field label = "City (Local)" :model-value = "value" name = "city"/>
</template>
```
Теперь второе поле зависит от состояния формы, а не от modelValue.


