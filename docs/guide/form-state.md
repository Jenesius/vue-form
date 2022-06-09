# State
Полагаясь на состояние формы мы можем перестраивать интерфейс, обновлять данные
пользователя и т.д.

## Form State

Экземпляр формы имеет набор свойств с которыми пользователь может
взаимодействовать.

### values
Является getter свойством, вернёт набор всех значений данной формы. Важно помнить,
что все значения передаваемые в форму упрощаются и записываются в максимально
[углубленном представлении](/).
```js
form.setValues({ name: 'vue'})
form.change({ 'user.age': 23 })
form.values // { name: 'vue', user: { age: 23 } }
```

### changes
Данный getter вернёт лишь те поля, которые были помечены, как изменившиеся. 
Аналогично с верхним примером будет выведено:
```json
{
  "user": {
    "age": 23
  }
}
```

### name
String. Имя формы. Обычно используется для связи формы с сущностью, которую она
отображает.

### disabled
Boolean. Принимает значение true, если форма была заблокирована.

### changed
Boolean, принимает значение true, если форма была изменена.

### read
Setter read используется для уставки метода, которые будет вызван при чтении
данных дл формы:
```js
form.read = async () => {
	const newData = await readDataFromDB();
	form.cleanValues(newData);
}
```

### save
Аналогично с read, существует setter save, который устанавливает значение функции,
которая будет вызвана при сохранении формы:
```js
form.save = async () => {
	await saveDataToDB(form.changes);
	// automatical will run form.cleanChanges()
}
```

### parentForm
Ссылка на родительскую форму или *undefined*, если форма является основной.

## Reactive State
Выше были описаны свойства объектов Form, однако сама форма не является
реактивной и не имеет в себе ни reactive, ни ref, ни
computed свойств. Однако для реактивности можно использовать следующих hook:
```js
// import {useFormState} from "jenesius-vue-form"
const {state} = useFormState(form);
```

State является reactive объектом и имеет следующие свойства:

### changed

Принимает значение true, если форма была изменена полем ввода или
используя метод *form.change*:
```js
// does not put the form in the "changed" state
form.setValues({name: 'vue'}) 

// Put Form in the "changed" state
form.change({name: 'vue'})
```
### disabled
Принимает значение true, если форма была переведена в состояние
не редактируемое при помощи
методе [disable](/guide/form-methods#disable)
