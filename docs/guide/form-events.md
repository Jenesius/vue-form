# Events
The event system allows you to flexibly respond to any form change. For work
with events, two commonly accepted methods are used:
- `form.on(event, callback)`
- `form.emit(event, someData)`

The `form.on` method returns a callback function that can be used to
unsubscribe from event listener:
```ts
const off = form.on('disable', checkFields());
setTimeout(off, 1000);
```
After one second, the form will not respond to the **disable** event.

To work with the form, you can use internal events that are stored
in *Form* static fields:

## EVENT_DISABLE
Called whenever the `form.disable` method is called, on the received values
will either be an array of fields to block, or undefined.
```ts
form.on(FORM.EVENT_DISABLE, () => {}); // ['address', 'username']
form.disable(['address', 'username'])
```

## EVENT_ENABLE
Called whenever the `form.enable` method is called. Obtained values
similar to *EVENT_DISABLE* events

## EVENT_SUBSCRIBE
Called whenever an element subscribes to the form.

The resulting element will be the signed object itself.

## EVENT_UNSUBSCRIBE
Called whenever an element is unsubscribed from the form. For example, when hiding
(using v-if) InputField, this event will be fired.
