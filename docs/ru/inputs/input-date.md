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
<FormField  type = "date" name = "created" label = "Это администратор" />

____

В заблокированном состоянии:
<FormField disabled type = "date" name = "created" label = "Заблокированное" />

____

Поле не прошло валидацию:
<FormField :errors = "['Seleact this fields']" type = "date" name = "created" label = "С ошибкой" />

____

Изменённое значение `mask`:
<FormField mask = "YYYY_MM" type = "date" name = "deleted" label = "С переданными values" />
_____


----
Текущее состояние формы:
```ts-vue
{{values}}
```