# Configuration

Working with the library configuration is used through the **config** function:
```ts
import {config} from "jenesius-vue-form"
config(params)
```

The Params object has the following type:
```ts
interface IConfigurationParams {
    inputTypes: {
        [name: string]: any
    },
    requiredMessage:string
    typeNotCaseSensitive: boolean
    debug: boolean
    defaultType: string
}
```

### inputType <Badge type = "info">Optional</Badge>
An object to overwrite or define new fields.

To add new or override type used in `FormField`
you need to specify **type name** and Vue component:
```ts
import NewInputAddress from "./address.vue"
import NewInputText from "./text.vue"
config({
   inputTypes: {
     address: NewInputAddress, // New field
     text : NewInputText // Overridden field
   }
})
```
In this example, we specified a new address field and overridden the existing *text* type:
```html
<!--Will generate NewInputAddress-->
<input-field type="address" name="some-name-address"/>

<!--Will generate an overridden component-->
<input-field name="new-text-widget"/>
```
### requiredMessage <Badge type = "info">Optional</Badge>
When the **required** parameter is set for a field, the message displayed if the field is not filled in during validation will be
*Please fill in this field*. Set a new value for the given field to override it:
```ts
config({
   requiredMessage: "This field must be filled."
})
```

### typeNotCaseSensitive <Badge type = "info">Optional</Badge>

By default, the field type is not case sensitive. The **typeNotCaseSensitive** property is set to **true**. In this case
the following entry will display three identical input fields:
```html
<input-field name="a"type="test"/>
<input-field name="a" type="Test"/>
<input-field name="a" type="TEST"/>
```
If this behavior is not suitable for your project, you should set the above parameter to *false*:
```ts
config({
typeNotCaseSensitive: false
})
```

### debug <Badge type = "info">Optional</Badge>

To better see what's going on with the form, you can enable the **debug** option, after which additional output will be displayed in the console
information while the form is running:
```ts
config({
debug: true
})
```

### defaultType <Badge type = "info">Optional</Badge>
The default is **text**. Stores the name of the type to be used if type is not given in `FormField`.