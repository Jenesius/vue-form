<script setup>
import {FormField, Form, useFormValues} from '../../src';

const form = new Form();
const values = useFormValues(form)

</script>

# Поле switch

Поле может использоваться в качестве переключателя или для выбора одного значения
из двух.

- Ключевое слово `switch`.

## Параметры

### values <Badge type = "info">Необязательный</Badge>

- Тип `[any, any]`.
  В случае, если данный параметр передан, то включенный параметр будет соответствовать `values[0]`
  значение, а выключенный `values[1]`.
____ 

Так же все параметры, общие для всех `FormField`. Информацию о них можно посмотреть на [этой странице](./form-field.md#params).

## Значение

Если параметр **values** не был передан, то значение будет **true** - включён, **false** - выключен.
В случае, когда **values** передаётся, включенному значению будет соответствовать `values[0]`,
а выключенному оставшееся значение.

## Спецификация

- Поле доступно при использовании `Tab` и `Shift + Tab`.
- Выбор элемента возможен по щелчку на сам элемент.
- Выбор возможен по нажатию `Enter` или `Space`.
- Блокировка полей отменяет навигацию используя `Tab`.
  Также происходит изменение стилистики `switch`.
- При неудачной валидации поле должно изменить стилистику `switch`.

## Примеры

Для данного поля нет дополнительных обязательных параметров, по этому нам необходимо
указать лишь `type` и `name`:

::: code-group

```html
<form-field name = "hasPhone" type="switch"/>
```

```ts
import {FormField} from "jenesius-vue-form";

```

:::

Поле по умолчанию:
<FormField  type = "switch" name = "isAdmin" label = "Это администратор" />

____

В заблокированном состоянии:
<FormField disabled type = "switch" name = "isAdmin" label = "Заблокированное" />

____

Поле не прошло валидацию:
<FormField :errors = "['Seleact this fields']" type = "switch" name = "isAdmin" label = "С ошибкой" />

____

Поле с переданными `values`: ```['yes', 'no']```
<FormField :values = "['yes', 'no']" type = "switch" name = "useMask" label = "С переданными values" />
_____




----
Текущее состояние формы:
```ts-vue
{{values}}
```