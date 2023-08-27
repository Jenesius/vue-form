import {DOMWrapper, mount, VueWrapper} from "@vue/test-utils";
import EmptyApp from "../components/EmptyApp.vue";
import {defineComponent, h} from "vue";
import {InputField, Form, FormField} from "../../../src/index";
import STORE from "./../../../src/config/store";

const name = 'phone'
const label = 'Your phone'
function defineTelComponent() {
    return defineComponent({
        template: `<div><form-field type = "tel" name = "${name}" required label = "${label}" /></div>`,
        components: {FormField}
    })
}
function defaultMount(component = defineTelComponent()) {
    return mount(EmptyApp, {
        slots: { default: component },
        attachTo: document.body
    })
}

describe("Input tel", () => {
    let app: VueWrapper<any>;
    let form: Form
    let input: DOMWrapper<HTMLInputElement>
    beforeEach(() => {
        app = defaultMount()
        form = (app.vm as any).form
        input = app.find('input')
    })

    test("По умолчанию поле не должно ничего показывать", async () => {
        expect(input.element.value).toBe("")
    })
    test("В пустом поле отображается должен отображаться лишь label", async () => {
        expect(app.text()).toBe(label + '?')
    })
    test("Ввод поля изменяет form", async () => {
        await input.setValue("+1234");
        expect(form.getValueByName(name)).toBe("1234")
    })
    test("Установка значения в form меняет поле", async () => {
        form.setValues({ [name]: "+000" })
        await app.vm.$nextTick();
        expect(input.element.value).toBe("+000")
    })
    test("Поле должно отображать значение с +, даже если в форме хранится без", async () => {
        form.setValues({ [name]: "222" })
        await app.vm.$nextTick();
        expect(input.element.value).toBe("+222")
    })
    test("При удалении значения из формы, поле должно стать пустым", async () => {
        form.setValues({ [name]: "222" })
        await app.vm.$nextTick();
        form.cleanField(name);
        await app.vm.$nextTick();
        expect(input.element.value).toBe("")
    })
    test("При очистки поля(вставки ''), в форме должна хранится пустая строка.", async () => {
        await input.setValue("+1234");
        await input.setValue("");
        expect(form.getValueByName(name)).toBe("")
    })
    test("Блокировка поля блокирует input", async () => {
        form.disable()
        await app.vm.$nextTick();
        expect(input.element.disabled).toBe(true);
    })
    test("Блокировка input должна запрещать ввод", async () => {
        await input.setValue("23");
        form.disable()
        await app.vm.$nextTick();
        await input.setValue("+1234");
        expect(form.getValueByName(name)).toBe("23")
    })
    test("Ошибка валидации должна отображаться", async () => {
        form.validate()
        await app.vm.$nextTick();
        expect(app.text()).toBe(label + '?' + STORE.requiredMessage)
    })
    test("Иконка страны должна меняться при установки новых значений", async () => {
        await input.setValue("4523");
        const icon = app.find('.input-tel-code') // Иконка появляется только после первой установки

        expect(icon.element.getAttribute('src')?.includes('dk.svg')).toBe(true)

        await input.setValue("35626");
        expect(icon.element.getAttribute('src')?.includes('mt.svg')).toBe(true)

        await input.setValue("37529");
        expect(icon.element.getAttribute('src')?.includes('by.svg')).toBe(true)



    })

})