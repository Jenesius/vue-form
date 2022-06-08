# Methods

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

