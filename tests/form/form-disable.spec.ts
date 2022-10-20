import Form from "../../plugin/classes/Form";

describe("Test for check disabled/enabled state", () => {

    it('should be enable by default', function () {
        const form = new Form();
        expect(form.disabled).toBe(false)
    });

    it('should be disabled = true, after invoke form.disable', function () {
        const form = new Form()
        form.disable();
        expect(form.disabled).toBe(true)
    });

    it('should be disabled = false, after invoke disable and then enable', function () {
        const form = new Form()
        form.disable();
        form.enable();
        expect(form.disabled).toBe(false)
    });
})