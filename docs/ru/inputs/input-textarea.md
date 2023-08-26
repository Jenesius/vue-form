<script setup>
import {FormField, Form, useFormValues} from '../../../src';

const form = new Form();
const values = useFormValues(form)

</script>

# Поле textarea

Поле используется для ввода длинного текста.

- Ключевое слово `textarea`.
- WhatWG [Спецификация](https://html.spec.whatwg.org/multipage/form-elements.html#the-textarea-element).

## Параметры

### autofocus <Badge type = "info">Необязательный</Badge>

- Тип `boolean | 'true' | 'false'`

Если данный параметр передаётся, при установке данного поля, на него будет автоматически передано управление.

### autoresize <Badge type = "info">Необязательный</Badge>
- Тип `boolean | number | string`

После ввода данных поле будет растягиваться, если данный параметр задан. 

Если передать `true`, поле будет
растягиваться под размер текста внутри него.

Передача численного значения установит максимальное количество
строк, которое поле будет отображать без прокрутки. При превышении это количества 
появится вертикальная прокрутка.

### placeholder <Badge type = "info">Необязательный</Badge>
- Тип `string`

Строковое значение подсказки перед вводом данных.

____ 

Так же все параметры, общие для всех `FormField`. Информацию о них можно посмотреть на [этой странице](./form-field.md#params).

## Значение

Данное поле работает со строковыми значениями.

## Спецификация

- Поле доступно при использовании `Tab` и `Shift + Tab`.
- Блокировка отменяет навигацию через `Tab`.
- Блокировка поля изменяет стилистику `textarea`.
- Ошибка валидации изменяет стилистику `textarea`.
- При установке `autoresize` размер должен всегда проверяться, при изменении
значения

## Примеры


Для данного поля нет дополнительных обязательных параметров, по этому нам необходимо
указать лишь `type` и `name`:

::: code-group

```html
<form-field name = "pass" type="textarea"/>
```

```ts
import {FormField} from "jenesius-vue-form";

```

:::

Поле по умолчанию:
<FormField  type = "textarea" name = "description" label = "Введите описание" />

____

В заблокированном состоянии:
<FormField disabled type = "textarea" name = "description" label = "Заблокированное" />

____

Поле не прошло валидацию:
<FormField :errors = "['The password is too simple']" type = "textarea" name = "description" label = "С ошибкой" />

____

Автоматическое увеличение поля при изменении данных:
<FormField autoresize type = "textarea" name = "description" label = "Делаем больше" />


----
Текущее состояние формы:
```ts-vue
{{values}}
```