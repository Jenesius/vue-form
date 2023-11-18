# Form Validation

For form validation, the **validate** method is used, which returns a boolean value - is
whether the form is valid. In the process of executing this method, all child elements are checked for
validity. They also call **validate** methods, if present. This is also the case for the following
child elements, and so on deeper.

```vue{7-9}
<template>
    <form-field name="age" :validation="ageValidation"/>
</template>
<script setup>
import {Form, FormField} from "jenesius-vue-form";

function ageValidation(x) {
    return x > 17 || 'So small'
}

form.setValues({ age: 17 });
form.validate() // false

form.setValues({ age: 24 });
form.validate() // true
</script>
```

For field validation, FormField takes one required parameter:

#### validation <Badge type = "tip">Required</Badge>
It has the following type:
```ts
interface FormFieldProps {
    validation: FormFieldValidationCallback[] | FormFieldValidationCallback // [!code focus]
}
```
As you can see from the specification, the field can accept both a single function and an array of functions. The function type is described below:
```ts
type FormFieldValidationCallback = (value: any) => true | string | boolean
```

- If the function returned *true* - the input field is valid, otherwise it is not.
- If an array of functions is passed, then they will be run one after another and the field will be valid if all
  functions will return true.

## Validation Examples

### Size limit
```vue
<template>
    <form-field name="token" :validation="validation"/>
</template>
<script setup>
import {FormField, Form} from "jenesius-vue-form";

const validation = [
    x => x.length > 5 || "That's too short. The minimum length is 5.",
    x => x.length < 25 || "Value length must be less than 25."
]
</script>
```
### Checking the dependency of two fields

This example demonstrates how you can use field validation that depends on the value of another field. IN
In this example, there are two rules:

- If the switch is set to true, then the admin rule is used for Login: admin login starts with
  $.
- If the switch is off, then the user rule is used for Login: string length must be greater than 5.

```vue{3}
<template>
    <form-field type="switch" name="isAdmin"/>
    <form-field name="login" :validation="validation"/>
</template>
<script setup>
import {FormField, Form, ComputedValue} from "jenesius-vue-form";

const form = new Form();
const isAdmin = ComputedValue(form, "isAdmin"); // For reactive communication
const validation = [
    login => {
        if (isAdmin.value && !login.startsWith('$'))
            return 'Administrator name must start with $';
        if (!isAdmin.value && login.length < 5)
            return 'Username must be at least 5 characters long.'
        return true;
     }
]
</script>
```