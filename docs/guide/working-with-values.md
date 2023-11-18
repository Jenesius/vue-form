# Working with values
This page contains all the methods and properties that you will need to work with the state of the form.

## Set value {setValues}

The main task of forms is to maintain the current state (value). To change it, use the **setValues** method:
```ts
form.setValues({
     name: "Jack",
     age: 24
})
form.values // { name: "Jack", age: 24 }
```

### Options

#### values <Badge type="tip">Required</Badge>
The values when will be set for the form.

#### options <Badge type="info">Optional</Badge>
An optional parameter, an object with the following properties:

::: info _
##### changed <Badge type="info">Optional</Badge>
Boolean value whether the given values are changes. If *true* then values will be projected onto changes.

#### target <Badge type="info">Optional</Badge>
The name of the target on which setValues was called. You can look at this property as if the method was called
from the child element whose name was passed to *target*.

#### clean <Badge type="info">Optional</Badge>
Whether to completely overwrite the previous value. By default, *setValues* mixes in the value, but if set
`clean: true`, the previous value will be completely overwritten by the new one.
:::

### Examples of using

#### Set value
```ts
form.setValues({
     username: "Jack"
})
form.values // { username: "Jack" }
```

#### Set value with target parameter
```ts
form.setValues({
     city: "Emerald City"
}, { target: "address" })
form.values // { address: { city: "Emerald City" } }
```

#### Using the clean parameter
```ts
// Values: { username: "Jenesius", age: 24 }
form.setValues({ username: "Jenesius", age: 24 })

form.setValues({
     name: "Jask"
}, { clean: true })
form.values // { name: "Jack" }
```

#### Using target and clean together
```ts
form.setValues({
    name: "Jack",
    address: {
        city: "Emerald City"
     }
})

form.setValues({
     code: "00"
}, { target: "address", clean: true })
form.values // { name: "Jack", address: { code: "00" } }
```

#### Mixing in the value
```ts
form.setValues({
    address: {
        city: "Emerald City"
    }
})
// { address: { city: "Emerald City" } }

form.setValues({
    address: {
        code: "00"
    }
})
form.values // { address: { city: "Emerald City", code: "00" } }
```

## Changing values
As is already clear from **setValues**, if we pass `change: true`, then the work is done with the **changes** state
forms. For convenient work, alias **change** was created, which automatically sets the changed parameter.
```ts
form.change(data) // form.setValues(data, { changed: true })
```

## Undo changes
To undo changes (work with changes) use the *revert* method:
```ts{5}
form.setValues({username: "Jenesius", age: 24});
form.change({age: 23, father: true});
// Values: { username: "Jenesius", age: 23, father: true }

form.revert();
// Values: { username: "Jenesius", age: 24}
```

## Clear values
To completely clear the form, use the **cleanValues** method:
```ts
form.setValues({name: "Jack"})
form.cleanValues(); // Values: {}
```
This method also accepts values that will be set instead of the current one:
```ts
form.setValues({name: "Jack"})
form.cleanValues({age: 24}); // Values: { age: 24 }
```

## Form Values (Values)
From the previous examples, you can see that the final value of the form is in `form.values`:
```ts
form.setValues({age: 24});
form.values // { age: 24 }
```


## Form changes (Changes)
To get only the changes, you need to use `form.changes`:
```ts{4}
form.setValues({ name: "Jack" })
form.change({ age: 24 })
form.values; // { name: "Jack", name: 24 }
form.changes; // { age: 24 }
```

## Get value by name
In some situations, there is a need to get the value of a field by name. For this case, you need to use
namely the **getValueByName** method.

### Options

#### name <Badge type="info">Optional</Badge>
The string name of the field to get the value for.

```ts{2}
form.setValues({ login: "Jack" });
form.getValueByName('login') // Jack
```
::: warning
Getting a value by property name is erroneous:
```ts
form.values['login'] // Wrong
form.getValueByName('login') // Correct
```
If we are talking about simple fields, this will work, but in the case of compound fields (address.country) this
method will not be able to find the required field value.
:::

## Accept changes
To accept all changes or only for a specific field, use the **acceptChanges** method.
The method clears changes (whole or single field) and sets the cleared value to values.

### Parameter

#### name <Badge type = "info">Optional</Badge>
If not passed, all changes will be first projected onto values and then cleared. If the value
passed it must be a string field name.

### Example

```ts
const form = new Form();
form.change({ username: "Jack", age: 24, id: 1 })

form.acceptChanges('username');
form.pureValues; // { username: "Jack" }
form.changes // { age: 24, id: 1 }

form.acceptChanges();
form.pureValues; // { username: "Jack", age: 24, id: 1 }
form.changes; // {}
```

## Clear field changes
The **cleanChangesByField** method undoes the changes for the passed field. This function only works on the changes object and does not
affects the values object. If the object's child property changes is an object, but the number
child keys is 0, this property is completely removed from the changes object.

```ts
form.setValues({age: 24})
form.change({name: "Jack", age: 25}); // { name: "Jack", age: 25 }
form.cleanChangesByField('name');
// Changes: { age: 25 }
// Values: { age: 25 }
```

## Check field for change
The **checkFieldChange** method checks for changes to the passed field name. If the field has been changed
will return true, false otherwise.
```ts
form.change({name: "Jack"});
form.checkFieldChange('name') // true
form.checkFieldChange('age') // false
```

## Form Status (Changed)
To understand that the form is in a changed state, you need to get the value of the **changed** property;
```ts
form.changed // false
form.change({ name: "Jack" })
form.changed // true
form.revert();
form.changed // false
```