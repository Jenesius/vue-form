# Configuration
For full control over the behavior of forms and built-in input fields
you need to use **config**:
```ts
import {config} from "jenesius-vue-form"
config(Params)
```
Params can contain the following fields:

## inputTypes
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
