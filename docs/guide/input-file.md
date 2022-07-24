# Input File

When loading a file in the input field, it must be "frozen", otherwise the Form will simply skip it and not
will add neither to values nor changes. A detailed explanation can be found [Here](./form-in-depth.md#serialize)
```vue
<template>
    <div>
        <input type = "file" @change = "onInput($event.target.files[0])"/>
    </div>
</template>
<script setup>

import {useInputState} from "jenesius-vue-form"
const props = defineProps();
const {input} = useInputState(props.name)

function onInput(file) {
	input.change(Object.freeze(file)) // Object.freeze
}

</script>
```
This example is simplified (no checks, etc.). As you can see from the example, we use
function Object.freeze ([More](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze))
to "freeze" the file object. This action allows the form to process it as a single entity, without
simplification.
