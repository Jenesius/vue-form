# Utils
It provides information about all the functions that you can use in your project. All features
are deeply used in the library itself.

Each method described here is in the **utils** object:

```ts
import {utils} from "jenesius-vue-form";

utils.bypassObject({});
```

## bypassObject
The method is used to iterate over all non-[iterables](#iterablePoint).

### Params

#### object <Badge type = "tip">Обязательный</Badge>

The object to be traversed.

### Result

The result is an array whose elements are of the following type:
```ts
interface BypassItem {
	value: any,
	name: string,
	set: (x: any) => void
}
```

#### value
End point value

#### name

Full path of the endpoint

#### set

Function to set value to point

### Examples

```ts
bypassObject({ login: "Jack", address: { city: "Berlin" } })
// [
//    { name: "login", value: "Jack", set: Function },
//    { name: "address.city", value: "Berlin", set: Function }
// ]
```

## checkCompositeName

The function checks if the first parameter is the preceding key for the second parameter.

### Params

#### parentName <Badge tip = "tip">Required</Badge>
The string value of the parent name.
#### childName <Badge tip = "tip">Required</Badge>
The string value of the child name.

### Пример

```ts
checkCompositeName('address', 'address.city')           // true
checkCompositeName('address.city', 'address.city')      // true

checkCompositeName('addr', 'address.city')              // false
checkCompositeName('username', 'address.city')          // false
checkCompositeName('address.city.index', 'address.city')// false
```

## checkNameInObject

Checks for the presence of a field in an object. The passed Object must be [Grand](#grand).

### Params

#### object
The object in which to search.
#### name
String name field.

### Result

Boolean value, **true** - if such a field is present in the object.

### Examples
```ts
const obj = { username: "Jack", address: { country: { code: 0 } } }

checkNameInObject(obj, "name");            // false
checkNameInObject(obj, "username");        // true
checkNameInObject(obj, "address.country"); // true
checkNameInObject(obj, "adress.test");     // false

```

## checkObjectForPrimitiveInstance

This function is used to identify objects that, by their nature,
in essence are primitives and there is no need to make a separate copy for them,
and go inside and iterate their properties. To such objects at this time
moment include:

- Date
- Blob
- Error

Also, all other objects are inherited from them. This function is one of those
with the help of which a check is made for [isIterable](#isiterablepoint).

## checkPrimitiveValue

Returns **true** if the passed value is a primitive(*null* or *undefined* or any value
which is not an object or function).

## clickOutside <Badge type = "warning">Позже</Badge>

## compareDifference

The method is used to compare two passed objects.

### Return value

Returns an array: the result of the comparison. The result of the comparison is the name of the field, which
different from the original object. If the **N** field is present in **newValue** and is present in the **oldValue** object and its
the value in these objects is identical - this field will not be returned as a result of this function. In any other
cases: The new object has a field, but the old one does not (the field has been added) or the old object has a field, but the new one does not
(the field was removed) - the field will be displayed as a result.

The array consists of **CompareItem** elements:

```ts
interface CompareItem {
	name: string,
	oldValue: any,
	newValue: any,
}
```

### Params

#### oldValue
Primary object (or initial values)

#### newValue
Source object (or end values)

### Examples

```ts
const newValue = {
    name: "Jenesius",
    age: 24
}
const oldValue = {
    name: "Jenesius",
}

compareDifference(oldValue, newValue) 
// [ { name: "age", newValue: 24, oldValue: undefined } ]
```

## compareMergeChanges

Unlike the previous method [compareDifference](#compareDifference), this function accepts an object that will be
changes are made, and changes. From this we can conclude that the second object is only needed for two things:

1. Whether the field has been changed. If `{name: "J"}` came in the changes, and the object already had the field `{name: "J"}`,
   then this field will not be marked as changed.
2. To get the old value (oldValue). That is, we already have a set of changes and a full-fledged comparison of two objects
   not necessary, but only need to project the second object (changes) onto the first and compare exactly what changes will be
   produced.

You also need to remember that changes are only projected onto the original values. In other words, if
the original values are `{coordinate: {x: 1}}` and the changes are `{coordinate: {y: 2}}` the resulting object (which
assumed): `{ coordinate: { x: 1, y: 2 } }` and in this case we get that we have two changes:
```ts
[
    { name: 'coordinate', newValue: { x: 1, y: 2 }, oldValue: { x: 1 } },
    { name: 'coordinate.y', newValue: 2, oldValue: undefined }
]
```

### Params

#### sourceValue
Primary object on which changes will be projected

#### changes
Object of change

## concatName

The method is used to join the passed names.

### Params

Accepts any set of values.

### Examples

```ts
concatName('address', 'city', 'indxe'); // "address.city.index"
concatName('name', null, '', 'first'); // "name.first"
```

## convertOptionsObject

Used to convert the value to `OptionRow[]`, where OptionRow:
```ts
interface OptionRow{
	label: string,
    value: any
}
```

Basically the method is used for option like fields like select, radio, checkbox.

### Params

#### object <Badge type = "tip">Required</Badge>
The source object to be converted to an array.

#### type <Badge type = "info">Non Required</Badge>

By default, the value is **undefined** and the processing of values is as follows: the key of the object is **value**,
and the value of this key is **label**. But, if you pass *reverse*, then it will be the other way around: the key is **label**, the value of the key is **value**.

### Examples
```ts
const values = {
	name: "Jack",
    age: 24
}
convertOptionsObject(values)
// [ { value: 'name', label: "Jack" }, { value: 'age', label: "24" } ]

convertOptionsObject(values, 'reverse')
// [ { value: 'Jack', label: "name" }, { value: 24, label: "age" } ]
```

:::tip Why is the value on the left side?
The primary reason is that the value must be `unique`. The object key allows you to do this.
:::

## copyObject

Object to copy objects. Returns a copy of the passed object. This feature was first implemented using
`JSON.parse(JSON.stringify())`, but later we needed to copy the frozen objects. What is `JSON`
cannot provide.

### Params

#### object <Badge type = "tip">Required</Badge>
Object to be copied

### Examples

```ts
const values = { username: "Jack", age: 24 }
const copy = copyObject(values)
copy.age = 25;
copy.age     // 25
values.age   // 24
```

## deletePropByName

Removes a value by name from an object.

### Params

#### object
The source object in which the deletion will be performed.

#### name
A string value (single *address* or composite *address.city.name*) - the name of the field to be removed.

### Examples

```ts
const values = { address: { city: "Berlin" } }
deletePropByName(values, "address.city");
values // { address: { } }
```

## findNearestNameFromArray

The function finds the nearest name from the passed array. In this function, the names can be the same. Returns string or undefined.
### Params

#### array <Badge type = "tip">Required</Badge>
An array of strings to search for. The search is performed by the function [checkCompositeName](#checkcompositename)

#### name <Badge type = "tip">Required</Badge>

The string value of the field to search.

### Examples
```ts
findNearestNameFromArray(['city', 'address'], 'address.city' ) // address
findNearestNameFromArray(['city', 'address.city', 'address'], 'address.city' ) // address.city
```

## findNearestPrefixFormArray

The function looks for the closest prefix passed in the array. Returns string or undefined. The prefix will not be
a string identical to the one passed. The main condition is that the prefix must be shorter than the parent string.

### Params

#### array <Badge type = "tip">Required</Badge>
An array of strings to search for. The search is performed by the function [isPrefixName](#isprefixname)

#### name <Badge type = "tip">Required</Badge>

The string value of the field to search.

### Examples
```ts
findNearestPrefixFormArray(['city', 'address'], 'address.city' ) // address
findNearestPrefixFormArray(['city', 'address.city', 'address'], 'address.city' ) // address
```

## getCastObject

The function returns a nugget for the passed object.

### Params

#### object
Source value object.

#### cast
An object where the property value can only be `true`.

#### Examples
```ts
const values = {
	adderss: { city: "Berlin", code: 1 },
    login: "jenesius",
    username: "jack"
}
const cast = {
	address: {
		city: true
    },
    username: true
}

const result = getCastObject(values, cast);
// { address: { city: "Berlin" }, username: "jack" }
```

## getLabelFormOptionRow

While there is no need to remove the title, and fully replace it with a label, therefore, in the current system
these two options are supported. In the future, we will adhere to a narrowing policy so that there is only one RIGHT option
data descriptions.

**OptionRow** retained the ability to use title for compatibility, but this is obsolete.
Nevertheless, this method has been added to the system in order to accurately pull out the string label.

### Params

#### object <Badge type = "tip">Required</Badge>
An object of type **OptionRow**.

### Examples

```ts
getLabelFromOptionRow({label: "Name", value: "test"}) // "Name"
getLabelFromOptionRow({title: "Login", value: "test"}) // "Login"
```

## getPropFormObject

Returns a value by key (may be composite) from an object.

### Params

#### object <Badge type = "tip">Required</Badge>
The source object in which to search.

#### name <Badge type = "tip">Required</Badge>
String value (may be a composite *address.city.name") - the name of the field to be retrieved.

### Пример
```ts
const values = { username: "Jenesius", address: { city: "Berlin" } }
getPropFormObject(values, 'username'); // "jack"
getPropFormObject(values, 'username.test'); // undefined
getPropFormObject(values, 'address.city'); // "Berlin"
```

## grandObject

It receives a data object as input, returns the most simplified decomposed object. Simplification means that
any name that can be decomposed will be decomposed (`address.city` -> `{address: { city }`). Returns a new object.

### Params

#### object <Badge type = "tip">Required</Badge>
The object to be decomposed.

### Examples

#### Input

```ts
const input = {
    "user.name": "Jack",
    "address.city": {
        "code.value": 123
    }   
}
```

#### Output

```ts
const result = {
    "user": {
        "name": "Jack"
    },
    "address": {
        "city": {
            "code": {
                "value": 123
            }
        }
    }
}
```

## insertByName

Inserts a value by name into an object.

### Params

#### object <Badge type = "tip">Required</Badge>
The source object into which the insertion will take place.

#### name <Badge type = "tip">Required</Badge>
A string value (may be a composite *address.city.name") - the name of the field to be added.

#### value <Badge type = "tip">Required</Badge>
Any value.

### Examples

```ts
const values = {}
insertByName(values, "address.city", "Berlin");
values // { address: { city: "Berlin" } }
```

## isEmptyObject
The method will return **true** if the resulting object has no children.

### Examples

#### object <Badge type = "tip">Required</Badge>
An object that is being tested for emptiness.

## isIterablePoint
One of the main methods that is used in the form. The method takes a value and returns true if the object
is [iterable](#iterablePoint).

## isPrefixName
Returns true if the second parameter is a prefix (parent) of the first.

```ts
function isPrefixName(fieldName: string, prefix: string): boolean {} 
```

### Examples

- `address.city.name`, `address` -> **true**
- `user.type.index`, `user.type` -> **true**
- `position.city.type`, `city` -> **false**
- `name`, `name` -> **false**

## iteratePoints

The method takes an object and returns an array containing the value of each node of the passed object. array stores
elements of the following type:
```ts
interface Point {
	name: string,
    value: any
}
```

### Params

#### object <Badge type = "tip">Required</Badge>
The object to walk through.

### Examples

#### Input

```ts
iteratePoints({"a": 1, "city": {"code": 2}})
```

#### Output
```ts
[
    { name: 'a',         value: 1         },
    { name: 'city',      value: {code: 1} },
    { name: 'city.code', value: 2         },
]
```

## mergeObjects

The method merges all objects (except the first one) into the first one.

```ts
function mergeObjects(originalValues: Values, ...newValues: Values[]) {}
```

### Examples

```ts
const object1 = {
	name: "Jack",
    city: {
		code: 2
    }
}
const object2 = {
	age: 24,
    city: {
		index: 1
    }
}
const objectResult = {};
const result = utils.mergeObjects(objectResult, object1, object2);
```

objectResult will have the following value:
```ts
const result = {
	age: 24,
	name: "Jack",
    city:{
		coed: 2,
        index: 1
    }
}
```

## parseFirstName
The function accepts and processes a string field name, returns the first possible name and the rest.

### Params

#### fieldName <Badge type = "tip">Required</Badge>
The string value to be divided into pieces.

### Examples
- address.city.name -> **[address, city.name]**
- username -> **[username, ]**
- application.name -> **[application, name]**

## plainObject

The method unwraps the object, making all fields that are not [iterable](#iterablepoint) linear.

### Params

#### object <Badge type = "tip">Required</Badge>
The object to be simplified

### Examples

#### Input
```ts
const result = plainObject({
    address: {
        city: 'Berlin'
    },
    index: 1
})
```

#### Output
```ts
const result = {
    "address.city": "Berlin",
    "index": 1
}
```

## recursiveRemoveProp
Removes an element from an object by key.
The method is very similar to the [delete key](#deletepropbyname) method, but its main feature is if the object being deleted contains
no child elements - deletes the entire object. This will be shown in the example.

### Params

#### object
The source object in which the deletion will be performed.

#### name
A string value (may be a composite *address.city.name") - the name of the field to be removed.

### Examples

```ts
const values = { address: { city: "Berlin" } }
deletePropByName(values, "address.city");
values // { }
```

## runPromiseQueue <Badge type = "warning">Позже</Badge>

## splitName
The method takes a name and returns an array of compound names, separating the name by dots.

### Params

#### name <Badge type = "tip">Required</Badge>
The string value to be processed.

### Examples

```ts
splitName("addres"); // ["address"]
splitName("address.city.index"); // ["address", "city", "index"]
````

## Abbreviated concepts

### iterablePoint
The iterable object is not:
- Primitive
- Array
- A frozen object, `Object.frozen`
- An empty object `(Object.keys.length === 0)`
- Function
- The object inherits from classes that are checked in
[checkObjectForPrimitiveInstance](#checkobjectforprimitiveinstance)

### grand
An object is *grand* if there is no property in it that has a dot in itself.

The following object is not *grand*:
```ts
const object ={
  "address": {
    "city": 1,
    "country.index": 2 // Wrong
  }
}
```

The easiest way to make an object *grand* is to use the [**grandObject**](#grandobject) function

