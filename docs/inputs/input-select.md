<script setup>
import ExampleInputSelectPets from "./../components/input-select/example-input-select-pets.vue" ;
import ExampleInputSelectLabel from "./../components/input-select/example-input-select-label.vue" ;
import ExampleInputSelectSearch from "./../components/input-select/example-input-select-search.vue" ;
</script>

# Input Select
На данной странице вы сможете найти всю информацию про *input-select*, параметры и атрибуты, которые данный тип
поля для ввода принимает. 

## Использование
Чтобы воспользоваться input-select, укажите **select**, как тип для input-field:
```html
<input-field type = "select" />
```

Данный пример уже прорисует поле для выборки. Однако, необходимо установить *options* - перечисление значений,
которые могут быть использованы для выборки. О том, какого типа может быть options можно подробнее прочитать
[здесь]/guide/about-options.

Для нашего примера воспользуемся простой выборкой:

```vue
<template>
	<input-field type = "select" :options = "arrayPets" />
</template>
<script setup>
import {InputField} from "jenesius-vue-form";

const arrayPets = [
    { value: 'F', label: 'Fish' },
    { value: 'C', label: 'Cat'  },
    { value: 'D', label: 'Dog' }
]
</script>
```
Результатом будет следующее:
<ExampleInputSelectPets/>

## Label and Placeholder
Для большей интерактивности вы можете использовать свойства *label* и *placeholder* для того, чтобы донести
дополнительную информацию до пользователя:

```vue

<template>
	<input-field
        type = "select"
        label = "Pets"
        placeholder = "Select favorit pet"
    />
</template>
```
В результате получаем следующее:
<ExampleInputSelectLabel/>

## Search
В случае, если список значений включает больше количество значений в элемент select добавляет строка для поиска:
<ExampleInputSelectSearch/>

## Hidden Values
Для удобства работы было добавлено свойство **hidden-values** принимающее массив значений, которые не должны
показываться в списке. Это можно реализовать самостоятельно используя конструкцию *computed*, но мы добавили этот
функционал для более чистого кода:

```vue

<template>
	<input-field
        type = "select"
        :options = "options"
        :hidden-values = "['js', 'ts']"
    />
</template>
<script setup>
    const options = [
        { value: "js", label: "JavaScript" },
        { value: "ts", label: "TypeScript" },
        { value: "py", label: "Python"},
        { value: "ass", label: "Assembler" }
    ]
</script>
```
В данном примере будут показываться только **Python** и **Assembler**.

## Интерактивность
Также данное поле для ввода поддерживает использование клавиатуры: Tab, Key Down, Key Up, Enter, Escape.