# FormProxy

One of the allowed concepts for using a form is the use of form proxies that abstract the input pool,
and you do work with them in a separate process. One benefit is reusability when building the form. Sounds like
difficult, let's understand.

Imagine that we have an address field that consists of the following fields:
1. Country
2. City
3. ZipCode


Three fields that generally carry information about one address.
The address can be with the user (address of residence), with the company (registration address), with the parcel
(direction address), etc.
It would be good practice to put the address in a separate input, and reuse it for the user, organization, package, etc..

With **jenesius-vue-form** this is quite easy:
1. Create a new input: input-address:

```vue
<template>
  <p>Address</p>
  <input-field name = "Country" type = "select" :options = "arrayCountry" />
  <input-field name = "City" :options = "arrayCity"/>
  <input-field name = "ZipCode"/>
</template>
```
This is a simplified example for general understanding.

2. Now you need to connect it to the parent form:
```ts
import {useProxyState, InputField} from "../../plugin";

const props = defineProps<{
    name: string
}>()
useProxyState(props.name)
```
The main element here is **useProxyState**, whose role is to subscribe to the parent form and unsubscribe when destroyed
input.

3. Registering the given input in the storage:
```ts
import {config} from "jenesius-vue-form";
config({
    inputTypes: {
        address: InputAddress,
    }
})
```

4. Now it can be connected to any form:
```vue
<template>
  <input-field name = "PersonAddress" type = "address"/>
</template>
```
**!** Don't forget to pass the name field.

----

If you look deeper, then in the form it will look like this:

 - Form
    - PersonAddress
        - Country
        - City
        - ZipCode


This example uses the following functions:

- [Form Proxy](https://form.jenesius.com/guide/form-proxy.html#initialization)
- [Config](https://form.jenesius.com/guide/configuration.html#inputtypes)