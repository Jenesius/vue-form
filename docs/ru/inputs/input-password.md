<script setup>
import {FormField, Form, useFormValues} from '../../../src';

const form = new Form();
const values = useFormValues(form)

</script>

# Поле password

Поле используется для ввода пароля.

- Ключевое слово `password`.
- WhatWG [Спецификация](https://html.spec.whatwg.org/multipage/input.html#password-state-(type=password)).

## Параметры

### autofocus <Badge type = "info">Необязательный</Badge>

- Тип `boolean | 'true' | 'false'`

Если данный параметр передаётся, при установке данного поля, на него будет автоматически передано управление.
____ 

Так же все параметры, общие для всех `FormField`. Информацию о них можно посмотреть на [этой странице](./form-field.md#params).

## Значение

Данное поле работает со строковыми значениями.

## Спецификация

- Поле доступно при использовании `Tab` и `Shift + Tab`.
- Переключение режимов ввода изменяется переключателем.
- Блокировка отменяет навигацию через `Tab`.
- Блокировка поля изменяет стилистику `password`.
- Ошибка валидации изменяет стилистику `password`.

## Примеры

Для данного поля нет дополнительных обязательных параметров, по этому нам необходимо
указать лишь `type` и `name`:

::: code-group

```html
<form-field name = "pass" type="password"/>
```

```ts
import {FormField} from "jenesius-vue-form";

```

:::

Поле по умолчанию:
<FormField  type = "password" name = "pass" label = "Введите пароль" />

____

В заблокированном состоянии:
<FormField disabled type = "password" name = "pass" label = "Заблокированное" />

____

Поле не прошло валидацию:
<FormField :errors = "['The password is too simple']" type = "password" name = "pass" label = "С ошибкой" />

____


----
Текущее состояние формы:
```ts-vue
{{values}}
```