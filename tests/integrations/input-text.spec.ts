import {mount} from "@vue/test-utils";
import EmptyApp from "./components/EmptyApp.vue";
import Form from "../../src/classes/Form";
import {defineComponent} from "vue";
import {InputField} from "../../src//index";
import wait from "../wait";
import {FormInputValidationCallback} from "@/types";
import STORE from "../../src/config/store";
import AppInputTextPretty from "./components/input-text/AppInputTextPretty.vue"

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
    test("Input should has disabled class after form.disable", async () => {
        const component = defineComponent({
            template: `<div><input-field name = "username"/></div>`,
            components: {InputField}
        })
        const app = mount(EmptyApp, {
            slots: {
                default: component
            },
        });
    
        // update prop, and wait a tick to allow it to take effect
        app.vm.loadingResource = true
        await app.vm.$nextTick()
        
        const form = (app.vm as any).form as Form;
        form.disable()
        
        await wait(100)
        
        const input = app.get('input');
        
        console.log(input.element.name, input.element.classList)
        
        expect(input.element.disabled).toBe(true)
    })
    test("Input should remove disable class after form.enable", async () => {
        const component = defineComponent({
            template: `<input-field name = "username"/>`,
            components: {InputField}
        })
        const app = mount(EmptyApp, {
            slots: {
                default: component
            },
        });
        // update prop, and wait a tick to allow it to take effect
        app.vm.loadingResource = true
        await app.vm.$nextTick()
        
        const form = (app.vm as any).form as Form;
        const input = app.get('input');
    
        form.disable()
        await app.vm.$nextTick()
        expect(input.element.disabled).toBe(true)
        form.enable()
        await app.vm.$nextTick()
        expect(input.element.disabled).toBe(false)
    })
    test("Two fields must show the equal values", async () => {
        const component = defineComponent({
            template: `<div><input-field name = "username"/> <input-field name="username"/></div>`,
            components: {InputField}
        })
        const app = mount(EmptyApp, {
            slots: {
                default: component
            },
        });
        const form = (app.vm as any).form as Form;
        form.setValues({
            username: "T"
        })
    
        await wait()
    
        const inputs = app.findAll('input');
        expect(inputs.map(a => a.element.value)).toEqual(["T", "T"])
    })
    
    test("Input-text with validation", async () => {
        const test:FormInputValidationCallback[] = [
            x => x !== 'Jack'
        ];
        const component = defineComponent({
            template: `<div>
                <input-field name = "username" :validation = "${test}"/>
            </div>`,
            components: {InputField}
        })
        const app = mount(EmptyApp, {
            slots: {
                default: component
            },
        });
        const form = (app.vm as any).form as Form;
        app.vm.loadingResource = true
        await app.vm.$nextTick()
        
        expect(form.validate()).toBe(true);
        form.setValues({
            username: "Jack"
        })

        await app.vm.$nextTick()
        
        expect(form.validate()).toBe(false);
        form.setValues({
            username: "Jack-1"
        })
        await app.vm.$nextTick()
        expect(form.validate()).toBe(true)
    })
    test("Input should has error effect when one of validation was rejected", async () => {
        const ERROR_TEXT = 'Jack is rejected'
        const test:FormInputValidationCallback[] = [
            x => x === 'Jack' ? true : 'Jack is rejected'
        ];
        const component = defineComponent({
            template: `<div><input-field name = "username" :validation = "${test}"/></div>`,
            components: {InputField}
        })
        const app = mount(EmptyApp, {
            slots: {
                default: component
            },
        });
        const form = (app.vm as any).form as Form;
        app.vm.loadingResource = true
        await app.vm.$nextTick()
        
        const validateResult = form.validate()
        expect(validateResult).toBe(false);
        await app.vm.$nextTick();
        await wait()
        expect(app.find('.container-input-text_error').exists()).toBe(true);
        expect(app.text()).toBe(ERROR_TEXT);
        
        form.setValues({
            username: "Jack"
        })
        form.validate()
        await app.vm.$nextTick()
        await wait()
        
        expect(app.find('.container-input-text_error').exists()).toBe(false);
        expect(app.text()).toBe("");
    })
    test("Input that required param should has required label and should be validation reject if empty", async () => {
        const component = defineComponent({
            template: `<div><input-field name = "username" required/></div>`,
            components: {InputField}
        })
        const app = mount(EmptyApp, {
            slots: { default: component },
        });
        const form = (app.vm as any).form as Form;
        app.vm.loadingResource = true
        await app.vm.$nextTick()
        
        expect(form.validate()).toBe(false);
        
        await wait();
        
        expect(app.text()).toBe(STORE.requiredMessage);
        form.setValues({
            username: "PP"
        })
        expect(form.validate()).toBe(true);
        await wait()
        expect(app.text()).toBe("")
    })
    test("If label is provided it should be visible", async () => {
        const component = defineComponent({
            template: `<div><input-field name = "username" label = "Your name"/></div>`,
            components: {InputField}
        })
        const app = mount(EmptyApp, {
            slots: { default: component },
        });
        const form = (app.vm as any).form as Form;
        app.vm.loadingResource = true
        await app.vm.$nextTick()
    
        expect(app.text()).toBe("Your name");
    });
    test("Input that has modify should edit value after input", async () => {
        // Функция для модифицирования номера автобуса, функция удаляет всё кроме букв и вставляет -, после первых двух.
        // AABBCC -> AA-BBCC
        const modify = (x: unknown) => {
            if (typeof x !== 'string') return '';
            let str = x.replaceAll(/[^A-Z]/g, '');
            str = str.slice(0, 6);
            if (str.length < 6) return str;
            return `${str.slice(0, 2)}-${str.slice(2, 6)}`
        }
        const component = defineComponent({
            template: `<div><input-field name = "bus-number" :modify = "${modify}"/></div>`,
            components: {
                InputField
            }
        })
        const app = mount(EmptyApp, {
            slots: {
                default: component
            }
        })
        const form = app.vm.form as Form;
        app.vm.loadingResource = true;
        await app.vm.$nextTick();
        
        const input = app.get("input");
        await input.setValue("123")
        expect(form.getValueByName('bus-number')).toBe("")
    
        await input.setValue("A1A2B3BC55")
        expect(form.getValueByName('bus-number')).toBe("AABBC")
    
        await input.setValue("AABBCC")
        expect(form.getValueByName('bus-number')).toBe("AA-BBCC")
    })
    test("Input that has pretty should prettify just view-value, not value in form", async () => {

        const app = mount(AppInputTextPretty)
        const form = app.vm.form as Form;
        
        //app.vm.loadingResource = true;
        await app.vm.$nextTick();
    
        const input = app.get("input");
        await input.setValue("jack")
        await app.vm.$nextTick();
        await wait()
        
        expect(form.getValueByName('name')).toBe("jack")
        expect(input.element.value).toBe('-jack-')
    
    
        await input.setValue("a")
        await wait()
        expect(form.getValueByName('name')).toBe("a")
        expect(input.element.value).toBe("-a-")
    
        await input.setValue("")
        await wait()
        expect(form.getValueByName('name')).toBe("")
        expect(input.element.value).toBe("")
    })
    test("Pretty and modify should be executed once", async () => {
        const pretty = (x: any) => x;
        const modify = (x: any) => x;
        
        const mockPretty = jest.fn(pretty)
        const mockModify = jest.fn(modify)

        const component = defineComponent({
            // @ts-ignore
            template: `<div><input-field name = "username" :modify = "${(x) => mockModify(x)}" :pretty = "${(x) => mockPretty(x)}"/></div>`,
            components: {
                InputField
            }
        })
        const app = mount(EmptyApp, {
            slots: {
                default: component
            }
        })
        const form = app.vm.form as Form;
        app.vm.loadingResource = true;
        await app.vm.$nextTick()
        const input = app.get('input');
        
        await input.setValue("123");
        await app.vm.$nextTick()
        await wait()
        
        
        expect(input.element.value).toBe("123")
        expect(form.getValueByName('username')).toBe("123++++++++++")
        expect(mockPretty.mock.calls.length).toBe(1)
        expect(mockModify.mock.calls.length).toBe(1)
        
        
    })
    test("Max length attr should limit the length of value", () => {})
    test("Placeholder in input should be shown if provided", () => {})
    test("Prefix should be shown if provided", () => {})
    test("Numeric attr should return only numeric value and reject entering chars", () => {
        const form:any = null;
        
        expect(form.getValueByName('age')).toBe(24);
    })
})