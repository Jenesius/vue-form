import {DOMWrapper, mount, VueWrapper} from "@vue/test-utils";
import EmptyApp from "../components/EmptyApp.vue";
import {defineComponent, h} from "vue";
import {InputField, Form, FormField} from "../../../src/index";
import STORE from "./../../../src/config/store";
import {FormFieldValidationCallback} from "../../../src/types";
import AppInputTextPretty from "../components/input-text/AppInputTextPretty.vue"

const name = 'username'
function defineTextComponent() {
    return defineComponent({
        template: `<div><form-field type = "text" name = "${name}" required label = "Username" /></div>`,
        components: {FormField}
    })
}
function defaultMount(component = defineTextComponent()) {
    return mount(EmptyApp, {
        slots: {
            default: component
        },
        attachTo: document.body
    })
}

describe("Input text", () => {
    let app: VueWrapper<any>;
    let form: Form
    let input: DOMWrapper<HTMLInputElement>
    beforeEach(() => {
        app = defaultMount()
        form = (app.vm as any).form
        input = app.find('input')
    })

    test("Default empty input-text", async () => {
        expect(input.element.value).toBe("")
    })
    test("Input-text by default should take value from form", async () => {
        form.setValues({
            username: "Jack"
        })
        await app.vm.$nextTick()
        expect(input.element.value).toBe("Jack")
    })
    test("Input-text be reactive input value", async () => {
        form.setValues({
            username: "Jack"
        })
        const input = app.get('input');
        await app.vm.$nextTick()
        expect(input.element.value).toBe("Jack");
        form.change({
            username: "TTT"
        })
        await app.vm.$nextTick()
        expect(input.element.value).toBe("TTT");
        form.setValues({
            username: "Jenesius"
        })
        await app.vm.$nextTick()
        expect(input.element.value).toBe("Jenesius")
    })
    test("Input-text should update form after entering data", async () => {
        await app.vm.$nextTick()
    
        const input = app.get('input');
        await input.setValue("TEST")
        expect(input.element.value).toBe("TEST")
        expect(form.getValueByName("username")).toBe("TEST")
    })
    test("By default input should be not disable", () => {
        const input = app.get('input');
        expect(form.checkFieldDisable('username')).toBe(false)
        expect(input.element.disabled).toBe(false)
    })
    test("Input should has disabled class after form.disable", async () => {
        await app.vm.$nextTick()
        form.disable()
        await app.vm.$nextTick()
        expect(input.element.disabled).toBe(true)
    })
    test("Input should remove disable class after form.enable", async () => {
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
        const app = defaultMount(component)
        const form = (app.vm as any).form as Form;
        form.setValues({
            username: "T"
        })

        await app.vm.$nextTick()
    
        const inputs = app.findAll('input');
        expect(inputs.map(a => a.element.value)).toEqual(["T", "T"])
    })
    test("Input-text with validation", async () => {
        const test:FormFieldValidationCallback[] = [
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
        // app.vm.loadingResource = true
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
        const test:FormFieldValidationCallback[] = [
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
        // app.vm.loadingResource = true
        await app.vm.$nextTick()
        
        const validateResult = form.validate()
        expect(validateResult).toBe(false);
        await app.vm.$nextTick();

        expect(app.find('.container-input-text_error').exists()).toBe(true);
        expect(app.text()).toBe(ERROR_TEXT);
        
        form.setValues({
            username: "Jack"
        })
        form.validate()
        await app.vm.$nextTick()
        
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
        // app.vm.loadingResource = true
        await app.vm.$nextTick()
        
        expect(form.validate()).toBe(false);

        await app.vm.$nextTick()
        
        expect(app.text()).toBe(STORE.requiredMessage);
        form.setValues({
            username: "PP"
        })
        expect(form.validate()).toBe(true);
        await app.vm.$nextTick()
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
        // app.vm.loadingResource = true
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
        const form = (app.vm as any).form as Form;
        //app.vm.loadingResource = true;
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
        const form = (app.vm as any).form as Form;
        
        //app.vm.loadingResource = true;
        await app.vm.$nextTick();
    
        const input = app.get("input");
        await input.setValue("jack")
        await app.vm.$nextTick();
        await app.vm.$nextTick()
        
        expect(form.getValueByName('name')).toBe("jack")
        expect(input.element.value).toBe('-jack-')
    
    
        await input.setValue("a")
        await app.vm.$nextTick()
        expect(form.getValueByName('name')).toBe("a")
        expect(input.element.value).toBe("-a-")
    
        await input.setValue("")
        await app.vm.$nextTick()
        expect(form.getValueByName('name')).toBe("")
        expect(input.element.value).toBe("")
    })
    test("Pretty and modify should be executed once", async () => {
        const pretty = (x: any) => x;
        const modify = (x: any) => x;
        
        const mockPretty = jest.fn(pretty)
        const mockModify = jest.fn(modify)

        const component = defineComponent({
            setup() {
                return () => h("div", [
                    h(InputField, {
                        name: "username",
                        modify: mockModify,
                        pretty: mockPretty
                    })
                ])
            },
        })
        const app = mount(EmptyApp, {
            slots: {
                default: component
            }
        })
        const form = (app.vm as any).form as Form;
        //app.vm.loadingResource = true;
        await app.vm.$nextTick()

        const input = app.get('input');
        
        await input.setValue("123");
        await app.vm.$nextTick()
        
        expect(input.element.value).toBe("123")
        expect(form.getValueByName('username')).toBe("123")
        expect(mockModify.mock.calls.length).toBe(1)
        // 2 because function use for default(empty value)
        // and then for new value("123")
        expect(mockPretty.mock.calls.length).toBe(2)
        
        
    })
    test("Max length attr should limit the length of value", async () => {
        const component = defineComponent({
            template: `<div><input-field name = "test" maxlength = "6" /></div>`,
            components: {InputField}
        })
        const app = mount(EmptyApp, {
            slots: {
                default: component
            }
        })
        //app.vm.loadingResource = true;
        await app.vm.$nextTick();
        const form = (app.vm as any).form as Form
        
        const input = app.get("input");
        await input.setValue("12345678910")
        await app.vm.$nextTick()
        
        expect(form.getValueByName("test")).toBe("123456");
        expect(input.element.value).toBe("123456")
    })
    test("Prefix should be shown if provided", async () => {
        const component = defineComponent({
            template: `<div><input-field name = "test" prefix = "qwerty" /></div>`,
            components: {InputField}
        })
        const app = mount(EmptyApp, {
            slots: {
                default: component
            }
        })
        // app.vm.loadingResource = true;
        await app.vm.$nextTick();
        
        
        expect(app.text()).toBe("qwerty")
    })
    test("Placeholder in input should be shown if provided", () => {
        const component = defineComponent({
            template: `<div><input-field name = "test" placeholder = "Testing" /></div>`,
            components: {InputField}
        })
        const app = mount(EmptyApp, {
            slots: {
                default: component
            }
        })
        // app.vm.loadingResource = true;
        const input = app.get("input");
    
        expect(input.element.placeholder).toBe("Testing")
    })
    test("Numeric attr should return only numeric value and reject entering chars", async () => {
        const component = defineComponent({
            template: `<div><input-field name = "age" numeric /></div>`,
            components: {InputField}
        })
        const app = mount(EmptyApp, {
            slots: {
                default: component
            }
        })
        // app.vm.loadingResource = true;
        await app.vm.$nextTick();
        const form = (app.vm as any).form as Form
    
        const input = app.get("input");
        await input.setValue("Jenesius 24")
        await app.vm.$nextTick()
    
        expect(form.getValueByName("age")).toBe(24);
        expect(input.element.value).toBe("24")
        
    })
    test("Empty value for undefined value in form", async () => {
        form.setValues({
            [name]: undefined
        })
        await app.vm.$nextTick()
        
        expect(form.getValueByName(name)).toBe(undefined);
        expect(input.element.value).toBe("")
        
    })
})