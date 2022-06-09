# State
Relying on the state of the form, we can rebuild the interface, update the data
user, etc.

## Form State
The form instance has a set of properties with which the user can
to interact.

### values
Is a getter property, will return a set of all values of the given form. Important to remember,
that all values passed to the form are simplified and written to the maximum
[in-depth view](/).
```js
form.setValues({ name: 'vue'})
form.change({ 'user.age': 23 })
form.values // { name: 'vue', user: { age: 23 } }
```

### changes
This getter will only return those fields that have been marked as changed.
Similarly, with the upper example, it will be displayed:
```json
{
  "user": {
    "age": 23
  }
}
```

### name
String. The name of the form. Typically, used to link a form to the entity it is
displays.

### disabled
Boolean. Returns true if the form has been disabled.

### changed
Boolean, evaluates to true if the form has been modified.

### read
Setter read is used to set the method that will be called when reading
form data:
```js
form.read = async () => {
	const newData = await readDataFromDB();
	form.cleanValues(newData);
}
```

### save
Similar to read, there is a save setter that sets the value of the function,
which will be called when the form is saved:
```js
form.save = async () => {
	await saveDataToDB(form.changes);
	// automatical will run form.cleanChanges()
}
```

### parentForm
A reference to the parent form, or *undefined* if the form is the main form.

## Reactive State
The properties of the Form objects have been described above, but the form itself is not
reactive and has neither reactive, nor ref, nor
computed properties. However, the following hook can be used for reactivity:
```js
// import {useFormState} from "jenesius-vue-form"
const {state} = useFormState(form);
```

State is a reactive object and has the following properties:

### changed

Returns true if the form has been modified by an input field, or
using the *form.change* method:
```js
// does not put the form in the "changed" state
form.setValues({name: 'vue'}) 

// Put Form in the "changed" state
form.change({name: 'vue'})
```
### disabled
Returns true if the form has been put into a state
not editable with
method [disable](/guide/form-methods#disable)
