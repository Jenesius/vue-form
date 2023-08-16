import DateController from "../../../src/controllers/date-controller";

describe("Date controller", () => {
	test("Date Month should be start with one", () => {
		expect(DateController.ConvertToDate('13-12-1998', 'DD-MM-YYYY'))
		.toEqual(
			new Date(1998, 11, 13)
		)
	})
	test("Date validate should return true if mask is validated.", () => {
		expect(DateController.ValidateMask('YYYY')).toBe(true)
		expect(DateController.ValidateMask('MM-DD')).toBe(true)
		expect(DateController.ValidateMask('YYYY/DD/MM')).toBe(true)
		expect(DateController.ValidateMask('MM')).toBe(true)
		expect(DateController.ValidateMask('MM')).toBe(true)
		expect(DateController.ValidateMask('HH    MM')).toBe(true)
		expect(DateController.ValidateMask('YYYY MM HH YYYY MM HH')).toBe(true)
		expect(DateController.ValidateMask('DD/////HH')).toBe(true)
		expect(DateController.ValidateMask('HH')).toBe(true)
		expect(DateController.ValidateMask('MM')).toBe(true)
		expect(DateController.ValidateMask('mm MM')).toBe(true)
		expect(DateController.ValidateMask('')).toBe(true)
		expect(DateController.ValidateMask('00000')).toBe(true)
	})
	test("Date validate should throw Error if provided mask is incorrect", () => {
		expect(() => DateController.ValidateMask('hh')).toThrow();
		expect(() => DateController.ValidateMask('h')).toThrow();
		expect(() => DateController.ValidateMask('MM DD YYY')).toThrow();
		expect(() => DateController.ValidateMask('Y')).toThrow();
		expect(() => DateController.ValidateMask('Hello')).toThrow();
		expect(() => DateController.ValidateMask('DD/MM/YYYY T HH:MM')).toThrow();
		expect(() => DateController.ValidateMask('YYYY-MM Hh')).toThrow();
		expect(() => DateController.ValidateMask('YYYYY')).toThrow();
		expect(() => DateController.ValidateMask('000000Y')).toThrow();
	})

	test("Parsing input should return correct date, if string correct", () => {
		expect(DateController.ConvertToDate('13-10-1998', 'DD-MM-YYYY')).toEqual(new Date(1998, 9, 13));
		expect(DateController.ConvertToDate('1998-10', 'YYYY-MM')).toEqual(new Date(1998, 9, 0,0, 0));
		expect(DateController.ConvertToDate('1000----10', 'YYYY----MM')).toEqual(new Date(1000, 9, 0, 0, 0));
		expect(DateController.ConvertToDate('10 13 1998', 'MM DD YYYY')).toEqual(new Date(1998, 9, 13));
	})
	/*
	test("Parsing time to date", () => {
		expect(DateController.ConvertToDate('15:00', 'HH:mm')).toEqual(new Date(0,0,0, 15, 0));
		expect(DateController.ConvertToDate('15 1998 20 13 10', 'HH YYYY MM DD mm')).toEqual(new Date(1998, 9, 13, 15, 20));
		expect(DateController.ConvertToDate('__30__20', '__mm__HH')).toEqual(new Date(0, 0,0, 20, 30));
	})*/
	test("Short date should be treated like full form", () => {
		expect(DateController.ConvertToDate('5 5 5', 'MM DD YYYY')).toEqual(new Date(5, 4, 5, 0 ,0));
		expect(DateController.ConvertToDate('1998 1', 'YYYY MM')).toEqual(new Date(1998, 0, 0, 0 , 0));

	})
	test("Not full input should return null", () => {
		expect(DateController.ConvertToDate('1', 'MM DD YYYY')).toEqual(null)
		expect(DateController.ConvertToDate('1 1', 'MM DD YYYY')).toEqual(null)
		expect(DateController.ConvertToDate('1 12', 'MM DD YYYY')).toEqual(null)
		expect(DateController.ConvertToDate('1', 'MM DD')).toEqual(null)
		expect(DateController.ConvertToDate('1  ', 'MM DD')).toEqual(null)
	})
	test("Testing SplitStringByMask date", () => {
		expect(DateController.SplitStringByMask("1 1", "MM DD YYYY")).toEqual(
			[
				{
					"construction": true,
					"ended": true,
					"input": "1",
					"last": false,
					"part": "MM"
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
					"part": "DD"
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
					"part": "YYYY"
				}
			]
		)
		expect(DateController.SplitStringByMask("13-10-1998 15:45", "MM-DD-YYYY HH mm")).toEqual([
			{
				"construction": true,
				"ended": true,
				"input": "13",
				"last": false,
				"part": "MM"
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
				"part": "DD"
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
				"part": "YYYY"
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
				"part": "mm"
			}
		])

	})
	test("Testing SplitStringByMask for solid string", () => {
		expect(DateController.SplitStringByMask("5823", "MM DD YYYY")).toEqual([
			{
				"construction": true,
				"ended": true,
				"input": "58",
				"last": false,
				"part": "MM"
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
				"part": "DD"
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
				"part": "YYYY"
			}
		])

		expect(DateController.SplitStringByMask("1550", "HH mm")).toEqual([
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
				"part": "mm"
			}
		])
	})
	test("Check fuller mask should return true, if provided sting is ended input for provided mask.", () => {
		expect(DateController.CheckFullerMask('1 1 1', 'MM DD YYYY')).toBe(false);
		expect(DateController.CheckFullerMask('1 1 12', 'MM DD HH')).toBe(true);
		expect(DateController.CheckFullerMask('1 1 1199', 'MM DD YYYY')).toBe(true);
		expect(DateController.CheckFullerMask('1 1 1199 13:1', 'MM DD YYYY HH:mm')).toBe(false);
	})
	test("Should return true for string without whitespace", () => {
		expect(DateController.CheckFullerMask('13101998', 'MM DD YYYY')).toBe(true);
	})

	test("Parsing mask should split the math by part", () => {
		expect(DateController.ParseMask('MM - YYYY')).toEqual([
			'MM', ' ', '-', ' ', 'YYYY'
		])
		expect(DateController.ParseMask('HH:mm')).toEqual([
			'HH', ':', 'mm'
		])
	})
	test("Prettify date should return string like mask", () => {
		const date = new Date(1998, 9, 13)

		expect(DateController.GetPrettyDate(date, 'DD/MM/YYYY')).toBe("13/10/1998")

	})
	test("Get rest mask should return part of mask that need full", () => {
		const mask = "DD/MM/YYYY"
		expect(DateController.GetRestMask("1", mask)).toBe("D/MM/YYYY")
		expect(DateController.GetRestMask("11", mask)).toBe("/MM/YYYY")
		expect(DateController.GetRestMask("11 ", mask)).toBe("MM/YYYY")
		expect(DateController.GetRestMask("11 1", mask)).toBe("M/YYYY")
		expect(DateController.GetRestMask("11 1 ", mask)).toBe("YYYY")
		expect(DateController.GetRestMask("11 1 1", mask)).toBe("YYY")
		expect(DateController.GetRestMask("11 1 1998", mask)).toBe("")
	})
	test("Get rest mask for solid whitespace", () => {
		const mask = "DD/MM/YYYY"
		expect(DateController.GetRestMask("1    ", mask)).toBe("MM/YYYY")
		expect(DateController.GetRestMask("1/////", mask)).toBe("MM/YYYY")
		expect(DateController.GetRestMask("////", mask)).toBe("DD/MM/YYYY")
	})
	test("Get Rest Mask with started not primary chars", () => {
		expect(DateController.GetRestMask("1", "//MM/DD")).toBe("M/DD")
	})
	test("Split should find all constructions", () => {
		expect(DateController.SplitStringByMask('12', "MM/DD"))
		.toEqual([
			{
				part: 'MM',
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
				part: 'DD',
				input: '',
				construction: true,
				ended: false,
				last: true
			}
		])
	})
	test("Split should check for construction is ended", () => {
		expect(DateController.SplitStringByMask('1 2', "MM/DD"))
		.toEqual([
			{
				part: 'MM',
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
				part: 'DD',
				input: '2',
				construction: true,
				ended: false,
				last: true
			}
		])
	})
})