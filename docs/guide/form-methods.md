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

## clearField
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
```ts
function change(values: Values)
```

## input
```ts
function input(name: string, v: any)
```
Является частным случаем *change*.

## setValues
```ts
function setValues(values?: Values)
```

## cleanChanges
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
Вернёт возможные зависимости по имени. Например:
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
```ts
function disable(name?: string)
```

## enable
```ts
function enable(name?: string)
```

## getDisabledByName
```ts
function getDisabledByName(name: string)
```

