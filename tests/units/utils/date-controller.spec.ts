import DateController from "../../../plugin/controllers/date-controller";

describe("Date controller", () => {

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
		expect(DateController.ParseStringByMask('13-10-1998', 'dd-mm-yyyy')).toEqual(new Date(1998, 10, 13));
		expect(DateController.ParseStringByMask('15:00', 'HH:MM')).toEqual(new Date(0,0,0, 15, 0));
		expect(DateController.ParseStringByMask('1998-10', 'yyyy-mm')).toEqual(new Date(1998, 10, 0,0, 0));
		expect(DateController.ParseStringByMask('15 1998 20 13 10', 'HH yyyy MM dd mm')).toEqual(new Date(1998, 10, 13, 15, 20));
		expect(DateController.ParseStringByMask('1000----10', 'yyyy----mm')).toEqual(new Date(1000, 10, 0, 0, 0));
		expect(DateController.ParseStringByMask('__30__20', '__MM__HH')).toEqual(new Date(0, 0,0, 20, 30));
		expect(DateController.ParseStringByMask('10 13 1998', 'mm dd yyyy')).toEqual(new Date(1998, 10, 13));
		expect(DateController.ParseStringByMask('2000 10 01', 'yyyy_++_++')).toEqual(new Date(2000, 0,0, 0 ,0));
	})
	test("Short date should be treated like full form", () => {
		expect(DateController.ParseStringByMask('5 5 5', 'mm dd yyyy')).toEqual(new Date(5, 5, 5, 0 ,0));
		expect(DateController.ParseStringByMask('1998 1', 'yyyy mm')).toEqual(new Date(1998, 1, 0, 0 , 0));

	})
	test("Not full input should return null", () => {
		expect(DateController.ParseStringByMask('1', 'mm dd yyyy')).toEqual(null)
		expect(DateController.ParseStringByMask('1 1', 'mm dd yyyy')).toEqual(null)
		expect(DateController.ParseStringByMask('1 12', 'mm dd yyyy')).toEqual(null)
		expect(DateController.ParseStringByMask('1', 'mm dd')).toEqual(null)
	})
	test("Testing parse date", () => {
		expect(DateController.Parse("1 1", "mm dd yyyy")).toEqual(new Map([
			['mm', {part: '1', ended: true}],
			['dd', {part: '1', ended: false}],
			['yyyy', {part: '', ended: false}]
		]))
		expect(DateController.Parse("13-10-1998 15:45", "mm-dd-yyyy HH MM")).toEqual(new Map([
			['mm', {part: '13', ended: true}],
			['dd', {part: '10', ended: true}],
			['yyyy', {part: '1998', ended: true}],
			['HH', {part: '15', ended: true}],
			['MM', {part: '45', ended: true}]
		]))
		expect(DateController.Parse("1550", "HH MM")).toEqual(new Map([
			['HH', {part: '15', ended: true}],
			['MM', {part: '50', ended: true}]
		]))
		expect(DateController.Parse("5823", "mm dd yyyy")).toEqual(new Map([
			['mm', {part: '5', ended: true}],
			['dd', {part: '8', ended: true}],
			['yyyy', {part: '23', ended: false}]
		]))
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
		const date = new Date(1998, 10, 13)

		expect(DateController.GetPrettyDateByMask(date, 'dd/mm/yyyy')).toBe("13/10/1998")

	})
	test("Get rest mask should return part of mask that need full", () => {
		expect(DateController.GetRestMask("1", "dd/mm/yyyy")).toBe("d/mm/yyyy")
		expect(DateController.GetRestMask("1    ", "dd/mm/yyyy")).toBe("mm/yyyy")
		expect(DateController.GetRestMask("1/////", "dd/mm/yyyy")).toBe("mm/yyyy")
		expect(DateController.GetRestMask("11", "dd/mm/yyyy")).toBe("/mm/yyyy")
		expect(DateController.GetRestMask("11 ", "dd/mm/yyyy")).toBe("mm/yyyy")
		expect(DateController.GetRestMask("11 1", "dd/mm/yyyy")).toBe("m/yyyy")
		expect(DateController.GetRestMask("11 1 ", "dd/mm/yyyy")).toBe("yyyy")
		expect(DateController.GetRestMask("11 1 1", "dd/mm/yyyy")).toBe("y")
		expect(DateController.GetRestMask("11 1 1998", "dd/mm/yyyy")).toBe("")
	})
	test("Get rest mask should return part of mask that need full", () => {
		expect(DateController.GetRestMask("1", "//mm//dd")).toBe("m//dd")

	})
})