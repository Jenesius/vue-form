<script setup>
import {FormField, Form, useFormValues} from '../../../src';

const form = new Form();
const values = useFormValues(form)

</script>

# Поле date

Поле используется для выбора даты и обрабатывает время в ISO формате.

- Ключевое слово `date`.
- WhatWG [Спецификация](https://html.spec.whatwg.org/multipage/input.html#date-state-(type=date)).

## Параметры

### placeholder <Badge type = "info">Необязательный</Badge>

- Тип `string`
Строковая метка, отображается, когда в поле нет данных.

### mask <Badge type = "info">Необязательный</Badge>

- Тип `string`.
- По умолчанию: `YYYY/MM/DD`.

Маска задаёт формат отображение даты. Маска может состоять из символов любых символов, однако 
ключевыми являются `Y`, `M`, `D`, `H` и `h`. На их позицию будут подставлены соотвествующие значений.

### handlers
- Тип: 'array'

Массив обработчиков, которые можно применить к значению поля ввода. Массив должен состоять из двух элементов. Первый
является обработчиком значения из модели форму к типу `Date`. Второй обработчик является конвертером из строки(значения,
находящееся внутри поля ввода) в значение, которое необходимо хранить в модели данных формы.

#### Example

```vue

<template>
  <FormField type="date" :handlers="[handlerForm, handlerTo]" mask = "YYYY-MM-DD HH"/>
</template>
<script setup>
  import {DateController} from "jenesius-vue-form";

  function handlerFrom(formValue) {
    return new Date(formValue)
  }

  function handlerTo(strValue) {
    return DateController.ConvertToDate(strValue, 'YYYY-MM-DD HH').toISOString()
  }
</script>
```
В текущем примере мы установили новую маску для данного поля, а также определили обработчики для конвертации значения в
ISO формат даты.
____ 

Так же все параметры, общие для всех `FormField`. Информацию о них можно посмотреть на [этой странице](./form-field.md#params).

## Значение

Значение поля выступает строка соответсвующая упрощённому расширенному
ISO формату [(ISO 8601)](https://en.wikipedia.org/wiki/ISO_8601).

## Спецификация

- Поле доступно при использовании `Tab` и `Shift + Tab`.
- Ввод даты возможно используя поле ввода.
- Для выбора даты доступен дополнительный контроллер: календарь.
- Календарь не должен быть доступен для `Tab` или `Shift + Tab`.
- Блокировка полей отменяет навигацию используя `Tab`.
  Также происходит изменение стилистики `date`.
- При неудачной валидации поле должно изменить стилистику `date`.

## Примеры

Для данного поля нет дополнительных обязательных параметров, по этому нам необходимо
указать лишь `type` и `name`:

::: code-group

```html
<form-field name = "created" type="date"/>
```

```ts
import {FormField} from "jenesius-vue-form";

```

:::

Поле по умолчанию:
<FormField  type = "date" name = "created" label = "Дата создания" />

____

В заблокированном состоянии:
<FormField disabled type = "date" name = "created" label = "Заблокированное" />

____

Поле не прошло валидацию:
<FormField :errors = "['Seleact this fields']" type = "date" name = "created" label = "С ошибкой" />

____

Изменённое значение `mask`:
<FormField mask = "YYYY_MM" type = "date" name = "deleted" label = "С переданными mask" />
_____


----
Текущее состояние формы:
```ts-vue
{{values}}
```