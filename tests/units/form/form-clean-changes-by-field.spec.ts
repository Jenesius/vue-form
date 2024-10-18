import Form from "../../../src/classes/Form";
import {utils} from "../../../src/index";

describe("Form clean changes by field", () => {
    test("Simple clean changes", () => {
        const form = new Form();
        form.change({
            name: "Jack"
        })
        expect(form.changes).toEqual({
            name: "Jack"
        })
        form.cleanChangesByField("name")
        expect(form.changes).toEqual({})
    })
    test("Clean changes for values will not has effect", () => {
        const form = new Form();
        form.setValues({
            username: "Jack"
        })
        form.cleanChangesByField("username")
        
        expect(form.changes).toEqual({})
        expect(form.values).toEqual({
            username: "Jack"
        })
    })
    test("Clean changes for values that not exist", () => {
        const form = new Form();
        form.setValues({
            username: "Jack"
        })
        form.cleanChangesByField("name")
        
        expect(form.changes).toEqual({})
        expect(form.values).toEqual({
            username: "Jack"
        })
    })
    test("Clean changes for deep values will not has effect", () => {
        const form = new Form();
        form.change({
            name: "Jack"
        })
        form.cleanChangesByField("name.code");
        expect(form.changes).toEqual({
            name: "Jack"
        })
    })
    test("Should clean all changes", () => {
        const form = new Form();
        form.setValues({
            address: {
                city: "Minsk"
            }
        })
        form.change({city: "Mogilev"}, {target: "address"});
        
        form.cleanChangesByField("address.city");
        
        expect(form.values).toEqual({
            address: {
                city: "Minsk"
            }
        })
        expect(form.changes).toEqual({})
        expect(form.changed).toBe(false)
    })
    test("Clean changes for child", () => {
        const form = new Form();
        const child = new Form({
            name: "address"
        })
        form.subscribe(child);
        
        form.change({
            address: {
                city: "Mogilev",
                country: "Belarus"
            }
        })
        child.cleanChangesByField("city")
        
        expect(form.changes).toEqual({
            address: {
                country: "Belarus"
            }
        })
    })
    test("Reverting data when values is equal", () => {
        const form = new Form();
    
        form.setValues({ username: "Jack"})
        form.change({username: "Masj"})
        form.cleanChangesByField("username")
        
        expect(form.changes).toEqual({})
        expect(form.values).toEqual({
            username: "Jack"
        })
    })
    test("Reverting data when use undefined", () => {
        const form = new Form();
        form.change({
            name: "Text"
        })
        form.change({
            name: undefined
        })
        expect(form.changes).toEqual({})
    })
    
    
    /**AUTONOMIC FORMS**/
    test("Очистка изменений не должна иметь эффект на дочерние автономные(autonomic) классы.", () => {
        const parentForm = new Form();
        const childrenForm = new Form({
            parent: parentForm,
            name: "test",
            autonomic: true
        })
        
        childrenForm.change({
            username: "Jack",
            age: 25
        })
        parentForm.change({
            age: 100
        })
        /**
         * Очищаем поле username в родительской форме. Поле username в childrenForm не должно
         * быть затронуто.
         */
        parentForm.cleanField( utils.concatName(childrenForm.name, 'username'))
        
        expect(childrenForm.changes).toEqual({
            username: "Jack",
            age: 25
        })
        expect(parentForm.changes).toEqual({
            age: 100
        })
        
        /**
         * Очищаем поле age в childrenForm. Поле age не должно быть затронуто в parentForm.
         */
        childrenForm.cleanField( utils.concatName('age') )
        expect(childrenForm.changes).toEqual({
            username: "Jack",
        })
        expect(parentForm.changes).toEqual({
            age: 100
        })
        
        /**
         * Предустанавливаем поле age в childrenForm. После очистки поля в parentForm, оно не должно
         * иметь эффект над children.
         */
        childrenForm.change({
            age: 18
        })
        parentForm.cleanField( utils.concatName('age') )
        expect(childrenForm.changes).toEqual({
            username: "Jack",
            age: 18
        })
        expect(parentForm.changes).toEqual({})
        
    })
    
    
})