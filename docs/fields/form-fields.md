<script setup>
import {FormField, Form} from './../src';
const form = new Form();

const arrayColor = [
         {
             label: 'Red',
             value: 'red'
         },
         {
             label: 'Green',
             value: 'green'
         },
         {
             label: 'Blue',
             value: 'blue'
         },
         {
             label: 'Transparent',
             value: null
         },
{
label: 'Black color',
value: 'black'
},
{
label: 'White color',
value: 'white'
},
{
label: "yellow",
value: 'yellow'
}
     ];
const coolOptions = [
         {
             label: 'Buy a car',
             value: 'car'
         },
         {
             label: 'Donate',
             value: 'donate'
         },
     ]

</script>

# Widgets

For fast and clean form development, the `FormField` component was created:

```html
// import {FormField} from "jenesius-vue-form"
<form-field :type="type"/>
```

All developed types can be found below:

- [Text](#text)
- [Select](#select)
- [Password](#password)
- [Checkbox](#checkbox)
- [Single Checkbox](#single-checkbox)
- [Switch](#switch)
- [Radio](#radio)
- [Single Radio](#single-radio)
- [Tel](#tel)
- [Range](#range)
- [number](#number)
- [Date](#date)
- File (in development)
- Email (in development)

## text

Default field. Plain text field.
```html
<form-field type="text"/>
```
<FormField type="text" label="Text" name="login" />

By the way, the *type* parameter in the case of the "Text" field can be omitted.

## Select

Represents an element that allows you to select a value from those provided.

<FormField type = "select" label = "Colors" name = "color" :options = "arrayColor" />

Passed parameters:

- **options** A set of enumerated dimensions. There are two types of transfer: array and object.
  We will analyze each in more detail, but we recommend using Array to avoid errors and incomprehensible
  moments in your code.

In the case of Option(Array) the structure looks like this:

```ts
[
{label: 'Green color', value: 'green'},
{label: 'Red color', value: 'red'}
]
```

The **label** field is a text label that will be displayed as a title.

The **value** field accepts any value.
:::tip Why an array is useful
You will not get confused, where is the label and where is the value. In the case of an object, there is a possibility that
you have to
constantly look at the documentation to clarify the location of the label: on the right or on the left.
:::

Let's move on to options as an object. Remember: on the left is the value, on the right is the label (title).

```json
{
   "green": "Green color",
   "red": "Red color"
}
```

However, in this case, we run into the following problem: the value can be **only** a string. Even the given number
as a value - will be automatically converted by JavaScript to a string. There is one situation when it is convenient
use
or store the value in an object. To do this, we have provided a [function](./../guide/utils#convertOptionsObject) for
converting an object to an array.

## Password

Password entry field. It has the ability to switch the visibility mode.
```html
<input field type="password"/>
```
<FormField type="password" label="Password" name="password" />

##Checkbox

Elements of type checkbox are displayed as checked checkboxes by default.
(marked) upon activation, as you can see on the official government paper form.

```html
<input-field type="checkbox" :options="options"/>
```
- **options** - similar to InputSelect

<FormField type = "checkbox" label = "How help?" name = "coolOptions" :options = "coolOptions" />

## Single Checkbox

If there is only one instance of the checkbox on the interface (as a switch), you can use
**one flag**. Works identically as [switch](#switch).
```html

<input-field type="single-checkbox" name="use-password"/>
```
<FormField type="single-checkbox" label="usePassword" name="usePassword" />

## Switch

Switching element. It has two states: on/off, which corresponds to **true**/**false**.

```html
<input field type="switch"/>
```
<FormField label="Dark site theme" type="switch" name="theme"/>

## Radio

Radio type elements are usually used in selecting one single option.
Only one radio button in a given group can be selected at a time.

```html
<input-field type="radio" :options="options"/>
```

- **options** - similar to InputSelect

<FormField type="radio" label="How help?" name = "coolOptions" :options = "coolOptions" />

## Single Radio

Like `single-checkbox`, but for `radio` field input.

## Tel

Body type input elements are used to allow the user to enter and edit a phone number.

```html
<input-field type="tel"/>
```

<FormField type="tel" label="How help?" name = "phone" />

## Range

Range input elements allow the user to enter a numeric value that must be greater than or equal to the given value, and not
greater than another set value.

```html
<input-field type="range" label="Volume"/>
```

**Options**:

- min (Number) - The value will not be less than min. The default value is 0.
- max (Number) - The value will not be greater than the maximum. The default value is 100.
- step (Number) - Step value. The default is 1.

<FormField label = "Volume" type = "range" name = "volume" />

## Number

Number type input elements are used to allow the user to enter a number. They include a built-in check for rejection
non-numeric entries.

```html
<input-field type="number" label="Age"/>
```

**Options**:

- step (number) - Step value. The default is 1.

  <FormField label="Age" type="number" name="age"/>

## Date {#date}

```html

<input-field type="date" label="Created"/>
```

**Options**:

- step (Number) - Step value. The default is 1.

<FormField label="Created" type="date" name="date"/>