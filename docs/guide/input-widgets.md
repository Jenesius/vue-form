<script setup>
import WidgetExampleInputText from '../components/inputs/widget-example-input-text.vue'
import WidgetExampleInputSelect from '../components/inputs/widget-example-input-select.vue'
</script>

# Widgets
Для быстрой разработки форм, данная библиотека предоставляет набор компонент
(полей для ввода), которые автоматически подключаются к форме.
```html
// import {InputField} from "jenesius-vue-modal"
<input-field :type = "type" />
```
Для работы были разработаны поля для ввода следующего типа:
- [Text](#text)
- [Select](#select)
- Radio (in developing)
- Color (in developing)
- Password (in developing)
- Date (in developing)

## Text
Обычное поле для ввода текстовой информации. 
```html
<input-field :type = "text" />
```

<WidgetExampleInputText/>

Кстати параметр *:type* в случае Text поля можно не указывать.

## Select
Представляет собой элемент, позволяющий выбрать значение из предоставленных.

<WidgetExampleInputSelect/>

Передаваемые параметры:
- **options** Набор значений для выборки. Имеет следующий вид:
```ts
[
	{ title: 'Green color', value: 'green' },
	{ title: 'Red color', value: 'red' }
]
```
