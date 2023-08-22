<script setup>
import {FormField, Form} from './../../../src';
const form = new Form();

const arrayColor = [
        {
            label: 'Красный',
            value: 'red'
        },
        {
            label: 'Зелёный',
            value: 'green'
        },
        {
            label: 'Синий',
            value: 'blue'
        },
        {
            label: 'Прозрачный',
            value: null
        },
		{
			label: 'Чёрный цвет',
			value: 'black'
		},
		{
			label: 'Белый цвет',
			value: 'white'
		},
		{
			label: "Жёлтый цвет",
			value: 'yellow'
		}
    ];
const coolOptions = [
        {
            label: 'Купить машину',
            value: 'car'
        },
        {
            label: 'Задонатить',
            value: 'donate'
        },
    ]

</script>

# Widgets

Для быстрой и чистой разработки формы была создана компонента `FormField`: 

```html
// import {FormField} from "jenesius-vue-form"
<form-field :type="type"/>
```

Со всеми разработанными типами можно ознакомится далее:

- [Text](#text)
- [Select](#select)
- [Password](#password)
- [Checkbox](#checkbox)
- [Single Checkbox](#single-checkbox)
- [Switch](#switch)
- [Radio](#radio)
- [Single Radio](#single-radio)
- [Tel](#tel)
- [Range](#range)
- [Number](#number)
- [Date](#date)
- File (в разработке)
- Email (в разработке)

## Text

Поле по умолчанию. Обычное текстовое поле.
```html
<form-field type="text"/>
```
<FormField type = "text" label = "Text" name = "login" />

Кстати, параметр *type* в случае поля «Текст» можно не указывать.

## Select

Представляет элемент, позволяющий выбрать значение из предоставленных.

<FormField type = "select" label = "Цвета" name = "color" :options = "arrayColor" />

Передаваемые параметры:

- **options** Набор перечислимых измерений. Существует два типа передачи: массив и объект.
  Разберем каждый подробнее, но рекомендуем использовать Array, чтобы избежать ошибок и непонятных
  моменты в вашем коде.

В случае Option(Array) структура выглядит следующим образом:

```ts
[
	{label: 'Green color', value: 'green'},
	{label: 'Red color', value: 'red'}
]
```

Поле **label** — текстовая метка, которая будет отображаться в виде заголовка.

Поле **value** принимает любое значение.
:::tip Чем полезен массив
Вы не запутаетесь, где метка, а где значение. В случае с объектом существует вероятность того, что
тебе придется
постоянно заходите в документацию, чтобы уточнить расположение метки: справа или слева.
:::

Перейдем к опциям как к объекту. Помните: слева — значение, справа — метка (заголовок).

```json
{
  "green": "Green color",
  "red": "Red color"
}
```

Однако в этом случае мы сталкиваемся со следующей проблемой: значение может быть **только** строкой. Даже указанное число
как значение — будет автоматически преобразовано JavaScript в строку. Есть одна ситуация, когда удобно
использовать
или сохраните значение в объекте. Для этого мы предоставили [функцию](./../guide/utils#convertOptionsObject) для
преобразования объекта в массив.

## Password

Поле ввода пароля. Имеет возможность переключения режима видимости.
```html
<input-field type="password"/>
```
<FormField type = "password" label = "Password" name = "password" />

## Checkbox

Элементы типа checkbox по умолчанию отображаются как отмеченные флажки.
(отмечено) при активации, как вы можете видеть в официальной правительственной бумажной форме.

```html
<input-field type="checkbox" :options="options"/>
```
- **options** - аналогично с InputSelect

<FormField type = "checkbox" label = "How help?" name = "coolOptions" :options = "coolOptions" />

## Single Checkbox

В случае, если на интерфейсе флажок будет только в одном экземпляре (как переключатель), можно использовать
**один флажок**. Работает идентично, как и [switch](#switch).
```html

<input-field type="single-checkbox" name="use-password"/>
```
<FormField type = "single-checkbox" label = "usePassword" name = "usePassword"  />

## Switch

Переключающий элемент. Имеет два состояния: включение/выключение, что соответствует **true**/**false**.

```html
<input-field type="switch"/>
```
<FormField label = "Dark site theme" type = "switch" name = "theme"/>

## Radio

Элементы типа радио обычно используются в выборе одного единственного варианта.
Одновременно можно выбрать только один переключатель в данной группе.

```html
<input-field type="radio" :options="options"/>
```

- **options** - аналогично с InputSelect

<FormField type = "radio" label = "How help?" name = "coolOptions" :options = "coolOptions" />

## Single Radio

Аналогично `single-checkbox`, но для ввода поля `radio`.

## Tel

Элементы ввода типа тел используются для того, чтобы пользователь мог вводить и редактировать номер телефона.

```html
<input-field type="tel"/>
```

<FormField type = "tel" label = "How help?" name = "phone"  />

## Range

Элементы ввода типа range позволяют пользователю указать числовое значение, которое должно быть не меньше заданного значения, и не
больше, чем другое заданное значение.

```html
<input-field type="range" label="Volume"/>
```

**Options**:

- min (Number) - Значение не будет меньше мин. Значение по умолчанию – 0.
- max (Number) - Значение не будет больше максимального. Значение по умолчанию — 100.
- step (Number) - Значение шага. По умолчанию 1.

<FormField label = "Volume" type = "range" name = "volume" />

## Number

Элементы ввода типа номера используются для того, чтобы пользователь мог ввести число. Они включают встроенную проверку для отклонения
нечисловые записи.

```html
<input-field type="number" label="Age"/>
```

**Options**:

- step (число) - Значение шага. По умолчанию 1.

 <FormField label = "Age" type = "number" name = "age"/>

## Дата {#date}

```html

<input-field type="date" label="Created"/>
```

**Options**:

- step (Число) - Значение шага. По умолчанию 1.

<FormField label = "Created" type = "date" name = "date"/>