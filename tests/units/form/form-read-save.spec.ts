import Form from "../../../src/classes/Form";
import wait from "../../wait";

describe("Form read/save", () => {
    
    test("Simple read", async () => {
        
        const form = new Form()
        const mockRead = jest.fn(v => v);
        form.read = () => new Promise(resolve => setTimeout(resolve.bind(null, {name: "Jack"}), 100));
        form.on(Form.EVENT_READ, mockRead)
        
        const promise = form.read();
        await wait();
        expect(form.wait).toBe(true);
        
        await wait(60);
        expect(form.wait).toBe(true);
        
        await promise;
        
        expect(form.wait).toBe(false);
        expect(mockRead.mock.calls.length).toBe(1);
        expect(mockRead.mock.results[0].value).toEqual({name: "Jack"});
    })
    test("Reading with child item", async () => {
        const form = new Form();
        const child = new Form({name: "address"});
        form.subscribe(child);
        const mockChild = jest.fn(v => v);
        const mockParent = jest.fn(v => v);
        child.read = () => new Promise(resolve => setTimeout(resolve.bind(null, {city: "Mogilev"}), 20));
        form.read = () => new Promise(resolve => setTimeout(resolve.bind(null,{username: "Jenesius", age: 24}), 100));
        
        form.on(Form.EVENT_READ, mockParent)
        child.on(Form.EVENT_READ, mockChild)
        
        const promise = form.read()
        
        await wait(4)
        
        expect(child.wait).toBe(true)
        expect(form.wait).toBe(true)
        
        await wait(40);
        expect(child.wait).toBe(false)
        expect(form.wait).toBe(true)
        
        await promise;
        
        expect(child.wait).toBe(false)
        expect(form.wait).toBe(false)
        
        expect(mockParent.mock.results.length).toBe(1)
        expect(mockParent.mock.results[0].value).toEqual({
            username: "Jenesius", age: 24
        })
        expect(mockChild.mock.results.length).toBe(1)
        expect(mockChild.mock.results[0].value).toEqual({
            city: "Mogilev"
        })
    })
    
})