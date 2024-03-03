import getOptionRowByDuration from "../../../src/utils/get-option-row-by-duration";

const red = {
	label: 'red', value: 'red'
}
const green = {
	label: 'green', value: 'green'
};
const yellow = {
	label: 'yellow', value: 'yellow'
};
const black = {
	label: 'black', value: 'black'
}
const options = [red, green, yellow, black];


describe("testing getOptionRowByDuration", () => {
	test("By default should return duration value if not value was provided", () => {
		const value = undefined;
		expect(getOptionRowByDuration(options, value, 0)).toBe(red)
		expect(getOptionRowByDuration(options, value, 1)).toBe(red)
		expect(getOptionRowByDuration(options, value, 2)).toBe(green)
		expect(getOptionRowByDuration(options, value, 3)).toBe(yellow)
	})
	test("If result duration less 0 should return the value from end", () => {
		expect(getOptionRowByDuration(options, undefined, -1)).toBe(black);
		expect(getOptionRowByDuration(options, undefined, -2)).toBe(yellow);
		expect(getOptionRowByDuration(options, undefined, -3)).toBe(green);
		expect(getOptionRowByDuration(options, undefined, -4)).toBe(red);
	})
	test("If result is more then length of options it should be div by options.length", () => {
		expect(getOptionRowByDuration(options, undefined, 5)).toBe(red);
		expect(getOptionRowByDuration(options, undefined, 5)).toBe(red);
		expect(getOptionRowByDuration(options, undefined, 6)).toBe(green);
		expect(getOptionRowByDuration(options, undefined, 7)).toBe(yellow);
	})
	test("If value was provided duration should be summed", () => {
		expect(getOptionRowByDuration(options, black.value, -1)).toBe(yellow);

		expect(getOptionRowByDuration(options, red.value, 1)).toBe(green);
		expect(getOptionRowByDuration(options, red.value, 2)).toBe(yellow);
		expect(getOptionRowByDuration(options, red.value, 5)).toBe(green);

		expect(getOptionRowByDuration(options, red.value, -1)).toBe(black);
		expect(getOptionRowByDuration(options, red.value, -2)).toBe(yellow);
		expect(getOptionRowByDuration(options, black.value, -2)).toBe(green);

	})
})