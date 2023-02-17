# Convert options object

Данная функция конвертирует переданный объект в массив. На выходе получается валидны OptionRow[], которые можно передавать
любому input.

## Входные параметры

Данная функция существует в двух режимах:

- Передача обычно объект, где слева value, а справа метка:

```ts
import {utils} from "jenesius-vue-form";
utils.convertOptionsObject({'jack': 'Jack Jak Ja J'}) 
// [{ value: 'jack', label: 'Jack Jak Ja J' }]
```

- Передача перевёрнутого объекта, где слева у нас находится label, а справа значение. Такой подход позволяет 
использовать объект, в котором значение может быть любого тепа, не только строкой

```ts
convertOptionsObject({
    'Label Jack': {name: "Jack", age: 24}
}) // [ { label: 'Label Jack', value: { name: "Jack", age: 24 } } ]
```
