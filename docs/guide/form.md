# Form

При создании формы, она автоматически выполняет уведомление всех дочерних элементов:
```ts
// provide('form-controller', form)
provideVue(Form.PROVIDE_NAME, this); 
```
Таким образом дочерние элементы: Form, FormProxy, Input - могут подписаться на 
форму и контролироваться ею.

## Основные принципы
Для успешной работы с формой необходимо помнить основные принципы формы:
### Всё состояние внутри Form
Все поля для ввода, а так-же компоненты для хранения и работы с данными на 
основе form, всегда должны полагаться на значения внутри родительской формы.
### Form values simplified
Это значит, что любые переданные значения формы, будут упрощены и разложены.
Сделано это для того, чтобы было проще работать и полагаться на одну точку.
Приведём пример, как это работает на практике.
Пример:

```ts
form.setValues({ 'address.city.name': 'Jenesius Town'})
```

На выходе мы получим следующее:
```js
{
	address: {
		city: {
			name: 'Jenesius Town'
        }
    }
}
```
В таком случае абсолютно не важно используете ли вы составное имя для input или
используете вложенность основываясь на FormProxy, значения во всех inputs будет
одинаковым:

```html
<input-field name="address.city"/>
<input-address name="address"/>
. . .
// input-address.vue
<input-field name = "city"/>
```

<script setup>
import WidgetExampleOnePointValue from '../components/widget-example-one-point-value.vue'
</script>
<WidgetExampleOnePointValue/>
