# Jenesius Vue Form
Heavy form system for Vue.js v3. Library provides a wide range of functionality and interaction with form elements.

## Links
- Documentation
- Examples
- GitHub
## Reason

- 🦵 multifunctional form logic. Херово звучит. Многофункциональная система для 
работы с формой. Или Большой выбор функцонала для работы и управления формой.
- 🖕 you can use this library with your own input components.
- 🤝 create interface using composite and aggregate logical. Read more <- ссылку

## Main Form
Для создавния формы, необходимо просто создать экземпляр. JenesiusVueForm сделает
большую часть работы за вас.

```js
import {Form} from "jenesius-vue-modal"
const form = new Form()
```

### Main Form state
Реактивное состояния формы можно получить из *useFormState* хука:
```js
import {useFormState} from "jenesius-vue-modal"
const {state} = useFormState(form) // disabled changed
```

## Proxy Form
Для работы удобно использовать композитный элемент, который хранит в себе другие
инпуты, но не добавляет никакой логики для работы с формой. Отличный пример тому
инпут address, который в себе может хранить такие поля, как: city, country, street.

```ts
import {useProxyState} from "jenesius-vue-modal"
const {state} = useProxyState(name);
```

## Input
Для того, чтобы связать поле input с формой нужно просто выполнить следующий хук:
```vue
<input type = "text" 
    @input = "input.change($event.target.value)" 
    :value="state.value"
    :disabled = "state.disabled"
>
```
```js
import {useInputState} from "jenesius-vue-modal"
const {state, input} = useInputState(props.name)
// state - {value, disabled}
```
- **input** - контроллер для работы с виджетом. Необходим для обработки изменения
поля ввода.


## Основная логика
1. Значения хранятся только в **агригатном элементе**
- **агригатный элемент** - не зависимый(или слабозависимый) экземпляр Form. Знач
ения инпутов, disabled поля, hidden поля и т.д. должны храниться в ближайшей 
*aggregate* Form.

## InputField widgets
Данная библиотека также предоставляет набор компонент, которые можно легко испол
ьзовать для построения форм:

```vue
<input-field type = "text" name = "username"/>

<script>
    import {InputField} from "jenesius-vue-form"
</script>
```
- **type** - тип инпута. Принимает одно из следующих значения: text. По умолчанию:
text
- **name** - имя контролла, по которому он будет привязан к форме.
- **label** метка элемента. Используется как заголовок.
