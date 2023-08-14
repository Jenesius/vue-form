export default class DateController {

	static get ValidatedPrimaryMask() {
		return ['yyyy', 'mm', 'dd', 'HH', 'MM']
	}
	/**
	 * @description Функция предназначена для валидации маски. Вернёт true в случае успеха, или выкинет ошибку, если
	 * маска не является валидной.
	 * */
	static ValidateMask(mask: unknown) {
		if (typeof mask !== 'string') throw DateError.WrongMaskType(mask);

		let parsedMask = `${mask}`;

		while(parsedMask.length) {

			const key = DateController.ValidatedPrimaryMask.find(key => parsedMask.startsWith(key))
			if (key) {
				parsedMask = parsedMask.slice(key.length);
				continue;
			}

			const char = parsedMask.charAt(0);
			const charOriginalPosition = mask.length - parsedMask.length;

			if (/[ymdHM]/.test(char)) throw DateError.WrongConstruction(mask, char, charOriginalPosition)
			if (/[a-zA-Z]/.test(char)) throw DateError.UsingUnknownSymbol(mask, char, charOriginalPosition);

			parsedMask = parsedMask.slice(1);
		}

		return true;
	}

	static ParseStringByMask(input: unknown, mask: string): Date | null {
		if (typeof input !== 'string') throw new Error('Input is not string');

		const parsedResult = DateController.Parse(input, mask);

		function get(key: string) {
			return Number.parseInt(parsedResult.get(key)?.part || '0');
		}

		if ([...parsedResult.values()].find(a => !a.ended)) return null;
		return new Date(get('yyyy'), get('mm'), get('dd'), get('HH'), get('MM'))
	}

	/**
	 * @description Проверяет является ли переданная строка законченной маской. Это означает то, что для всех элементов
	 * маски есть хотя бы один символ, а для последнего - все. То есть если к значению поля в конец добавить любую цифру
	 * то данная строка будет уже не валидна.
	 * */
	static CheckFullerMask(input: string, mask: string) {
		const parseResult = DateController.Parse(input, mask);

		return ![...parseResult.entries()].find(([key, value], index) => {
			return value.part.length === 0 || (value.part.length !== key.length && index === parseResult.size - 1)
		})
	}
	static isISODate(str: string) {
		if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
		const d = new Date(str);
		return d instanceof Date && !isNaN(d.getTime()) && d.toISOString()===str; // valid date
	}
	static isUTCDate(str: string) {
		try {
			const dateParsed = new Date(Date.parse(str))
			return dateParsed.toUTCString() === str
		} catch (e) {
			return false;
		}
	}

	/**
	 * @description Функция используется для обработки строки. Возвращает Map, где ключ является конечный path и Маски,
	 * а его значение часть строки из input. Главное, что необходимо помнить: если, для ключа не найдено значение - то
	 * будет записана пустая строка.
	 * */
	static Parse(input: string, mask: string) {
		const map = new Map<string, {
			part: string,
			ended: boolean
		}>();

		while (mask.length > 0) {
			const key = DateController.ValidatedPrimaryMask.find(key => mask.startsWith(key));

			if (key) {
				const searchResult = new RegExp(`\\d{0,${key.length}}`).exec(input);
				const parsedResult = searchResult?.[0] || "";


				input = input.slice(parsedResult.length);
				mask  = mask.slice(key.length)

				map.set(key, {
					part: parsedResult,
					ended: parsedResult.length === key.length || input.length !== 0
				});

				continue;
			}

			// Если key не перешёл на следующий шаг, то проверяем текущий символ
			// Если он не цифра, то выпиливаем его
			if (!/\d/.test(input.charAt(0)))
				input = input.slice(1);

			mask  = mask.slice(1)
		}
		return map;
	}

	static GetPrettyDateByMask(date: Date, mask: string) {
		return DateController.ParseMask(mask)
		.map(key => DateController.GetValueByMaskPart(date, key))
		.join('')
	}
	static GetValueByMaskPart(date: Date, part: string) {
		function pad(v: number, length = 2) {
			return String(v).padStart(length, '0');
		}
		switch (part) {
			case 'yyyy': return date.getFullYear()
			case 'mm': return pad(date.getMonth())
			case 'dd': return pad(date.getDate())
			case 'HH': return pad(date.getHours())
			case 'MM': return pad(date.getMinutes())
			default: return part
		}
	}
	/**
	 * @description Parse Mask to part.
	 * @example mm/dd/yyyy HH:MM -> ["mm", "/", "dd", "yyyy", " ", "HH", ":", "MM"]
	 * */
	static ParseMask(mask: string) {
		const arr: string[] = []

		while (mask.length > 0) {
			const key = DateController.ValidatedPrimaryMask.find(key => mask.startsWith(key));

			arr.push(key || mask.slice(0, 1))
			mask = mask.slice(key?.length || 1)

		}

		return arr;
	}

	/**
	 * @description Метод возвращает оставшуюся часть маски
	 * */
	static GetRestMask(input: string, mask: string) {
		const parsedInput = DateController.Parse(input, mask);
		const parsedMask  = DateController.ParseMask(mask);


		let prevEnded = true;
		while (parsedMask.length) {
			const part = parsedMask[0];

			const isValuePart = DateController.ValidatedPrimaryMask.includes(part);

			if (isValuePart) {
				const value = parsedInput.get(part);
				if (!value) break;

				prevEnded = value.ended;

				if (value.ended) parsedMask.shift()
				else {
					parsedMask[0] = parsedMask[0].slice(value.part.length || 0)
					break;
				}
			} else {
				if (prevEnded) parsedMask.shift();
				else break;
			}

		}

		return parsedMask.join('')

	}
}

class DateError extends Error {
	static WrongMaskType(mask: any) {
		return new DateError(`Type of mask should be string, but founded ${typeof mask}. Provided mask: ${mask}`);
	}
	static UsingUnknownSymbol(mask: string, symbol: string, position?: number) {
		return new DateError(
			`
			In mask You can use only constructions like: ${DateController.ValidatedPrimaryMask.join()}. 
			The next symbol(construction) "${symbol}" is unknown.			
			`)
	}
	static WrongConstruction(mask: string, symbol: string, position?: number) {
		return new DateError(
			`
			Not full construction was founded: ${symbol}.
			You can use only ${DateController.ValidatedPrimaryMask.join()}.
			Mask: ${mask}
			`
		)
	}
}

interface IDateParseItem {
	value: string,
	mask: string
}