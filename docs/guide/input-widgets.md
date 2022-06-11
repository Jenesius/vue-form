<script setup>
import WidgetExampleInputText from '../components/inputs/widget-example-input-text.vue';
import WidgetExampleInputPassword from '../components/inputs/widget-example-input-password.vue';
import WidgetExampleInputSelect from '../components/inputs/widget-example-input-select.vue';
import WidgetExampleInputCheckbox from '../components/inputs/widget-example-input-checkbox.vue';
import WidgetExampleInputSwitch from '../components/inputs/widget-example-input-switch.vue';
import WidgetExampleInputRadio from '../components/inputs/widget-example-input-radio.vue';

</script>

# Widgets
For rapid form development, access to a set of components
(input fields) that are automatically connected to the form.
```html
// import {InputField} from "jenesius-vue-modal"
<input-field :type = "type" />
```
For work, fields for entering the following type were developed:
- [Text](#text)
- [Select](#select)
- [Password](#password)
- [Checkbox](#checkbox)
- [Switch](#switch)
- [Radio](#radio)
- Date (in developing)
- Color (in developing, low-priority)
- File (in developing)
- Email (in developing, low-priority)
- Range (in developing)

## Text
The usual field for entering textual information.
```html
<input-field :type = "text" />
```

<WidgetExampleInputText/>

By the way, the *:type* parameter in the case of the Text field can be omitted.

## Select

Represents an element that allows you to select a value from the provided ones.

<WidgetExampleInputSelect/>

Passed parameters:
- **options** A set of enumerated dimensions. There are two types of transfer
possible:
As Object:
```json
{
	"green": "Green color",
    "red"  : "Red color"
}
```
Like Array:
```ts
[
	{ title: 'Green color', value: 'green' },
	{ title: 'Red color', value: 'red' }
]
```
When passed as an object, the value will always be of type *string*. When
*Array* value type can be any.

## Password
Password entry field. It has the ability to switch the visibility mode.
```html
<input-field :type = "password" />
```
<WidgetExampleInputPassword/>

## Checkbox
Elements of type checkbox are rendered by default as boxes that are checked 
(ticked) when activated, like you might see in an official government paper form.
```html
<input-field :type = "checkbox" :options = "options" />
```
- **options** - similar with InputSelect

<WidgetExampleInputCheckbox />

## Switch
Switch element. Has two states turn on / turn off, which corresponds to **true** / **false**
```html
<input-field :type = "switch"  />
```
<WidgetExampleInputSwitch/>

## Radio
Elements of type radio are generally used in radio groups—collections of radio 
buttons describing a set of related options.

Only one radio button in a given group can be selected at the same time.
```html
<input-field :type = "radio" :options = "options" />
```
- **options** - similar with InputSelect

<WidgetExampleInputRadio/>
