# FormFieldOptions

The set of enumerated dimensions. Can be either an array or an object. use
array as retrospective achievements (later in this article, the array will be discussed).

- **Array**

If an array was passed, then each element of this array should look like this:
```ts
interface OptionRow{
    label: string,
    value: any
}
```
### Example values

```ts
[
    {label: 'Green color', value: 'green'},
    {label: 'Red color', value: 'red'}
]
```

#### label
- Type: `string`

The text label to be displayed as a title.

#### value
- Type: `any`

The value that the cell will be set to.

:::tip Why an array is better
You will not get confused, where is the label and where is the value. In the case of an object, there is a possibility that
you have to
constantly look at the documentation to clarify the location of the label: on the right or on the left.
:::

- **Object**

Let's move on to the object. Remember: on the left is the value, on the right is the label (title). When passed,
an object of the following type is expected:
```ts
interface OptionObject {
	[value: string]: string
}
```

### Example

```json
{
  "green": "Green color",
  "red": "Red color"
}
```

However, in this case, we run into the following problem: the value can be **only** a string. Even the given number
as a value - will be automatically converted by JavaScript to a string. There is one situation when it is convenient
use
or store the value in an object. To do this, we have provided a [function](./../guide/utils#convertOptionsObject) for
converting an object to an array.

:::warning Why is the value on the left?
The main reason for this is that the key in an object is unique. That is, you cannot create an object with two identical keys.
It was this validation that prompted the use of the key as `value` and the value of the key as `label`.
:::
