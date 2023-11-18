# Валидация Форм

Для валидации формы используется метод **validate**, который возвращает логическое значение - является
ли форма валидной. В процессе выполнения данного метода происходи проверка всех дочерних элементов на 
валидность. В них также вызывается методов **validate**, если такой представлен. Так происходит и для следующих
дочерних элементов и так далее вглубь.

```vue{7-9}
<template>
	<form-field name = "age" :validation = "ageValidation"/>
</template>
<script setup>
import {Form, FormField} from "jenesius-vue-form";

function ageValidation(x) {
	return x > 17 || 'So small'
}

form.setValues({ age: 17 });
form.validate() // false

form.setValues({ age: 24 });
form.validate() // true
</script>
```

Для валидации поля, FormField принимает один обязательный параметр:

#### validation <Badge type = "tip">Обязательный</Badge>
Имеет следующий тип:
```ts
interface FormFieldProps {
	validation: FormFieldValidationCallback[] | FormFieldValidationCallback // [!code focus]
}
```
Как видно из спецификации поле может принимать как одиночную функцию, так и массив функций. Тип функции описан ниже:
```ts
type FormFieldValidationCallback = (value: any) => true | string | boolean
```

- Если функция вернула *true* - поля ввода является валидным, в ином другом случае - нет.
- Если передан массив функций, то они будут запущены друг за другом и поле будет являться валидным, если все
функции вернут true.

## Примеры Валидации

### Ограничение размеров
```vue
<template>
	<form-field name = "token" :validation = "validation"/>
</template>
<script setup>
import {FormField, Form} from "jenesius-vue-form";

const validation = [
	x => x.length > 5 || "Длина значения должна быть больше 5 символов.",
    x => x.length < 25 || "Длина значения должна быть меньше 25."
]
</script>
```
### Проверка зависимости двух полей

В данном примере демонстрируется как можно использовать валидацию поля, которое зависит от значения другого поля. В
приведённом примере существует два правила:

- Если переключатель установлен в true, то для Login используется правило администратора: логин администратора начинается с
$.
- Если переключатель выключен, то для Login используется правило пользователя: длинна строки должна быть больше 5.

```vue{3}
<template>
	<form-field type="switch" name="isAdmin"/>
	<form-field name="login" :validation="validation"/>
</template>
<script setup>
import {FormField, Form, ComputedValue} from "jenesius-vue-form";

const form = new Form();
const isAdmin = ComputedValue(form, "isAdmin"); // Для реактивной связи
const validation = [
	login => {
	    if (isAdmin.value && !login.startsWith('$'))
			return 'Имя администратора должно начинаться с $';
		if (!isAdmin.value && login.length < 5)
			return 'Имя пользователя должно иметь длину минимум 5 символов.'
		
        return true;
    }
]
</script>
```
