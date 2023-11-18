# Сторонние UI библиотеки

Данная библиотека в основном предназначена для управления 
состоянием формы. При том, что данная библиотека поставляет небольшой набор
полей для ввода, этого может быть недостаточно для крупных проектов. 
Именно по этому для нас очень важна совместимость с другими UI 
библиотеками. Поскольку механизм `form-field` прозрачен, подключить
сторонние компоненты не составит труда.

:::warning Нет примера вашей библиотеки
Если вы используете популярную UI библиотеку, которой нет в списке -
напишите мне на [GitHub](https://github.com/Jenesius/vue-modal) и я
постараюсь добавить её на эту страницу.
:::

Также нужно помнить, что библиотеку для `Vue 2` на данный момент не
получится использовать. Для самостоятельного добавления своих полей
необходимо прочитать эту [стать](./../fields/new-fields.md).

## [Vuetify 3](https://github.com/vuetifyjs/vuetify) <!-- 38.3 -->

Мастодонт среди библиотек - `vuetify`. Библиотека с огромным количество
компонент, в том числе для работы с формами. Данная библиотека
использует механизм `v-model` для взаимодействия со значениями. Из-за этого
нам не нужно использовать обёртку, просто добавляем их в
[`config`](./../fields/new-fields):

```ts
import {VColorPicker} from 'vuetify/components'
import {config} from "jenesius-vue-form"

config({
    inputTypes: {
        'color-picker': VColorPicker,
    }
})
```

Готово! Теперь подключаем `<form-field/>` с нужными `type` и `name`:

```vue
<!--some-component.vue-->
<template>
    <div>
        <form-field type = "color-picker" name = "testColor"/>
    </div>
</template>

<script setup>
import {FormField, Form} from "jenesius-vue-form";
</script>
```

## [Quasar](https://quasar.dev/) <!--24.5-->

Для подключения `quasar` нужно задекларировать компоненту и добавить
обработчик в `.use`:
```ts
import {config} from "jenesius-vue-form";

import { Quasar, QRange } from "quasar";
import "quasar/dist/quasar.css";

const app = createApp(App)

config({
    inputTypes: {
        range: QRange
    }
})
app.use(Quasar, { config: {} }) // Don't forgot
app.mount("#app");
```

## [Vant 4](https://vant-ui.github.io/) <!--22.2-->

Отличная библиотека с отличной поддержкой от разработчиков. Нет никаких
отличий от предыдущих библиотек. Предоставляет набор полей, которые
можно легко подключить:

```ts
import { Switch } from 'vant';
import {config} from "jenesius-vue-form";
import 'vant/lib/index.css'; // Don't forgot about CSS

const app = createApp(App)

config({
    inputTypes: {
        'switch': Switch
    }
})

app.mount("#app");

```

## [Element Plus](https://element-plus.org) <!--21.8-->

Подключение `Element+` выглядит следующим образов. Здесь мы переопределим
поле `numeric`:

```ts
import {config} from "jenesius-vue-form";
import { ElInputNumber } from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

config({
    inputTypes: {
        'numeric': ElInputNumber
    }
})

app.mount("#app");
```

## [Ant Deign](https://antdv.com/) <!--18.9-->

Аналогично с `vant` подключаем `css` и декларируем нужные компоненты:

```ts
import {config} from "jenesius-vue-form";
import { Radio } from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

const app = createApp(App)

config({
    inputTypes: {
        'radio': Radio
    }
})

app.mount("#app");
```

## [PrimeVue](https://primevue.org/) <!--5.2-->

Ещё одна библиотека компонент, которая поставляет крутой набор
полей для ввода. Их также легко подключить, поскольку нет никаких
подводных камней, которые нужно было бы учитывать. Следуем инструкции:

- Подключаем сам плагин:

```ts
import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
const app = createApp(App);

app.use(PrimeVue); 
```

- Регистрируем нужные поля. Для примера было взято поле `dropdown`:
```ts
import dropdown from 'primevue/dropdown';
config({
    inputTypes: {
        dropdown
    }
})
```

- Используем его через `form-field`:
```vue
<template>
    <form-field
        type = "dropdown"
        name = "location"
        :options="cities"
    />
</template>
<script setup>
const cities = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
]);
</script>
```

## [Vuestic](https://ui.vuestic.dev/) <!--3.1-->

Тоже не вызывает никаких проблем при установке. Устанавливаем
в своё приложение. Информацию про установку можно найти в их
[документации](https://ui.vuestic.dev/getting-started/tree-shaking).
В нашем примере это выглядит следующим образом:
```ts
import {config} from "jenesius-vue-form";
import { VaColorInput } from "vuestic-ui";

config({
	inputTypes: {
		'color': VaColorInput
	}
})

createApp(App).mount('#app')
```
Как видно больше никаких преобразований не надо. Вы импортируете компоненту
и добавляете её в `jenesius-vue-form`.


<!--

## [bootstrap-vue](https://bootstrap-vue.org/) 14.4 ХУЕТА

Странная совместимость с Vue 3. В разработке.
## [Naiveui UI](https://www.naiveui.com/) 14.1 ХУЕТА

Безумностранная хуета. Просто обосрались ребята.
## [Buefy](https://buefy.org/) 9.5

Vue 3 is not supported.
## [Vue Material](https://www.creative-tim.com/) 9.8

Vue 3 is not supported
## [Vanilla Components](https://vanilla-components.com/guide/components/phone-input.html) 210
Клёвая библиотека, но не подключается по средствам `form-field`


-->