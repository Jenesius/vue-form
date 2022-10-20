import iteratePoints from "../../plugin/utils/iterate-points";

describe("iterate-points", () => {
    it('should be array of one point', function () {
        const result = iteratePoints({a: 1});
        expect(result).toEqual([{name: 'a', value: 1}])
    });
    it ('should be array of 3 points. One point is not primitive', () => {
        const result = iteratePoints({a: 1, city: {code: 2}});
        expect(result).toEqual([{name: 'a', value: 1}, {name: 'city', value : {code: 2}}, {name: 'city.code', value: 2}])
    })
})