# Конфигурация

Работа с конфигурацией библиотеки используется через функцию **config**:
```ts
import {config} from "jenesius-vue-form"
config(Params)
```

Объект Params имеет следующий тип:
```ts
interface IConfigurationParams {
	inputTypes: {
		[name: string]: any
	},
	requiredMessage: string,
	typeNotCaseSensitive: boolean
	debug: boolean,
	defaultType: string,
}
```

### inputType <Badge type = "info">Необязательное</Badge>
Объект для перезаписывания или определения новых полей.

Чтобы добавить новое или переопределить тип используемый в `FormField`
необходимо указать **название типа** и Vue компоненту:
```ts
import NewInputAddress from "./address.vue"
import NewInputText from "./text.vue"
config({
  inputTypes: {
    address: NewInputAddress, // Новое поле
    text   : NewInputText     // Переопределённое поле
  }
})
```
В этом примере мы указали новое поле адреса и переопределили существующий тип *text*:
```html
<!--Будет генерировать NewInputAddress-->
<input-field type = "address" name = "some-name-address"/>

<!--Будет генерировать переопределенную компоненту-->
<input-field name = "new-text-widget"/>
```
### requiredMessage <Badge type = "info">Необязательное</Badge>
Когда для поля установлен параметр **required**, то сообщение выводимое, если поле не будет заполнено при валидации будет
*Please fill in this field*. Установите новое значение для данного поля, чтобы переопределить его:
```ts
config({
  requiredMessage: "Это поле должно быть заполнено."
})
```

### typeNotCaseSensitive <Badge type = "info">Необязательное</Badge>

По умолчанию тип поля не чувствителен к регистру. Свойство **typeNotCaseSensitive** имеет значение **true**. В этом случае
следующая запись отобразит три идентичных поля ввода:
```html
<input-field name = "a" type = "test"/>
<input-field name = "a" type = "Test"/>
<input-field name = "a" type = "TEST"/>
```
Если такое поведение не подходит для вашего проекта, для вышеуказанного параметра необходимо установить значение *false*:
```ts
config({
	typeNotCaseSensitive: false
})
```

### debug <Badge type = "info">Необязательное</Badge>

Чтобы лучше видеть, что происходит с формой, вы можете включить опцию **debug**, после чего в консоли будет отображаться дополнительный вывод
информация во время работы формы:
```ts
config({
	debug: true
})
```

### defaultType <Badge type = "info">Необязательное</Badge>
По умолчанию является **text**. Хранит название типа, который будет использоваться, если type не задан в `FormField`.
