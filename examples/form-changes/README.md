# Form changes

Данный пример демонстрирует работу со значениями, а именно с изменениями. При работах с формами нужно отслеживать, какие
значения были изменённые. Для этого в библиотеке предусмотрен механизм пометки поля, как изменённое.
Как это работает:
1. Представим, что в форме у нас находятся значения
```json
{
    "name": "Jenesius",
    "age": 23
}
```
2. Мы решили изменить значение age на 24.
```ts
form.change({age: 24})
```
3. В данном случае, значения примут следующий вид:
 ```json
{
    "name": "Jenesius",
    "age": 24
}
```
При этом будет изменён слепок меток изменений:

```json
{
    "age": true
}
```
4. Теперь при получении form.changes, мы будем видеть только те значения, которые помечены как true.
```ts
form.changes // { age: 24 }
```

В Данном примере используются:
- [form.changes](https://form.jenesius.com/guide/form-state.html#changes)
- [form.change](https://form.jenesius.com/guide/form-methods.html#change)
- [form.setValues](https://form.jenesius.com/guide/form-methods.html#setvalues)
- [form.cleanChanges](https://form.jenesius.com/guide/form-methods.html#cleanchanges)
- [form.cleanValues](https://form.jenesius.com/guide/form-methods.html#cleanvalues)