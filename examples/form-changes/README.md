# Form changes

This example demonstrates working with values, namely with changes. When working with forms, you need to keep track of which
values have been changed. To do this, the library provides a mechanism for marking a field as changed.
How it works:
1. Imagine that in the form we have the values
```json
{
    "name": "Jenesius",
    "age": 23
}
```
2. We decided to change the value of age to 24.
```ts
form.change({age: 24})
```
3. In this case, the values will take the following form:
 ```json
{
    "name": "Jenesius",
    "age": 24
}
```
This will change the change mark snapshot:

```json
{
    "age": true
}
```
4. Now when receiving form.changes, we will only see those values that are marked as true.
```ts
form.changes // { age: 24 }
```

This example uses:
- [form.changes](https://form.jenesius.com/guide/form-state.html#changes)
- [form.change](https://form.jenesius.com/guide/form-methods.html#change)
- [form.setValues](https://form.jenesius.com/guide/form-methods.html#setvalues)
- [form.cleanChanges](https://form.jenesius.com/guide/form-methods.html#cleanchanges)
- [form.cleanValues](https://form.jenesius.com/guide/form-methods.html#cleanvalues)