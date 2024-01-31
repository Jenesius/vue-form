import {DOMWrapper, mount, VueWrapper} from "@vue/test-utils";
import EmptyApp from "../components/EmptyApp.vue";
import {defineComponent} from "vue";
import {InputField, Form, config} from "../../../src/index";
import STORE from "../../../src/config/store";

const name = "created";
const label = "Created date"
function defineDateComponent(propsValues:any = {}) {
    return defineComponent({
        data:() => ({
            propsValues
        }),
        template: `<div><input-field v-bind = "propsValues" type = "date" name = "${name}" label = "${label}"/></div>`,
        components: {InputField}
    })
}
function defaultMount(component = defineDateComponent()) {
    return mount(EmptyApp, {
        slots: {
            default: component
        }
    })
}


describe("Input date", () => {
    let app: VueWrapper<any>
    let form: Form
    let input: DOMWrapper<HTMLInputElement>
    beforeEach(() => {
        app = defaultMount();
        form = (app.vm as any).form
        input = app.find('input')
    })
    test("By default input should be empty", () => {
        expect(input.element.value).toBe("")
    })
    test("Label should be displayed", () => {
        expect(app.text()).toBe(label + "YYYY/MM/DD")
    })
    test("Placeholder should be displayed", () => {
        const app = defaultMount(defineDateComponent({
            placeholder: "Input something"
        }))
        expect(app.text()).toBe( label + "Input something")
    })
    test("Default date", async () => {
        const today = new Date()
        form.setValues({
            created: today.toISOString()
        })
        await app.vm.$nextTick();

        expect(input.element.value).toBe(`${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}`)
    })
    test("Entering not full date dont has effect for form", async () => {
        const component = defineComponent({
            template: `<div><input-field type = "date" name = "created"/></div>`,
            components: {InputField}
        })
        const app = mount(EmptyApp, {slots: {default: component}});
        const form = (app.vm as any).form as Form;
        const input = app.get('input');
        await input.setValue('1998-10');
        await app.vm.$nextTick();

        expect(form.getValueByName('created')).toBe(null);

        await input.setValue('1998-10-13');
        expect(form.getValueByName('created')).toBe(new Date(1998, 9, 13).toISOString())
    })

    test("Calendar should be opened after icon click", async () => {
        const component = defineComponent({
            template: `<div><input-field name = "create" type = "date"/></div>`,
            components: {InputField}
        })
        const app = mount(EmptyApp, {slots: {default: component}});

        await app.vm.$nextTick();
        expect(app.find('.container-date-calendar').exists()).toBeFalsy()
        await app.get('.input-date-icon').trigger('click')
        await app.vm.$nextTick();

        expect(app.find('.container-date-calendar').exists()).toBe(true)
    })
    test("Calendar should be closed if icon was press twice", async () => {
        const component = defineComponent({
            template: `<div><input-field name = "created" type = "date"/></div>`,
            components: {InputField}
        })
        const app = mount(EmptyApp, { attachTo: document.body, slots: { default: component } });

        const getCalendar = () => app.find('.container-date-calendar');
        await app.vm.$nextTick();

        // Click to button - open calendar
        const button = app.get('.input-date-icon');
        await button.trigger('click');
        await app.vm.$nextTick()

        expect(getCalendar().exists()).toBe(true);
        await button.trigger('click'); // second button click - close calendar
        await app.vm.$nextTick()

        expect(getCalendar().exists()).toBe(false);

    })
    test("Calendar should show current date or selected date", async () => {
        const app = defaultMount();
        const form = (app.vm as any).form as Form;
        await app.vm.$nextTick();

        const button = app.get('.input-date-icon');
        await button.trigger('click');

        expect(app.find('.calendar-date_active').exists()).toBe(false);
        form.setValues({
            created: new Date().toISOString()
        })
        await app.vm.$nextTick();

        expect(app.find('.calendar-date_active').exists()).toBe(true);
        expect(app.find('.calendar-date_active').text()).toBe(new Date().getDate().toString());

    })

    test("Input date should has disabled effect", async () => {
        const component = defineComponent({
            template: `"<div><input-field type = "date" name = "created"/></div>"`,
            components: {InputField}
        })
        const app = mount(EmptyApp, {slots: {default: component}});
        const form = (app.vm as any).form as Form;
        form.disable();
        await app.vm.$nextTick();
        expect(app.get('input').element.disabled).toBe(true)
        form.enable();
        await app.vm.$nextTick();
        expect(app.get('input').element.disabled).toBe(false)
    })
    test("Input date should has error effect", async () => {
        const component = defineComponent({
            template: `<div><input-field type = "date" required name = "created"/></div>`,
            components: {InputField}
        })
        const app = mount(EmptyApp, {
            slots: {default: component}
        })
        const form = (app.vm as any).form as Form;

        expect(form.validate()).toBe(false);

        await app.vm.$nextTick();
        expect(app.get('.container-error-wrap').text()).toEqual(STORE.requiredMessage)

    })

    test("If mask was provided the input should display changed date", async () => {
        const app = defaultMount(defineDateComponent({
            mask: "YYYY_MM"
        }))
        const input = app.find('input');
        const form = (app.vm as any).form as Form

        const today = new Date()
        form.setValues({
            created: today.toISOString()
        })
        await app.vm.$nextTick();

        expect(input.element.value).toBe(`${today.getFullYear()}_${String(today.getMonth() + 1).padStart(2, '0')}`)
    })

    test("Если установлена конфигурация маски - показывать её", async () => {
        config({
            dateMask: "DD/MM"
        })
        const app = defaultMount(defineDateComponent({}))
        const input = app.find('input');
        const form = (app.vm as any).form as Form
        const today = new Date()
        form.setValues({
            created: today.toISOString()
        })
        await app.vm.$nextTick();
        await app.vm.$nextTick();
        await app.vm.$nextTick();
        expect(input.element.value).toBe(`${today.getDate()}/${String(today.getMonth() + 1).padStart(2, '0')}`)
    })
    test("", async () => {
        config({
            dateMask: "DD/MM"
        })
        const app = defaultMount(defineDateComponent({}))
        const input = app.find('input');
        const form = (app.vm as any).form as Form
        const today = new Date()
        console.log(today.toISOString())
        console.log("1900-01-09T21:29:43")
        form.setValues({
            created: "1900-01-09T21:29:43"
        })
        await app.vm.$nextTick();
        await app.vm.$nextTick();
        await app.vm.$nextTick();
        expect(input.element.value).toBe(`${today.getDate()}/${String(today.getMonth() + 1).padStart(2, '0')}`)

    })

})