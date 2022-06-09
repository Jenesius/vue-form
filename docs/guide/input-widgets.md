# Widgets
Для быстрой разработки форм, данная библиотека предоставляет набор компонент
(полей для ввода), которые автоматически подключаются к форме.
```vue
// import {InputField} from "jenesius-vue-modal"

<input-field :type = "type" />

```

Для работы
были разработаны поля для ввода следующего типа:
- [Text](#Text)

## Text
Обычное поле для ввода текстовой информации. 
```html
<input-field :type = "text" />
```

<script setup>
import WidgetExampleInputText from '../components/inputs/widget-example-input-text.vue'
</script>
<WidgetExampleInputText/>

