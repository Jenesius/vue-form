import copyObject from "../../plugin/utils/copy-object";

describe("Copy object test", () => {
    it('should primitive', function () {
        expect(copyObject({a: 1})).toEqual({a: 1})
    });
    it(`Should be copy of not primitive value`, function () {
        expect(copyObject({address: {name: "test"}})).toEqual({address: {name: "test"}})
    })
    it('should copy, not changes after update input object', function () {
        const input:any = {
            address: { city: { code: 1 } }
        }
        const copy = copyObject(input);
        input.address.city = 'Berlin';
        expect(copy).toEqual({address: { city: { code: 1 } }})
    });
})