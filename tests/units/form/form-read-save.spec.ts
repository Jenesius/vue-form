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
    
})