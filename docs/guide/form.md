# Form

As previously stated, **Form** is the main mechanism you will be using. Forms work built
on the event system, which allows you to catch changes in any child element. Mechanism **subscribe /
unsubscribe** allow you to create a tree-like form system of any nesting.

## Initialization

For the initial installation, you need to create an instance of **Form**:
```ts
import Form from "./Form";

const form = new Form()
```
Now you can add **FormField** to the page, and they will automatically interact with **form**. Familiarize yourself
with them you can [here](./../fields/form-fields.md).

### Options

For flexible work with the form, you can pass the settings:

```ts
const form = new Form(params)
```

#### params <Badge type = "tip">Optional</Badge>
An object with the following properties:

::: info _

#### name <Badge type = "warning">Variable</Badge>
The name of the entity (field) that will be used if this form will act as a child and will be signed
to another form.

It is optional if the given form does not have a parent form or the **parent** flag is set in
null.

#### parent <Badge type = "info">Optional</Badge>
It takes the following values: `Form` or `null`, `false`. If another Form was passed, then signing will occur
on it, and not the automatic search for the parent form. Otherwise, (null, false) this form will not produce
search for an ancestor.

#### provide <Badge type = "info">Optional</Badge>
Forms use the **provide/inject** mechanism added to Vue 3 to automatically subscribe to each other. If
this parameter is set to false, then the form will not notify descendants about itself. In other words, this form will become
invisible to child elements.
:::



## Subscribing to a form

Subscription to the form occurs automatically. However, there are situations when this mechanism is not available. For example, when
we create two different forms in one place. What form will be the main one in this case?

The following methods are used for this:
- **subscribe** - accepts a child to be subscribed to the form. Returns a function to unsubscribe from:
```ts{6}
import Form from "./Form";

const form = new Form();
const child = new Form({ name: "address" });

form.subscribe(child);
```
- **unsubscribe** - unsubscribes the element from the form.
```ts
form.unsubscribe(child);
```
Or you can use the function returned by **subscribe**:
```ts
const offChild = form.subscribe(child);
offChild(); // form.unsubscribe(child);
```

## Internal form properties

For convenient work, properties have been added that you can use in your work to read and change.

### name <Badge type = "tip">Read-only</Badge>
The name of the entity to which the form belongs. Automatically set on creation if the **name** parameter was passed.
Relying on this parameter, child forms interact with the parent form.

### parent <Badge type = "tip">Read-only</Badge>
Link to the parent form.

### id
Form identifier. This property is freely editable.
To subscribe to an id change, use the `onid` method:
```ts
form.onid(newId => console.log('New id: ' + newId))

form.id = 1 // New id: 1
form.id = 2 // New id: 2
```

Also, changing this field creates a `Form.EVENT_ID` event, which you can also subscribe to:
```ts
form.on(Form.EVENT_ID, () => {});
```

### version
Version of the current form. Similar to *id*, this property is freely editable and has a built-in callback
`onversion` and `Form.EVENT_VERSION` event:
```ts
form.on(Form.EVENT_VERSION, () => console.log("Upgrade."))
form.onversion(v => console.log('Version: ' + v));

form.version = 15; // upgrade. Version: 15

```

### wait <Badge type = "tip">Read-only</Badge>
Accepts `true` or `false`, changes during read/save. When changing this property
event `Form.EVENT_WAIT` is created:
```ts
form.on(Form.EVENT_WAIT, () => {...})
```

### autonomic

Sometimes you want a child form to be dependent on its parent, but rely on its state
(changes, values, availabilities). In this case, save/read will be called from the parent form. Also, the changed
value will be read from the parent form.

```ts
const parent = new Form();
const child = new Form({
    parent,
    name: "user",
    autonomic: true
});

parent.change({
    "user.name": "Jack"
})
child.values  // {}
parent.values // { user: { name: "Jack" } }
```