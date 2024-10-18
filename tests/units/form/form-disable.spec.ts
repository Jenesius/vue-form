import Form from "../../../src/classes/Form";
import useFormState from "@/hooks/use-form-state";

describe("Test for check disabled/enabled state", () => {
    it('should be enabled by default', function () {
        const form = new Form();
        expect(form.disabled).toBe(false)
        expect(form.enabled).toBe(true)
    });
    it('should be disabled = true, after invoke form.disable', function () {
        const form = new Form()
        form.disable();
        expect(form.enabled).toBe(false)
        expect(form.disabled).toBe(true)
    });
    it('should be disabled = false, after invoke disable and then enable', function () {
        const form = new Form()
        form.disable();
        form.enable();
        expect(form.disabled).toBe(false)
        expect(form.enabled).toBe(true)
    });
    it("should disabled just one field, not full form", () => {
        const form = new Form();
        form.disable("address");
        expect(form.enabled).toBe(true);
    })
    it("Field should be disabled if parent field is disabled", () => {
        const form = new Form();
        form.disable("address");
        expect(form.checkFieldDisable("address.city")).toBe(true)
    })
    it("Field should be enable if grandparent is disabled, but parent is enable", () => {
        const form = new Form();
        form.disable("address");
        form.enable("address.city");
        expect(form.checkFieldDisable("address.city.name")).toBe(false)
    })
    it("Children form's field should be disabled", () => {
        const form = new Form();
        form.disable("address.city");
        const child = new Form({
            name: "address"
        })
        form.subscribe(child)
        
        expect(child.checkFieldDisable("city")).toBe(true)
    })
    it("Children form's field Should enable", () => {
        const form = new Form();
        form.disable("address.city");
        form.enable("address.city.location");
        const child = new Form({
            name: "address.city"
        })
        form.subscribe(child)
    
        expect(child.checkFieldDisable("location")).toBe(false)
    })
    it("Child form should disabled by name if in parent current name was marked like disabled", () => {
        const form = new Form();
        const child = new Form({name: "address.city"})
        form.subscribe(child)
        form.disable("address");
        expect(child.disabled).toBe(true)
    })
    it("Child form should enabled by name if in parent current name was marked like enabled", () => {
        const form = new Form();
        const child = new Form({name: "address.city.name"})
        form.subscribe(child)
        form.disable("address");
        form.enable("address.city");
        expect(child.enabled).toBe(true)
    })
    it("Disable full form", () => {
        const form = new Form();
        form.disable()
        expect(form.checkFieldDisable("address")).toBe(true)
    })
    it("Enable full form", () => {
        const form = new Form();
        form.disable()
        form.enable()
        expect(form.checkFieldDisable("address")).toBe(false)
    })
    
    it("Disable child form", () => {
        const form = new Form();
        const child = new Form({name: "address"});
        form.subscribe(child);
        
        child.disable();
        expect(form.checkFieldDisable("address.city")).toBe(true)
        expect(child.disabled).toBe(true)
        expect(form.disabled).toBe(false)
    })
    it("Enable child form", () => {
        const form = new Form();
        const child = new Form({name: "address"})
        form.subscribe(child);
        form.disable()
        child.enable()
        
        expect(child.enabled).toBe(true)
        expect(child.checkFieldDisable("name")).toBe(false)
    })
    
    it("Field should be enabled in child form.", () => {
        const form = new Form();
        form.disable("username")
        const child = new Form({name: "address"});
        
        expect(child.checkFieldDisable("city")).toBe(false)
    })
    it("Field should be disabled in child form.", () => {
        const form = new Form();
        form.disable("address.city")
        const child = new Form({name: "address"});
    
        expect(child.checkFieldDisable("city")).toBe(false)
    });
    it("Enable parent form should clean all disable fields", () => {
        const form = new Form();
        form.disable(["address", "username"])
        expect(form.checkFieldDisable("address.city")).toBe(true);
        form.enable();
        expect(form.checkFieldDisable("address")).toBe(false)
        expect(form.checkFieldDisable("username")).toBe(false)
    })
    it("Функция обратного вызова должна быть запущена, после того, как соответствующее поле было заблокировано/разблокировано", () => {
        const form = new Form();
        const mockAvailability = jest.fn(v => v);
        form.onavailable("address", mockAvailability);
        form.disable("address");
        form.enable("address");
        
        expect(form.checkFieldDisable("address")).toBe(false);
        expect(mockAvailability.mock.calls.length).toBe(2);
        expect(mockAvailability.mock.results[0].value).toBe(false)
        expect(mockAvailability.mock.results[1].value).toBe(true)
    })
    it("Функция обратного вызова должна быть вызвана лишь раз, после того, как сработал disable всей формы", () => {
        const form = new Form();
        const mockAvailability = jest.fn(v => v);
        form.onavailable("address", mockAvailability);
        form.disable();
        
        expect(mockAvailability.mock.results.length).toBe(1);
        expect(mockAvailability.mock.results[0].value).toBe(false);
    })
    it("Функция обратного вызова не должна быть вызвана, если состояние поля не изменилось", () => {
        const form = new Form();
        const mockAvailability = jest.fn(v => v);
        form.onavailable("address", mockAvailability);
        form.disable("username");
        
        expect(mockAvailability.mock.results.length).toBe(0)
    })
    it("Функция обратного вызова не должна быть вызвана, если поле и так было уже заблокировано, а разблокировка идёт только дочернего поля", () => {
        const form = new Form();
        const mockAvailability = jest.fn(v => v);
        form.disable("address");
        form.onavailable("address", mockAvailability);
        form.enable("address.city")
        
        expect(mockAvailability.mock.results.length).toBe(0)
    })
    it("Callback должен вызываться из дочернего элемента, когда в родительском доступность этого поля изменилась", () => {
        const form = new Form()
        const child = new Form({name: "address"});
        form.subscribe(child);
        const mockAvailability = jest.fn(v => v)
        child.onavailable("city", mockAvailability);
        
        form.disable("city");
        expect(mockAvailability.mock.results.length).toBe(0);
        form.disable("address");
        expect(mockAvailability.mock.results.length).toBe(1);
        expect(mockAvailability.mock.results[0].value).toBe(false);
        
    })
    it("Callback должен вызываться в родительском элементе для дочернего поля, если в дочернем был вызван disable", () => {
        const form = new Form();
        const child = new Form({name: "address"});
        form.subscribe(child);
        const mockAvailability = jest.fn(v => v)
        form.onavailable("address", mockAvailability)
        
        child.disable();
        expect(mockAvailability.mock.results.length).toBe(1);
        expect(mockAvailability.mock.results[0].value).toBe(false);
    })
    it("Callback нацеленный на всю форму, должен быть вызван, когда блокируется форма", () => {
        const form = new Form();

        const mockDisable = jest.fn(v => v);
        form.onavailable(mockDisable);

        form.disable();
        expect(mockDisable.mock.results.length).toBe(1);
        expect(mockDisable.mock.results[0].value).toBe(false);
        form.enable();
        expect(mockDisable.mock.results.length).toBe(2);
        expect(mockDisable.mock.results[1].value).toBe(true);
    })
    it('should be changed after enable/disable', function () {
        const form = new Form();

        expect(form.disabled).toBe(false)
        form.disable()
        expect(form.disabled).toBe(true)
        form.enable()
        expect(form.disabled).toBe(false)
    });
    it("Callback нацеленный на всю форму, должен быть вызван в дочернем элементе, когда блокируется форма", () => {
        const form = new Form();
        const child = new Form({
            name: "address",
        })
        form.subscribe(child);

        const mockDisable = jest.fn(v => v);
        child.onavailable(mockDisable);

        form.disable();
        expect(mockDisable.mock.results.length).toBe(1);
        expect(mockDisable.mock.results[0].value).toBe(false);
        form.enable();
        expect(mockDisable.mock.results.length).toBe(2);
        expect(mockDisable.mock.results[1].value).toBe(true);
    })
    
    test("Autonomic form: children enable has not effect to parent", () => {
        const parent = new Form();
        const child = new Form({
            name: "test",
            parent,
            autonomic: true
        });
        
        child.disable("test");
        
        expect(parent.checkFieldDisable('test')).toBe(false);
        expect(child.checkFieldDisable('test')).toBe(true);
        expect(child.disabled).toBe(false);
    })
    test("Autonomic form: parent enable/disable has not effect to children", () => {
        const parent = new Form();
        const child = new Form({
            name: "test",
            parent,
            autonomic: true
        });
        
        parent.disable("test");
        
        expect(parent.checkFieldDisable('test')).toBe(true);
        expect(child.checkFieldDisable('test')).toBe(false);
        expect(child.disabled).toBe(false);
    })
    
    test("Autonomic form: parent full disable has no effect for child", () => {
        const parent = new Form();
        const child = new Form({
            name: "test",
            parent,
            autonomic: true
        });
        
        parent.disable()
        
        expect(parent.disabled).toBe(true);
        expect(child.disabled).toBe(false);
    })
    
})