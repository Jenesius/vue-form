import DateController from "../../../src/controllers/date-controller";

describe("Date controller", () => {
	test("Date Month should be start with one", () => {
		expect(DateController.ConvertToDate('13-12-1998', 'dd-mm-yyyy'))
		.toEqual(
			new Date(1998, 11, 13)
		)
	})
	test("Date validate should return true if mask is validated.", () => {
		expect(DateController.ValidateMask('yyyy')).toBe(true)
		expect(DateController.ValidateMask('mm-dd')).toBe(true)
		expect(DateController.ValidateMask('yyyy/dd/mm')).toBe(true)
		expect(DateController.ValidateMask('mm_dd')).toBe(true)
		expect(DateController.ValidateMask('MM')).toBe(true)
		expect(DateController.ValidateMask('HH    MM')).toBe(true)
		expect(DateController.ValidateMask('yyyy MM HH yyyy MM HH')).toBe(true)
		expect(DateController.ValidateMask('dd/////HH')).toBe(true)
		expect(DateController.ValidateMask('HH')).toBe(true)
		expect(DateController.ValidateMask('MM')).toBe(true)
		expect(DateController.ValidateMask('mm MM')).toBe(true)
		expect(DateController.ValidateMask('')).toBe(true)
		expect(DateController.ValidateMask('00000')).toBe(true)
	})
	test("Date validate should throw Error if provided mask is incorrect", () => {
		expect(() => DateController.ValidateMask('hh')).toThrow();
		expect(() => DateController.ValidateMask('h')).toThrow();
		expect(() => DateController.ValidateMask('mm dd yyy')).toThrow();
		expect(() => DateController.ValidateMask('Y')).toThrow();
		expect(() => DateController.ValidateMask('Hello')).toThrow();
		expect(() => DateController.ValidateMask('dd/mm/yyyy T HH:MM')).toThrow();
		expect(() => DateController.ValidateMask('yyyy-mm hh')).toThrow();
		expect(() => DateController.ValidateMask('yyyyy')).toThrow();
		expect(() => DateController.ValidateMask('000000Y')).toThrow();
	})

	test("Parsing input should return correct date, if string correct", () => {
		expect(DateController.ConvertToDate('13-10-1998', 'dd-mm-yyyy')).toEqual(new Date(1998, 9, 13));
		expect(DateController.ConvertToDate('1998-10', 'yyyy-mm')).toEqual(new Date(1998, 9, 0,0, 0));
		expect(DateController.ConvertToDate('1000----10', 'yyyy----mm')).toEqual(new Date(1000, 9, 0, 0, 0));
		expect(DateController.ConvertToDate('10 13 1998', 'mm dd yyyy')).toEqual(new Date(1998, 9, 13));
	})
	test("Parsing time to date", () => {
		expect(DateController.ConvertToDate('15:00', 'HH:MM')).toEqual(new Date(0,0,0, 15, 0));
		expect(DateController.ConvertToDate('15 1998 20 13 10', 'HH yyyy MM dd mm')).toEqual(new Date(1998, 9, 13, 15, 20));
		expect(DateController.ConvertToDate('__30__20', '__MM__HH')).toEqual(new Date(0, 0,0, 20, 30));
	})
	test("Short date should be treated like full form", () => {
		expect(DateController.ConvertToDate('5 5 5', 'mm dd yyyy')).toEqual(new Date(5, 4, 5, 0 ,0));
		expect(DateController.ConvertToDate('1998 1', 'yyyy mm')).toEqual(new Date(1998, 0, 0, 0 , 0));

	})
	test("Not full input should return null", () => {
		expect(DateController.ConvertToDate('1', 'mm dd yyyy')).toEqual(null)
		expect(DateController.ConvertToDate('1 1', 'mm dd yyyy')).toEqual(null)
		expect(DateController.ConvertToDate('1 12', 'mm dd yyyy')).toEqual(null)
		expect(DateController.ConvertToDate('1', 'mm dd')).toEqual(null)
		expect(DateController.ConvertToDate('1  ', 'mm dd')).toEqual(null)
	})
	test("Testing SplitStringByMask date", () => {
		expect(DateController.SplitStringByMask("1 1", "mm dd yyyy")).toEqual(
			[
				{
					"construction": true,
					"ended": true,
					"input": "1",
					"last": false,
					"part": "mm"
				},
				{
					"part": " ",
					"skipped": true
				},
				{
					"construction": true,
					"ended": false,
					"input": "1",
					"last": false,
					"part": "dd"
				},
				{
					"part": " ",
					"skipped": false
				},
				{
					"construction": true,
					"ended": false,
					"input": "",
					"last": true,
					"part": "yyyy"
				}
			]
		)
		expect(DateController.SplitStringByMask("13-10-1998 15:45", "mm-dd-yyyy HH MM")).toEqual([
			{
				"construction": true,
				"ended": true,
				"input": "13",
				"last": false,
				"part": "mm"
			},
			{
				"part": "-",
				"skipped": true
			},
			{
				"construction": true,
				"ended": true,
				"input": "10",
				"last": false,
				"part": "dd"
			},
			{
				"part": "-",
				"skipped": true
			},
			{
				"construction": true,
				"ended": true,
				"input": "1998",
				"last": false,
				"part": "yyyy"
			},
			{
				"part": " ",
				"skipped": true
			},
			{
				"construction": true,
				"ended": true,
				"input": "15",
				"last": false,
				"part": "HH"
			},
			{
				"part": " ",
				"skipped": true
			},
			{
				"construction": true,
				"ended": true,
				"input": "45",
				"last": true,
				"part": "MM"
			}
		])

	})
	test("Testing SplitStringByMask for solid string", () => {
		expect(DateController.SplitStringByMask("5823", "mm dd yyyy")).toEqual([
			{
				"construction": true,
				"ended": true,
				"input": "58",
				"last": false,
				"part": "mm"
			},
			{
				"part": " ",
				"skipped": true
			},
			{
				"construction": true,
				"ended": true,
				"input": "23",
				"last": false,
				"part": "dd"
			},
			{
				"part": " ",
				"skipped": false
			},
			{
				"construction": true,
				"ended": false,
				"input": "",
				"last": true,
				"part": "yyyy"
			}
		])

		expect(DateController.SplitStringByMask("1550", "HH MM")).toEqual([
			{
				"construction": true,
				"ended": true,
				"input": "15",
				"last": false,
				"part": "HH"
			},
			{
				"part": " ",
				"skipped": true
			},
			{
				"construction": true,
				"ended": true,
				"input": "50",
				"last": true,
				"part": "MM"
			}
		])
	})
	test("Check fuller mask should return true, if provided sting is ended input for provided mask.", () => {
		expect(DateController.CheckFullerMask('1 1 1', 'mm dd yyyy')).toBe(false);
		expect(DateController.CheckFullerMask('1 1 12', 'mm dd HH')).toBe(true);
		expect(DateController.CheckFullerMask('1 1 1199', 'mm dd yyyy')).toBe(true);
		expect(DateController.CheckFullerMask('1 1 1199 13:1', 'mm dd yyyy HH:MM')).toBe(false);
	})
	test("Should return true for string without whitespace", () => {
		expect(DateController.CheckFullerMask('13101998', 'mm dd yyyy')).toBe(true);
	})

	test("Parsing mask should split the math by part", () => {
		expect(DateController.ParseMask('mm - yyyy')).toEqual([
			'mm', ' ', '-', ' ', 'yyyy'
		])
		expect(DateController.ParseMask('HH:MM')).toEqual([
			'HH', ':', 'MM'
		])
	})
	test("Prettify date should return string like mask", () => {
		const date = new Date(1998, 9, 13)

		expect(DateController.GetPrettyDate(date, 'dd/mm/yyyy')).toBe("13/10/1998")

	})
	test("Get rest mask should return part of mask that need full", () => {
		expect(DateController.GetRestMask("1", "dd/mm/yyyy")).toBe("d/mm/yyyy")
		expect(DateController.GetRestMask("11", "dd/mm/yyyy")).toBe("/mm/yyyy")
		expect(DateController.GetRestMask("11 ", "dd/mm/yyyy")).toBe("mm/yyyy")
		expect(DateController.GetRestMask("11 1", "dd/mm/yyyy")).toBe("m/yyyy")
		expect(DateController.GetRestMask("11 1 ", "dd/mm/yyyy")).toBe("yyyy")
		expect(DateController.GetRestMask("11 1 1", "dd/mm/yyyy")).toBe("yyy")
		expect(DateController.GetRestMask("11 1 1998", "dd/mm/yyyy")).toBe("")
	})
	test("Get rest mask for solid whitespace", () => {
		expect(DateController.GetRestMask("1    ", "dd/mm/yyyy")).toBe("mm/yyyy")
		expect(DateController.GetRestMask("1/////", "dd/mm/yyyy")).toBe("mm/yyyy")
		expect(DateController.GetRestMask("////", "dd/mm/yyyy")).toBe("dd/mm/yyyy")
	})
	test("Get Rest Mask with started not primary chars", () => {
		expect(DateController.GetRestMask("1", "//mm//dd")).toBe("m//dd")
	})
	test("Split should find all constructions", () => {
		expect(DateController.SplitStringByMask('12', "mm/dd"))
		.toEqual([
			{
				part: 'mm',
				input: '12',
				construction: true,
				ended: true,
				last: false
			},
			{
				part: '/',
				skipped: false
			},
			{
				part: 'dd',
				input: '',
				construction: true,
				ended: false,
				last: true
			}
		])
	})
	test("Split should check for construction is ended", () => {
		expect(DateController.SplitStringByMask('1 2', "mm/dd"))
		.toEqual([
			{
				part: 'mm',
				input: '1',
				construction: true,
				ended: true,
				last: false
			},
			{
				part: '/',
				skipped: true
			},
			{
				part: 'dd',
				input: '2',
				construction: true,
				ended: false,
				last: true
			}
		])
	})
})