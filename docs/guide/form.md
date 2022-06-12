<script setup>
import WidgetExampleOnePointValue from '../components/widget-example-one-point-value.vue';
import WidgetExampleSimpleForm from '../components/widget-example-simple-form.vue';
import WidgetExampleFormDisable from '../components/widget-example-form-disable.vue'
</script>

# Form
Form is the main element developed in this library. Servant uniform for
combining input fields and the mechanism of providing for common work with them.

## Form creation
To create a form, you need to create an instance of the *Form* class:
```ts
import {Form} from "jenesius-vue-modal"
const form = new Form()
```
This is the minimum requirement to use the form. All child elements
that use the mechanisms of this library will automatically be signed
to the child form.
To do this, let's add a couple of input fields that will automatically subscribe to the form.
```vue
<template>
    <input-field type = "text" name = "note"/>
    <input-field type = "select" name = "planet" :options = "arr" />
    <button @click = "show">values</button>
</template>
<script setup>
    import {Form, InputField} from "jenesius-vue-modal"
    const form = new Form();
    const arr = [ {value: 1, title: 'Earth'} ]

    function show() {
        alert(form.values)
    }
</script>
```
<WidgetExampleSimpleForm/>

## Setting values
To set the form value, you can use one of
the following methods:
- **change**(values: Values) - method sets form values and marks them as changed.
This method affects **changed** forms.
The Values type is a value object, any nesting, has the following
interface:
```ts
interface Values {
	[name: string]: any
}
```
- **setValues**(values: Values) - the method just sets the value without flagging them
as changed.

Things to remember about [value unwrapping method](#form-values-simplified)!

## Getting values
There are two reverse ways to get values:
- **changes** - will return an object of changed values
- **values** - will return all form values

Sometimes you need to get a value by a field name. To do this, we use the method
**getValueByName**:
```ts
fomr.values // { address: { city: { code: 1, name: 'Jenesius' } } }
fotm.getValueByName('address.city') // { code: 1, name: 'Jenesius' }
```

## Lock and unlock
Quite useful in its essence functionality is the ability to block
fields via JS. This approach allows you to easily build dynamic interfaces.

The form has the following methods:
- **disable** - blocks the entire form or one field.
```ts
disable(name?: string)
```
- **enable** - unlocks the entire field or one field.
```ts
enable(name?: string)
```

For example, a form was implemented with which you can play around to see
how it works.
<WidgetExampleFormDisable/>

It must be remembered that when I block a common element, we automatically block everyone
his offspring and vice versa. Unblock a shared item, we will automatically unblock
all his descendants.
Also, when the form is unlocked: `form.enable()` - all previously elements will be
unlocked. The same applies to form blocking.


## Validation
Form validation involves checking all child signed elements.
The validation is recursive, so by calling the **validate** method on the parent
form, it will automatically be called for all child elements.
- **validate** - Returns true if the form (all of its children) are
valid, false otherwise.
```ts
form.validate() // true or false
```

## Save and Read
To save and read data in the form, getters / setters were implemented for
save and read properties:
```ts
form.save
form.read
```
You can set an async function to be called whenever
when the corresponding method is called, as well as along the chain for all dependent
elements. This is best shown with an example:
```ts
// ./ParentForm.vue
const parentForm = new Form();
parentForm.save = () => asyncSaveData(form.changes);
```
```ts
// ./ChildrenForm.vue
const childrenForm = new Form();
childrenForm.save = () => asyncSaveChildrenData()
```
In this example, `children.save()` will be automatically called after
`parentForm.save()` will be executed.

Similar behavior will be for the **form.read** property.

Using this approach, it is possible to build a single dependent interface that
it is convenient to manage through the parent form. For example, you might have the form
from the input field, as well as a widget, with its own logic (For example, a table,
which can be modified). This table can be implemented based on form
and link to the parent.

## Automatic Dependencies
When a form is created, it will automatically notify all child elements:
```ts
// provide('form-controller', form)
provideVue(Form.PROVIDE_NAME, this); 
```
Thus, child elements: Form, FormProxy, Input - can subscribe to
form and be controlled by it.

## Basic principles
To successfully work with the form, you need to remember the basic principles of the form:
### All state inside the Form
All input fields, as well as components for storing and working with data on
based form should always rely on the values inside the parent form.
### Form values simplified
This means that any form values that are passed in will be simplified and decomposed.
This is done in order to make it easier to work and rely on a single point.
Let's take an example of how this works in practice.
Example:

```ts
form.setValues({ 'address.city.name': 'Jenesius Town'})
```

At the output we will get the following:
```js
{
	address: {
		city: {
			name: 'Jenesius Town'
        }
    }
}
```

In this case, it doesn't matter at all whether you use a compound name for input or
use nesting based on FormProxy, values in all inputs will be
the same:

```html
<input-field name="address.city"/>
<input-address name="address"/>
. . .
// ./input-address.vue
<input-field name = "city"/>
```


<WidgetExampleOnePointValue/>
