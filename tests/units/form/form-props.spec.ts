import Form from "../../../src/classes/Form";

describe("Form props", () => {
    test("Id trigger", () => {
        const form = new Form();
        const mockUpdate = jest.fn(v => v);
        form.on(Form.EVENT_ID, mockUpdate)
        form.id = 123;
        
        expect(form.id).toBe(123)
        expect(mockUpdate.mock.results.length).toBe(1)
        expect(mockUpdate.mock.results[0].value).toBe(123)
    })
    test("Version trigger", () => {
        const form = new Form();
        const mockUpdate = jest.fn(v => v);
        form.on(Form.EVENT_VERSION, mockUpdate)
        form.version = 2;
        form.version = 3;
        
        expect(form.version).toBe(3)
        expect(mockUpdate.mock.results.length).toBe(2)
        expect(mockUpdate.mock.results[0].value).toBe(2)
        expect(mockUpdate.mock.results[1].value).toBe(3)
    })
    test("Wait trigger", () => {
        const form = new Form();
        const mockUpdate = jest.fn(v => v);
        form.on(Form.EVENT_WAIT, mockUpdate)
        form.wait = true;
        
        expect(form.wait).toBe(true)
        expect(mockUpdate.mock.results.length).toBe(1)
        expect(mockUpdate.mock.results[0].value).toBe(true)
    })
})