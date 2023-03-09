# Utils

This library provides a set of functions that are used within it. They may be useful for
interface design and ensure that their behavior does not differ from that of the library.

To use **utils**, you need to import them from the library:
```js
import {utils} from "jenesius-vue-form";
```

The following describes all the functions that are included in *utils*.

## Convert options object

This function converts the passed object into an array. The output is valid OptionRow[], which can be passed
any input.

### Input parameters

This function exists in two modes:

- The pass is usually an object, with value on the left and label on the right:

```ts
import {utils} from "jenesius-vue-form";
utils.convertOptionsObject({'jack': 'Jack Jak Ja J'}) 
// [{ value: 'jack', label: 'Jack Jak Ja J' }]
```

- Passing an inverted object, where we have a label on the left and a value on the right. This approach allows
use an object where the value can be of any type, not just a string.

```ts
convertOptionsObject({
    'Label Jack': {name: "Jack", age: 24}
}) // [ { label: 'Label Jack', value: { name: "Jack", age: 24 } } ]
```
### Output parameters

This function will always return an array of the following type:
```ts
interface OptionRow {
	label: string
    value: any
}
```
