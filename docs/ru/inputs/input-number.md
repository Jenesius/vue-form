<script setup>
import {FormField, Form, useFormValues} from '../../../src';

const form = new Form();
const values = useFormValues(form);

function prettyFn(value) {
    if (!value) return '0';
    return `- ${value} -`;
}

</script>

# Поле number

Поле используется для ввода численных значений.

- Ключевое слово `number`.
- WhatWG [Спецификация](https://html.spec.whatwg.org/multipage/input.html#number-state-(type=number)).


## Параметры

### autofocus <Badge type = "info">Необязательный</Badge>

- Тип `boolean | 'true' | 'false'`

Если данный параметр передаётся, при установке данного поля, на него будет автоматически передано управление.

### suffix <Badge type = "info">Необязательный</Badge>
- Тип `string`

Если данные атрибут установлен, текстовая метка будет отображаться в конце поля.

### step <Badge type = "info">Необязательный</Badge>
- Тип `number | string`
Данное поле имеет механизм увеличения или уменьшения введённого числа на 1. Для изменения этого параметра
необходимо задать атрибут `step`.

### pretty <Badge type = "info">Необязательный</Badge>
- Тип [StringModify](./../guide/types#StringModify) | [StringModify](./../guide/types#StringModify)
Используется для изменения отображения поля. Данные правила принимаются только после того, как
поле стало не активным.

### placeholder <Badge type = "info">Необязательный</Badge>
- Тип `string`

Строковое значение подсказки перед вводом данных.

____ 

Так же все параметры, общие для всех `FormField`. Информацию о них можно посмотреть на [этой странице](./form-field.md#params).

## Значение
Данное поле работает с числовым значениями.

## Спецификация

- Поле доступно при использовании `Tab` и `Shift + Tab`.
- Блокировка отменяет навигацию через `Tab`.
- Работа со значением может осуществляться через дополнительный контроллер.
- Блокировка поля изменяет стилистику `number`.
- Ошибка валидации изменяет стилистику `number`.
- Поле позволяет вводить цифры и символы из `+-.,`.

## Пример

Для данного поля нет дополнительных обязательных параметров, по этому нам необходимо
указать лишь `type` и `name`:

::: code-group
```html
<form-field name = "value" type="number"/>
```

```ts
import {FormField} from "jenesius-vue-form";
```
:::


Поле по умолчанию:
<FormField  type = "number" name = "value" label = "Введите значение" />

____

В заблокированном состоянии:
<FormField type = "number" name = "value" disabled   label = "Заблокированное" />

____

Поле не прошло валидацию:
<FormField  type = "number" name = "value" :errors = "['The password is too simple']"  label = "С ошибкой" />

____

Поле с использованием аттрибута `suffix`:
<FormField  type = "number" name = "value" label = "Введите значение" suffix = "mHz" />

____

Поле с изменённым значение `step`:
<FormField  type = "number" name = "value" label = "Введите значение" step = "100" />
____

Изменение конечного отображения поля при помощи аттрибута `pretty`:
<FormField  type = "number" name = "value" label = "Введите значение" :pretty = "prettyFn" />

----
Текущее состояние формы:
```ts-vue
{{values}}
```