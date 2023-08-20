import Form from "../../../src/classes/Form";
import wait from "../../wait";

describe("Form read/save", () => {
    /**
     * READ
     * */
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
    test("Wait in parent should be true until child stay in wait status", async () => {
        const form = new Form();
        const child = new Form({
            name: "address"
        });
        
        form.subscribe(child);
        
        child.read = () => wait(100);
        
        const promise = form.read();
        await wait(10);
        expect(form.wait).toBe(true)
        expect(child.wait).toBe(true);
        
        await promise;
        
        expect(form.wait).toBe(false)
        expect(child.wait).toBe(false)
    })
    test("Rejecting request should turn wait to false", async () => {
        const form = new Form();
        
        form.read = () =>new Promise((resolve, reject) => setTimeout(reject.bind(null, new Error("Yps")), 20));
        const promise = form.read();
        
        
        await wait(1);
        expect(form.wait).toBe(true);
        await expect(promise).rejects.toEqual(new Error('Yps'))
        expect(form.wait).toBe(false)
    })
    test("Rejecting request at child should turn wait to false", async () => {
        const form  = new Form();
        const child = new Form({name: "address"});
        form.subscribe(child)
        child.read = () =>new Promise((resolve, reject) => setTimeout(reject.bind(null, new Error("Test")), 20));
    
        const promise = form.read();
        await wait(5);
        expect(form.wait).toBe(true);
        expect(child.wait).toBe(true);
        await expect(promise).rejects.toEqual(new Error("Test"))
        expect(form.wait).toBe(false)
        expect(child.wait).toBe(false)
    })
    test("Child wait should be set to true firstly than parent wait", async () => {
        const form  = new Form();
        const child = new Form({name: "address"});
        form.subscribe(child)
        child.read = () =>new Promise((resolve, reject) => setTimeout(resolve, 20));
        form.read = () =>new Promise((resolve, reject) => setTimeout(resolve, 100));
    
        const promise = form.read();
        await wait(5);
        expect(form.wait).toBe(true);
        expect(child.wait).toBe(true);
        
        await wait(50);
        expect(child.wait).toBe(false);
        expect(form.wait).toBe(true);
        
        await promise;
        expect(form.wait).toBe(false)
        expect(child.wait).toBe(false)
    })
    /**
     * SAVE
     * */
    test("Simple save", async () => {
        const form = new Form()
        const mockSave = jest.fn(v => v);
        form.save = () => new Promise(resolve => setTimeout(resolve.bind(null, {version: 4}), 100));
        form.on(Form.EVENT_SAVE, mockSave)
    
        const promise = form.save();
        await wait();
        expect(form.wait).toBe(true);
    
        await wait(60);
        expect(form.wait).toBe(true);
    
        await promise;
    
        expect(form.wait).toBe(false);
        expect(mockSave.mock.calls.length).toBe(1);
        expect(mockSave.mock.results[0].value).toEqual({version: 4});
    })
    test("Changes must be clean after save was success, and values should be mixed with changes", async () => {
        const form = new Form();
        form.change({
            name: "Jack"
        })
        await form.save();
        expect(form.values).toEqual({
            name: "Jack"
        })
        expect(form.changes).toEqual({})
        expect(form.changed).toBe(false)
    })
    test("Saving with child item", async () => {
        const form = new Form();
        const child = new Form({name: "address"});
        form.subscribe(child);
        const mockChild = jest.fn(v => v);
        const mockParent = jest.fn(v => v);
        child.save = () => new Promise(resolve => setTimeout(resolve.bind(null, {version: 1}), 20));
        form.save = () => new Promise(resolve => setTimeout(resolve.bind(null,{version: 4}), 100));
    
        form.on(Form.EVENT_SAVE, mockParent)
        child.on(Form.EVENT_SAVE, mockChild)
    
        const promise = form.save()
    
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
            version: 4
        })
        expect(mockChild.mock.results.length).toBe(1)
        expect(mockChild.mock.results[0].value).toEqual({
            version: 1
        })
    })
    test("Parent should stay in wait status until child status in wait", async () => {
        const form = new Form();
        const child = new Form({
            name: "address"
        });
    
        form.subscribe(child);
    
        child.save = () => wait(100);
    
        const promise = form.save();
        await wait(10);
        expect(form.wait).toBe(true)
        expect(child.wait).toBe(true);
    
        await promise;
    
        expect(form.wait).toBe(false)
        expect(child.wait).toBe(false)
    })
    test("Rejecting request until save until save should turn wait to false", async () => {
        const form = new Form();
    
        form.save = () =>new Promise((resolve, reject) => setTimeout(reject.bind(null, new Error('save reject')), 20));
    
        const promise = form.save();
        await wait(1);
        expect(form.wait).toBe(true);
        await expect(promise).rejects.toEqual(new Error('save reject'))
        expect(form.wait).toBe(false)
    })
    test("Rejecting request until save at child should turn wait to false", async () => {
        const form  = new Form();
        const child = new Form({name: "address"});
        form.subscribe(child)
        
        // Reject request
        child.save = () => new Promise((resolve, reject) => setTimeout(reject.bind(null, "Error from Child"), 20));
    
        // Save execution
        const promise = form.save();
        await wait(1);
        expect(form.wait).toBe(true);
        expect(child.wait).toBe(true);
        
        // Await until all save methods will be executed.
        await expect(promise).rejects.toBe("Error from Child");
        
        expect(form.wait).toBe(false)
        expect(child.wait).toBe(false)
    })
    test("Rejecting request not execute revert function", async () => {
        const form = new Form();
        form.change({
            name: "Jack"
        })
        form.save = () =>new Promise((resolve, reject) => setTimeout(reject, 20));
    
        await expect(form.save()).rejects.toBe(undefined);
    
        expect(form.changes).toEqual({
            name: "Jack"
        })
        expect(form.changed).toBe(true)
    })
    /**
     * Тест используется в том случае, когда дочерний элемент является обособленным от родителя. В таком случае он имеет
     * свой набор значений, которым пользуется самостоятельно.
     * */
    test("Rejecting request at child will not execute child's revert function", async () => {
        
        const form = new Form();
        const child = new Form({name: "test"});
        form.change({
            name: "Jack"
        })
        form.subscribe(child);
    
        // Reject request
        child.save = () => new Promise((resolve, reject) => setTimeout(reject.bind(null, "Error from Child"), 20));
    
        // Save execution
        await expect(form.save()).rejects.toBe("Error from Child")
        expect(form.changes).toEqual({name: "Jack"})
        
    })
    test("Объект сохранений должен доходить до родительского, если в дочернем нет save", async () => {
        const form = new Form();
        const child = new Form({
            name: "address"
        })
        form.subscribe(child);

        const mockSave = jest.fn(() => {
            return JSON.parse(JSON.stringify(form.changes))
        });

        child.change({
            x: 1,
            y: 2
        })

        form.save = mockSave

        await form.save();

        expect(mockSave.mock.results.length).toBe(1);
        expect(mockSave.mock.results[0].value).toEqual({
            address: {
                x: 1, y: 2
            }
        });

    })
})