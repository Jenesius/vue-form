<script setup>
import {FormField, Form, useFormValues} from '../../../src';

const form = new Form();
const values = useFormValues(form);

</script>

# Поле tel

Поле используется для ввода численных значений.

- Ключевое слово `tel`.
- WhatWG [Спецификация](https://html.spec.whatwg.org/multipage/input.html#telephone-state-(type=tel)).

## Параметры

### autofocus <Badge type = "info">Необязательный</Badge>

- Тип `boolean | 'true' | 'false'`

Если данный параметр передаётся, при установке данного поля, на него будет автоматически передано управление.

____ 

Так же все параметры, общие для всех `FormField`. Информацию о них можно посмотреть на [этой странице](./form-field.md#params).

## Значение
Данное поле работает со строковым значением.

- Поле доступно при использовании `Tab` и `Shift + Tab`.
- Блокировка отменяет навигацию через `Tab`.
- Блокировка поля изменяет стилистику `number`.
- Ошибка валидации изменяет стилистику `number`.
- Результирующим значением поля является строка цифр.
- Формат поля используется исключительно для ввода мобильных номеров. В иных случаях необходимо
воспользоваться `text` и атрибутами `pretty/modify`.
- Поле должно отображать иконку страны, к которой принадлежит введённый телефон, пустую - в случае, 
если номер не удалось обработать. Анализ введённых данных лежит на `libphonenumber-js`.
- Иконки, используемые для отображения принадлежности к стране, берутся с [flagcdn.com](https://flagcdn.com).



## Пример

Для данного поля нет дополнительных обязательных параметров, по этому нам необходимо
указать лишь `type` и `name`:

::: code-group
```html
<form-field name = "phone" type="tel"/>
```

```ts
import {FormField} from "jenesius-vue-form";
```
:::


Поле по умолчанию:
<FormField  type = "tel" name = "phone" label = "Введите значение" />

____

В заблокированном состоянии:
<FormField type = "tel" name = "phone" disabled   label = "Заблокированное" />

____

Поле не прошло валидацию:
<FormField  type = "tel" name = "phone" :errors = "['The password is too simple']"  label = "С ошибкой" />

----
Текущее состояние формы:
```ts-vue
{{values}}
```