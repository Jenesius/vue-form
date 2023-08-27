<script setup>
import {Form, FormField, useFormValues} from "./../../../src/index";

const form = new Form();
const values = useFormValues(form)
</script>

# Начнём Использование

Создания веб-приложения использую Vue + JenesiusVueForm является элегантным и простым решением: краткий способ описания
полей позволяет упростить разработку компонент, большой функционал библиотеки позволяет писать многофункциональную логику, 
а реактивность Vue делает простым наш интерфейс.

## Installation
Установите *jenesius-vue-form* как зависимость используя любой менеджер пакетов:
packages:
```shell
npm i jenesius-vue-form
```


## Form

Основным элементом данной библиотеки, как ни странно, является класс Form. Он является основным звеном в построении форм,
т.к. связывание, проверку данных, контроль значения делает автоматически.

```ts
import {Form} from "jenesius-vue-form";

const form = new Form();
```

Мы создали экземпляр формы, теперь на интерфейс необходимо добавить реактивные поля ввода. Они также предоставляются
данной библиотекой.

### Вводные

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
### Результат

<FormField name = "username" label = "Username"/>
<FormField name = "email" label = "Email"/>

```json-vue
{{values}}
```


В следующих разделах руководства мы будем разбирать более подробно эти, и другие интересные возможности.