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
