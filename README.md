# Jenesius Vue Form
Hi, If you stay here, please leave. This package is not ready ;)
(But just now you can test it)

## Main Form
Для создавния формы, необходимо просто создать экземпляр. JenesiusVueForm сделает
большую часть работы за вас.

```js
    import {Form} from "jenesius-vue-modal"
    const form = new Form()
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
```js
    import {useInputState} from "jenesius-vue-modal"
    const {state, input} = useState(props.name);
```
- **input** - контроллер для работы с виджетом. Необходим для обработки изменения
поля ввода (Пример использования):
```vue
    <input type = "text" 
           @input = "input.change($event.target.value)" 
           :value="state.value"
           :disabled = "state.disabled"
    >
```

## Основная логика
1. Значения хранятся только в **агригатном элементе**
- **агригатный элемент** - не зависимый(или слабозависимый) экземпляр Form. Тоесть
значения полей для ввода, какие поля находятся в статусе disabled, какие поля ск
рыты и т.д. должно хранится в ближайшей *aggregate* Form.
