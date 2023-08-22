# Configuration
For full control over the behavior of forms and built-in input fields
you need to use **config**:
```ts
import {config} from "jenesius-vue-form"
config(Params)
```
Params can contain the following fields:

## Input Types
To add new or redefine field types to `InputField` you need
specify *type* input and vue to the component that will be rendered for the specified
type:
```ts
import NewInputAddress from "./address.vue"
import NewInputText from "./text.vue"
config({
  inputTypes: {
    address: NewInputAddress, // New Input
    text   : NewInputText     // Override Text
  }
})
```
In this example, we specified a new type *address* and redefined the type
*text*.

```html
<!--Will render NewInputAddress-->
<input-field type = "address" name = "some-name-address"/>

<!--Will render new Text input that provided in config-->
<input-field name = "new-text-widget"/>
```

## Required Message
When a field is set to required the following message will be shown by default: *Please fill in this field* to
to change it, you need to set the **requiredMessage** parameter:
```ts
config({
  requiredMessage: "Write here something."
})
```

## Type Not Case Sensitive

By default, the field type is case-insensitive. The **typeNotCaseSensitive** property is equal to **true**. In this case
the following entry will render three identical input fields:
```html
<input-field name = "a" type = "test"/>
<input-field name = "a" type = "Test"/>
<input-field name = "a" type = "TEST"/>
```
If this behavior is not suitable for your project, the above parameter must be set to *false*:
```ts
config({
	typeNotCaseSensitive: false
})
```

## Debug

To better see what is happening with the form, you can enable the **debug** option, after which an additional output will be displayed in the console
information while the form is running:
```ts
config({
	debug: true
})
```
After that, you can see additional information in the console:
![img.png](../_old-docs/images/debug.png)
