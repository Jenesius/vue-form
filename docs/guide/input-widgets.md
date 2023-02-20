<script setup>
import WidgetExampleInputText from '../components/inputs/widget-example-input-text.vue';
import WidgetExampleInputPassword from '../components/inputs/widget-example-input-password.vue';
import WidgetExampleInputSelect from '../components/inputs/widget-example-input-select.vue';
import WidgetExampleInputCheckbox from '../components/inputs/widget-example-input-checkbox.vue';
import WidgetExampleInputSwitch from '../components/inputs/widget-example-input-switch.vue';
import WidgetExampleInputRadio from '../components/inputs/widget-example-input-radio.vue';
import WidgetExampleInputTel from '../components/inputs/widget-example-input-tel.vue';
import WidgetExampleInputRange from '../components/inputs/widget-example-input-range.vue';
import WidgetExampleInputNumber from '../components/inputs/widget-example-input-number.vue';

</script>

# Widgets
For rapid form development, access to a set of components
(input fields) that are automatically connected to the form.
```html
// import {InputField} from "jenesius-vue-form"
<input-field :type = "type" />
```
For work, fields for entering the following type were developed:
- [Text](#text)
- [Select](#select)
- [Password](#password)
- [Checkbox](#checkbox)
- [Switch](#switch)
- [Radio](#radio)
- [Tel](#tel)
- [Range](#range)
- [Number](#number)
- Date (in developing)
- Color (in developing, low-priority)
- File (in developing, low-priority)
- Email (in developing, low-priority)

## Text
The usual field for entering textual information.
```html
<input-field :type = "text" />
```

<WidgetExampleInputText/>

By the way, the *:type* parameter in the case of the Text field can be omitted.

#### Params:

- `max-length`: Limits the content length.
- `pretty`: Function used for prettify input. It can be simple used for modify view of modalValue, not itself.

```vue

<template>
  <input-field :pretty = "justNumeric" />
</template>
<script setup>
import InputField from "jenesius-vue-form";

function justNumeric(value) {
  return value.replace(/\D/g, "");
}

</script>
```

## Select

Represents an element that allows you to select a value from the provided ones.

<WidgetExampleInputSelect/>

Passed parameters:
- **options** A set of enumerated dimensions. There are two types of transfer: Array and Object.
We will analyze each in more detail, but we recommend using Array to avoid mistakes and incomprehensible
moments in your code.

In the case of Option(Array) the structure looks like this:
```ts
[
    { label: 'Green color', value: 'green' },
    { label: 'Red color', value: 'red' }
]
```
Field **label** text label to be displayed as a title.

The **value** field accepts any value.
:::tip Why Array is useful
You won't get confused where the label is and where the value is. In the case of an object, there is a possibility that you will have to
constantly go to the documentation to clarify the location of the label: on the right or on the left.
:::

Let's pass to options as an object. Remember: on the left is the value, on the right is the label (title).
```json
{
    "green": "Green color",
    "red"  : "Red color"
}
```
However, in this case, we run into the following problem: The value can be **only** a string. Even the number given
as a value - will be automatically converted by JavaScript to a string. There is one situation where it is convenient to use
or store the value in an object. To do this, we have provided a [function](utils/convert-options-object) for converting an object into an array.
## Password
Password entry field. It has the ability to switch the visibility mode.
```html
<input-field type = "password" />
```
<WidgetExampleInputPassword/>

## Checkbox
Elements of type checkbox are rendered by default as boxes that are checked 
(ticked) when activated, like you might see in an official government paper form.
```html
<input-field type = "checkbox" :options = "options" />
```
- **options** - similar with InputSelect

<WidgetExampleInputCheckbox />

## Switch
Switch element. Has two states turn on / turn off, which corresponds to **true** / **false**
```html
<input-field type = "switch"  />
```
<WidgetExampleInputSwitch/>

## Radio
Elements of type radio are generally used in radio groups—collections of radio 
buttons describing a set of related options.

Only one radio button in a given group can be selected at the same time.
```html
<input-field type = "radio" :options = "options" />
```
- **options** - similar with InputSelect
<WidgetExampleInputRadio/>

## Tel
Input elements of type tel are used to let the user enter and edit a telephone number.

```html
<input-field type = "tel"/>
```

<WidgetExampleInputTel/>

## Range
Input elements of type range let the user specify a numeric value which must be no less than a given value, and no 
more than another given value.

```html
<input-field type = "range" label = "Volume"/>
```
**Options**:
- min (Number) - Value won't be less than min. The default is 0.
- max (Number) - Value won't be greater than max The default is 100.
- step (Number) - Step value. The default is 1.

<WidgetExampleInputRange/>

## Number

Input elements of type number are used to let the user enter a number. They include built-in validation to reject non-numerical entries.

```html
<input-field type = "number" label = "Age"/>
```
**Options**:
- step (Number) - Step value. The default is 1.

<WidgetExampleInputNumber/>