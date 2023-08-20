import {mount} from "@vue/test-utils";
import EmptyApp from "./components/EmptyApp.vue";
import {defineComponent} from "vue";
import {InputField, Form} from "../../src/index";
import STORE from "../../src/config/store";
import wait from "../wait";

function defineDateComponent() {
    return defineComponent({
        template: '<div><input-field type = "date" name = "created"/></div>',
        components: {InputField}
    })
}
function defaultMount() {
    return mount(EmptyApp, {
        slots: {
            default: defineDateComponent()
        }
    })
}


describe("Input date", () => {
    test("Default date", async () => {
        const component = defineComponent({
            template: `
                <div>
                    <input-field type = "date" name = "created"/>
                </div>
            `,
            components: {InputField}
        })

        const app = mount(EmptyApp, {
            slots: {
                default: component
            }
        })
        const form = (app.vm as any).form as Form;
        const today = new Date()
        form.setValues({
            created: today.toISOString()
        })
        await app.vm.$nextTick();

        expect(app.get('input').element.value).toBe(`${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}`)
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

        expect(app.get('.container-date-calendar')).toBeTruthy()
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
})