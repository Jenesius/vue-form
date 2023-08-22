# Установка и Перезапись полей

Разумеется полями описанными на [предыдущей странице](./form-fields) не обойтись. Сама конфигурация полей очень проста.

## Конфигурация

В данной библиотеке есть хранилище полей. Выглядит оно упрощённо следующим образом:

```ts
const store = {
    "date": import('input-date.vue'),
    "text": import('input-text.vue'),
    // И другие
}
```
Прямого доступа к хранилищу у нас нет, но мы можем **добавлять** и **переопределять** поля используя `config`:

```ts
import {config} from "jenesius-vue-form";
import InputCountry from "./input-country.vue";
import InputText from "./new-input-text.vue";

config({
    inputTypes: {
        country: InputCountry, // Создание нового поля
        text: InputText, // Переопределение существующего
    }
})
```

Хорошим тоном является создание новых полей для одинаковых типов(select, radio, checkbox), но разных направлений
использования. Например, у вам необходимо отобразить элемент для выбора страны. Лучшей практикой будет создание
*input-country.vue*, определение там списка стран и подключение к `<form-field type = "select"/>`. 

## Новое поле

В случаи со странами виджет будет выглядеть следующим образом:

```vue
<template>
	<div>
		<form-field
            v-bind = "$attrs"
			type = "select"
            :options = "countryOptions"
        />
	</div>
</template>
<script setup>
import {FormField} from "jenesius-vue-form";

const countryOptions = [
	{ label: 'Canada', value: 'ca' },
	{ label: 'Australia', value: 'au' },
    // Other
]
</script>
```

Мы переопределили *type* и *options*, но при этом воспользовались конструкцией `v-bind:$attrs`, для проброса всех
пропсов и событий.

::: warning DIV
Обратите внимание на `<div>`, он необходим для того, чтобы не происходило автоматического пробрасывания параметров. Без
него options не будет работать.
:::

## Параметры

Если вы устанавливаете поле через **config**, а затем используйте **formField**, то вам доступны следующий props:

```ts
defineProps<{
	name: string,
    modelValue: any,
    ...
}>()
```

### name
Строковое значение названия поля.

### modelValue
Значение поля полученного из формы.

### disabled
Логическое значение, принимающее true, если данное поле заблокировано.

### changed
Логическое значение, принимающее true, если поле помечено, как изменённое.

### errors
Массив строк, хранящий текст ошибок. Является результатом неверной валидации поля.

### options
Обработанный массив. Подробнее можно прочитать [здесь](./form-fields#select)
