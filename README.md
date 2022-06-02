# Jenesius Vue Form
Hi, If you stay here, please leave. This package is not ready ;)

## Main Form
Для создавния формы, необходимо просто создать экземпляр. JenesiusVueForm сделает
большую часть работы за вас.
- автоматически provide контроллер для работы с ней дочерним элементам.
```js
    const form = new Form();
```

## Composition Element
Элемент композиции. Напрямую подписывается на форму. Обычно является одиночным или
составным инпутом.
```ts
    const mainForm = inject(Form.PROVIDE_NAME); // Получение контроллер

    const init = () => new Form({name: props.name, composition: true})
    const form = mainForm.restoreDependence(name) || init();
```

## Form methods

- getValues
- setValues
- restoreDependence
- findDependence
- depend
- emit
- on
- `validate` Валидирует форму и все подписанные на неё элементы. Вернёт **false**
если хотя бы один из элементов не прошёл валидацию.

## Принцып

1. Если элемент не подписывается сам на форму, а только реагирует на неё, он считается
basic-composite-item. В данном случае элемент не добавляется в зависимости, а просто
подписывается на изменения формы и ссылается на её values, changes и т.д.
2. Состояние формы и её инпутов: value, disable, hidden хранит родительска форма.
3. 

