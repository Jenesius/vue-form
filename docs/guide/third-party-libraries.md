# Third party UI libraries

This library is mainly intended for managing
state of the form. Despite the fact that this library provides a small set
input fields, this may not be enough for large projects.
This is why compatibility with other UIs is very important to us.
libraries. Since the `form-field` mechanism is transparent, connect
third-party components are a no-brainer.

:::warning There is no example of your library
If you are using a popular UI library that is not listed -
write to me on [GitHub](https://github.com/Jenesius/vue-modal) and I will
I'll try to add it to this page.
:::

You also need to remember that there is currently no library for `Vue 2`
can be used. To add your own fields yourself
you need to read this [article](./../fields/new-fields.md).


## [Vuetify 3](https://github.com/vuetifyjs/vuetify) <!-- 38.3 -->

The mastodon among libraries is `vuetify`. Library with a huge number
component, including for working with forms. This library
uses the `v-model` mechanism to interact with values. Because of this
we don't need to use a wrapper, just add them to
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

Ready! Now we connect `<form-field/>` with the required `type` and `name`:

```vue
<!--some-component.vue-->
<template>
     <div>
         <form-field type = "color-picker" name = "testColor" />
     </div>
</template>

<script setup>
import {FormField, Form} from "jenesius-vue-form";
</script>
```

## [Quasar](https://quasar.dev/) <!--24.5-->

To connect `quasar` you need to declare the component and add
handler in `.use`:
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

An excellent library with excellent support from the developers. There are no
differences from previous libraries. Provides a set of fields that
can be easily connected:

```ts
import { Switch } from 'vant';
import {config} from "jenesius-vue-form";
import 'vant/lib/index.css'; // Don't forget about CSS

const app = createApp(App)

config({
     inputTypes: {
         'switch': Switch
     }
})

app.mount("#app");

```

## [Element Plus](https://element-plus.org) <!--21.8-->

The `Element+` connection looks like this: Here we will override
field `numeric`:

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

Similarly with `vant` we connect `css` and declare the necessary components:

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

Another component library that delivers a cool set
input fields. They are also easy to connect since there are no
pitfalls that would need to be taken into account. We follow the instructions:

- Connect the plugin itself:

```ts
import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
const app = createApp(App);

app.use(PrimeVue);
```

- Register the required fields. The `dropdown` field was taken as an example:
```ts
import dropdown from 'primevue/dropdown';
config({
     inputTypes: {
         dropdown
     }
})
```

- We use it via `form-field`:
```vue
<template>
     <form-field
         type="dropdown"
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

It also does not cause any problems during installation. Install
to your application. Installation information can be found in their
[documentation](https://ui.vuestic.dev/getting-started/tree-shaking).
In our example it looks like this:
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
As you can see, no more transformations are needed. You are importing the component
and add it to `jenesius-vue-form`.
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