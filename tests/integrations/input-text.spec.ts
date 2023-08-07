import {mount} from "@vue/test-utils";
import EmptyApp from "./components/EmptyApp.vue";
import Form from "../../src/classes/Form";
import {defineComponent} from "vue";
import {InputField} from "../../src//index";
import wait from "../wait";

describe("Input text", () => {
    test("Default empty input-text", async () => {
        const component = defineComponent({
            template: `<input-field name = "username"/>`,
            components: {InputField}
        })
        const app = mount(EmptyApp, {
            slots: {
                default: component
            },
        });
    
        await wait()
        
        const input = app.get('input');
        expect(input.element.value).toBe("")
    })
    test("Input-text by default should take value from form", async () => {
        const component = defineComponent({
            template: `<input-field name = "username"/>`,
            components: {InputField}
        })
        const app = mount(EmptyApp, {
            slots: {
                default: component
            },
        });
        const form = (app.vm as any).form as Form;
        form.setValues({
            username: "Jack"
        })
    
        await wait()
    
        const input = app.get('input');
        expect(input.element.value).toBe("Jack")
    })
    test("Input-text be reactive input value", async () => {
        const component = defineComponent({
            template: `<input-field name = "username"/>`,
            components: {InputField}
        })
        const app = mount(EmptyApp, {
            slots: {
                default: component
            },
        });
        const form = (app.vm as any).form as Form;
        form.setValues({
            username: "Jack"
        })
        const input = app.get('input');
        await wait()
        expect(input.element.value).toBe("Jack");
        form.change({
            username: "TTT"
        })
        await wait()
        expect(input.element.value).toBe("TTT");
        form.setValues({
            username: "Jenesius"
        })
        await wait()
        expect(input.element.value).toBe("Jenesius")
    })
    
    test("Input-text should update form after entering data", async () => {
        const component = defineComponent({
            template: `<input-field name = "username"/>`,
            components: {InputField}
        })
        const app = mount(EmptyApp, {
            slots: {
                default: component
            },
        });
        const form = (app.vm as any).form as Form;
    
        await wait()
    
        const input = app.get('input');
        await input.setValue("TEST")
        expect(input.element.value).toBe("TEST")
        expect(form.getValueByName("username")).toBe("TEST")
    })
    
    test("By default input should be not disable", () => {
        const component = defineComponent({
            template: `<input-field name = "username"/>`,
            components: {InputField}
        })
        const app = mount(EmptyApp, {
            slots: {
                default: component
            },
        });
        const form = (app.vm as any).form as Form;
        const input = app.get('input');
        expect(form.checkFieldDisable('username')).toBe(false)
        expect(input.element.disabled).toBe(false)
    })
    test("Input should has disabled class after form.disable", () => {
        const component = defineComponent({
            template: `<input-field name = "username"/>`,
            components: {InputField}
        })
        const app = mount(EmptyApp, {
            slots: {
                default: component
            },
        });
        const form = (app.vm as any).form as Form;
        form.disable()
        
        wait(100)
        
        const input = app.get('input');
        
        console.log(input.element.name, input.element.classList)
        
        expect(input.element.disabled).toBe(true)
    })
    test("Input should remove disable class after form.enable", () => {
        const component = defineComponent({
            template: `<input-field name = "username"/>`,
            components: {InputField}
        })
        const app = mount(EmptyApp, {
            slots: {
                default: component
            },
        });
        const form = (app.vm as any).form as Form;
        const input = app.get('input');
    
        form.disable()
        expect(input.element.disabled).toBe(true)
        form.enable()
        expect(input.element.disabled).toBe(false)
    })
})