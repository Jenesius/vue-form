<script setup>
import {FormField, Form, useFormValues} from '../../../src';

const form = new Form();
const values = useFormValues(form);

function prettyFn(v) {
    if (!v) return '';
    return `- ${v} - `;
}
function modifyFn(v) {
    if (!v) return '';
    return v.replace(/[^qwerty]/gi, '');
}

</script>

# Поле text

Поле используется для ввода текста.

- Ключевое слово `text`. Используется по умолчанию.
- WhatWG [Спецификация](https://html.spec.whatwg.org/multipage/input.html#text-(type=text)-state-and-search-state-(type=search)).

## Параметры

### autofocus <Badge type = "info">Необязательный</Badge>

- Тип `boolean | 'true' | 'false'`.

Если данный параметр передаётся, при установке данного поля, на него будет автоматически передано управление.

### placeholder <Badge type = "info">Необязательный</Badge>
- Тип `string`

Строковое значение подсказки перед вводом данных.

### maxlength <Badge type = "info">Необязательный</Badge>
- Тип 'string | number'
Ограничивает максимальный размер вводимых данных.

### prefix <Badge type = "info">Необязательный</Badge>
- Тип 'string'
Если данный атрибут передан, он будет отображаться перед вводимым значением.

### numeric <Badge type = "info">Необязательный</Badge>
- Тип `boolean`
Если данный атрибут указан, ввод будет приводиться к валидному числу. Обратите внимание,
что тип возвращаемого значения остаётся строковым.

### pretty <Badge type = "info">Необязательный</Badge>
- Тип [StringModify](./../guide/types#StringModify).

Используется для изменения отображения поля. Не изменяет значение, хранимое в форме.
Данные правила принимаются только после того, как поле стало не активным.

### modify <Badge type = "info">Необязательный</Badge>
- Тип [StringModify](./../guide/types#StringModify).

Функция для изменения вводимого значения. В отличие от `pretty`, работает перманентно.
Изменяет значение хранимое в форме.

____ 

Так же все параметры, общие для всех `FormField`. Информацию о них можно посмотреть на [этой странице](./form-field.md#params).

## Значение

Данное поле работает со строковыми значениями.

## Спецификация

- Поле доступно при использовании `Tab` и `Shift + Tab`.
- Блокировка отменяет навигацию через `Tab`.
- Блокировка поля изменяет стилистику `text`.
- Ошибка валидации изменяет стилистику `text`.
- Аттрибут `maxlength` влияет на ограничения только при вводе значения. Если значение 
будет установлено из формы и по длине будет превышать значение `maxlength`, оно не будет
обрезано в поле, а выведется полностью.


## Примеры


Для данного поля нет дополнительных обязательных параметров, по этому нам необходимо
указать лишь `name`, т.к. атрибут `type` по умолчанию имеет значение `text`. Функции `pretty` 
и `modify` находятся во вкладке `ts`:

::: code-group
```html
<form-field name = "username"/>
```

```ts
import {FormField} from "jenesius-vue-form";

function prettyFn(v) {
	if (!v) return '';
	return `- ${v} - `;
}
function modifyFn(v) {
	if (!v) return '';
	return v.replace(/[^qwerty]/gi, '');
}
```
:::

Поле по умолчанию:
<FormField name = "username" label = "Введите Username" />

____

В заблокированном состоянии:
<FormField disabled  name = "username" label = "Заблокированное" />

____

Поле не прошло валидацию:
<FormField :errors = "['The password is too simple']"  name = "username" label = "С ошибкой" />

____

Ограничение длинны поля используя `maxlength`:
<FormField name = "username" label = "Введите Длинне 5" maxlength = 5 />

____

Использование `prefix`:
<FormField name = "username" label = "Введите значение" prefix = "username:" />

____

Ввод строки приводимой к числу, использование атрибута `numeric`:
<FormField name = "username" label = "Введите значение" numeric />

____

Изменение только отображаемого значения при помощи `pretty`:
<FormField name = "username" label = "Ввод красивого значения" :pretty = "prettyFn" />

____ 
Изменения ввода через `modify`:
<FormField name = "username" label = "Используй только q w e r t y" :modify = "modifyFn" />

----
Текущее состояние формы:
```ts-vue
{{values}}
```