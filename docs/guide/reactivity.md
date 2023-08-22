# Reactivity

The previous pages describe working with forms, getting and setting values, and working with accessibility. With regards to
reactivity and interaction with Vue is described in this article.

## Reactive values

Use the **useFormValues()** hook to get a reactive form object. The hook takes a single parameter
an instance of the `Form` class:

```ts
import {Form, useFormValues} from "jenesius-vue-form";

const form = new Form();
const values = useFormValues(form); // Reactive value object
```

## Reactive fields {computedValue}

If you need to keep track of a named form field, use **ComputedValue**. By default, this
the function takes two objects: an instance of the `Form` class and a field name. However, the `Form` class can be omitted if
you need to get the value from the parent form.

### Options

#### form <Badge type = "info">Optional</Badge>
An instance of the `Form` class that keeps track of the form value.

#### name <Badge type = "tip">Required</Badge>
The string name of the field.

### Return value
The function will return `Ref<any>`.

### Examples

#### Reactive form value

In this example, we directly pass the form from which we will receive the value.
```ts
import {Form, ComputedValue} from "jenesius-vue-form";

const form = new Form();
const nameValue = ComputedValue(form, 'name');
```

::: danger How not to work!
The following example shows how a calculated value will not work.

```ts
const form = new Form()
const nameValue = ComputedValue('name'); // Error
```
:::

#### In a child element

If we have a Form instance defined in the parent element, then we can omit it in the child element:
```ts
// parent.vue
const form = new Form()

// child.vue
const ageValue = ComputedValue('age'); // Will work!
```

## Reactive state
To get the reactive form state (availability, change) you need to use **useFormState** and
pass an instance of the form there.
```ts
const form = new Form();
const state = useFormState(form); // { changed, disabled }
```
The reactive state has the following interface:
```ts
interface FormReactiveState {
changed: boolean,
disabled: boolean
wait: boolean
}
```