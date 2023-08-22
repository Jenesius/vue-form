# Methods

## cleanChanges
Clean changes (Not revert Values!). Rewrite changes If new values provided.
```ts
form.cleanChanges();
form.changes // {}
```
In the case of passing values, the changes will be equal to the keys of the passed value
```ts
form.change({
    username: "Jack",
    age: 23,
    sex: 'm'
})
form.changes // { usename: "Jack", age: 23, sex: "m" }
form.cleanChanges({
    username: true // Is not NEW value! Just cast for values
})
form.changes // { username: "Jack" }
```

## cleanField
Method using for clear field. Don't set NULL. Remove field from values.
```ts
form.values // { username: "Jack", age: 23 }
form.cleanField('username')
form.values // { age: 23 }
```

## cleanValues

Clears the current values. If a new value object was passed, sets it as the current one.
```ts
form.values // { username: "Jack", status: "free" }
form.cleanValues({ name: "Donald" });
form.values // { name: "Donald" }
```

## getValues
Returns the form value. If field names were passed, it will return only their values
```ts
form.values // { username: "Jack", age: 23, sex: "m", status: "free" }
form.getValues() // { username: "Jack", age: 23, sex: "m", status: "free" }
form.getValues('username') // { username: "Jack" }
form.getValues('age', 'sex') // { age: 23, sex: "m" }
```

## change
This method sets the values and marks them as changed.
```ts
function change(values: Values)
```

## input
It is analogous to the *change* method, but has a different structure of passed values.
```ts
function input(name: string, v: any)
```

## setValues
The main value setting function. In fact, all other functions use it internally. Passed Values
will not completely overwrite those already in the form. There will be a stage of mixing values. Further, values will be
broken down into simple components:

```json
{
  "address.city.code": 1,
  "name": "Jenesius"
}
```
Will be split into:
```json
{
  "address": {
    "city": {
      "code": 1
    }
  },
  "name": "Jenesius"
}
```
After that, new values will be passed to all dependent elements.
```ts
function setValues(values?: Values)
```

## cleanChanges
It just clears the marked fields as changed. **Does not return their values back!**
```ts
function cleanValues(values?: Values)
```

## save
```ts
form.save()
```

## read
```ts
form.read()
```

## validate
This function is used to validate the form. Returns true if the form and all of its children are valid,
false otherwise.
```ts
form.validate()
```

## depend
```ts
function depend(item: any)
```

## getAssociatedDependencies
```ts
function getAssociatedDependencies(name: string)
```

Return possible dependencies by name. For example:
- **address**: address, address.city, address.description
- **address.city**:address, address.city

## getDependenciesByName
```ts
function getDependenciesByName(name: string): any[]
```

## getValueByName
```ts
function getValueByName(name: string)
```

## disable

Block all fields (or passed by name).
```ts
function disable(name?: string)
```

## enable

Unlock all fields (or passed by name).
```ts
function enable(name?: string)
```

## getDisabledByName
```ts
function getDisabledByName(name: string)
```

