import Form from "../../../src/classes/Form";

describe("Form validate", () => {
    
    test("Should return true if not validate functions was provided.", () => {
        const form = new Form();
        expect(form.validate()).toBe(true)
    })
    test("Should return false in first execute if child validate function return false", () => {
        const form = new Form();
        const child = {
            name: "address",
            count: -1,
            validate() {
                return this.count++ >= 0
            }
        }
        form.subscribe(child);
        expect(form.validate()).toBe(false);
        expect(form.validate()).toBe(true);
    })
    test("Should be true if all children return true", () => {
        const form = new Form();
        for(let i = 0; i < 10; i++) {
            form.subscribe({
                name: `dep-${i}`,
                validate() {
                    return true
                }
            })
        }
        expect(form.validate()).toBe(true)
    })
    test("Child form with children validation items", () => {
        const form = new Form();
        const child = new Form({
            name: "address"
        })
        form.subscribe(child)
        child.subscribe({
            name: "city",
            index: 0,
            validate() {
                console.log(this.index > 0)
                
                return this.index++ > 0
            }
        })
        
        expect(form.validate()).toBe(false)
        expect(form.validate()).toBe(true)
    })
    
})