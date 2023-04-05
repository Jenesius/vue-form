# Convert options object

For better compatibility with previous solutions, as well as ease of development, the options property can be
two kinds:

## Object
This view is an object with **value** on the left and **label** on the right. For example
country enumeration has been selected:
```ts
const options = {
	'en': 'Great Britain',
    'us': 'United States',
    'jp': 'Japan',
    'ru': 'Russia'
}
```

:::tip Why Value on left side?
Primarily because the value must be unique. Because object is used for
simple variants of this property was the most significant.
:::

The disadvantage of this approach is that the value can only be a string. **Important** to remember that
even a numeric property will be converted to a string.

## Array based
This method is more flexible, because allows you to set any data to the value. In this case, *options*
takes the following form:
```ts
const options = [
    { value: 'en', label: 'Great Britain' },
    { value: 'us', label: 'United States' },
    { value: 'jp', label: 'Japan' },
    { value: 'ru', label: 'Russia' },
]
```
This method is more cumbersome than the first, but more flexible, because now we can use the following:
```ts
const options = [
    {
        value: { code: 1, mark: 'en' }, label: 'Great Britain' 
    }
]
```

## Converting

When using **input-field** remember that you will always get options as an output as an array!
This is easier to show with an example:

```vue

<template>
	<input-field :options = "data" type = "custom-input"/>
</template>
<script setup>
import {InputField} from "./index";
const data = {
	'1': 'M',
    '2': 'W'
}
</script>
```
```vue
<!--custom-input-->
<div>
    {{options}} 
</div>
<script setup>
const props = defineProps({
    options: Array
})

props.options; // [ { value: '1', label: 'M' }, { value: '2', label: 'W' } ]
</script>
```