<script setup>
import WidgetExampleFormProxy from '../components/widget-example-form-proxy.vue';
</script>
# FormProxy

Often there is a need to use composite fields. An excellent example of this
*address* field. Consider the following case:

```json
{
  "address": {
    "city": "Mogilev",
    "street": "Some Street",
    "country": "Some Country"
  }
}
```
In this example, the address field is represented by three values. Every time when
we will meet *address*, we need to list them. It does
the code is less readable and the form design process is boring.
To solve this problem, **FormProxy** was introduced.

## Initialization
Let's create a new file *address.vue* and write the following there:

```vue
<template>
    <div>
        <p>Address</p>
        <input-field name="city" label="City"/>
        <input-field name="street" label="Street"/>
        <input-field name="country" label="Country"/>
    </div>
</template>
<script setup>
    import {InputField, useProxyState} from "jenesius-vue-form";

    const props = defineProps();
    useProxyState(props.name);
</script>
```
The *useProxyState* method will do everything for you: bind child input elements,
and will proxy changing and getting values, hiding, validating fields.

Now we can use it in our code:
```vue
<template>
    <input-address name="address"/>
    <input-field name = "address.city"/>
</template>
<script setup>
    import { InputField, Form } from "jenesius-vue-form";
    import InputAddress from "./input-address.vue";
    
    const form = new Form();
</script>
```
<WidgetExampleFormProxy/>

As you can see from the example, the fields are perfectly connected to each other: the *city* field in
The composite *address* field is linked to the *address.city* field.
