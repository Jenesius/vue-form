# Blocking fields

Blocking fields simplifies the work with forms, making the development process as dynamic as possible. To block fields
a simple *accessibility* mechanism was created that allows you to lock and unlock child elements. We
we recommend using it instead of passing the **disabled** parameter to the FormField.

## Methods

There are two methods **disable** and **enable** to disable and enable fields, respectively. Given methods
are called on the **Form** instance:

```ts
const form = new Form();
form.disable(); // Blocking the entire form
form.enable('name'); // Unlock only the name field
```

### Options
If no parameters are passed - the form, as well as all child elements, will be locked / unlocked
entirely.

#### name <Badge type = "info">Optional</Badge>

A string or an array of strings are the fields for which the accessibility mechanism needs to be generated.

```ts
form.enable(); // [1]
form.disable('address'); // [2]
form.enable(['address.city', 'address.country']); // [3]
```
- **[1]** - full form unlock. By default, the form is in the `disabled: false` state.
- **[2]** - blocking the `address` field. All child elements (`address.city`, `address.details.code`) will also
  locked down.
- **[3]** - Unblocking passed fields. Note that the `address` field will continue to be in the blocked state.

## State
To understand that the form is locked or unlocked, you can use one of the properties:
- disabled - true if the form is **disabled**
- enabled - true if the form is **unlocked**

```ts
form.enable()
form.enabled // true
form.disabled // false

form.disable();
form.enabled // false
form.disabled // true
```

::: warning
The form is disabled (disabled: false) only when the **disable** method has been called.
:::

## Check child elements

To check the state of a child element, use the **checkFieldDisable** method returned by
**boolean** value - whether the field is disabled.

### Options

#### name <Badge type = "tip">Required</Badge>
The string name of the field to validate.

```ts
const form = new Form();

forn.disable();
form.checkFieldDisable('address') ; // true

form.enable('user');
form.checkFieldDisable('user.login'); // false
```

## Events

To subscribe to a field state change, you need to use the **onavailable** method, which has two
overload:

To catch the change in the state of the form as a whole.
```ts
onavailable(callback: (disabled: boolean) => any): FunctionRemoveOnCallback
```

To catch changes to a specific field.
```ts
onavailable(fieldName: string, callback: (disabled: boolean) => any): FunctionRemoveOnCallback
```

*onavailable* returns the function to be called to unsubscribe from the requested event.