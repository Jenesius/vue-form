type AvailableMask = 'YYYY' | 'MM' | 'DD' | 'HH' | 'mm'
/**
 * @description На данный момент вся работа производится в UTC. Это было сделано для более лаконичного решения. Если
 * на проекте есть необходимость записывать дату в другом формате -
 * */
export default class DateController {

	/**
	 * SPECIFICATION: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_time_string_format
	 * */
	static get ValidatedPrimaryMask(): AvailableMask[] {
		return ['YYYY', 'MM', 'DD', 'HH', 'mm']
	}
	/**
	 * @description Функция предназначена для валидации маски. Вернёт true в случае успеха, или выкинет ошибку, если
	 * маска не является валидной.
	 * */
	static ValidateMask(mask: unknown) {
		if (typeof mask !== 'string') throw DateError.WrongMaskType(mask);
		return !!DateController.SplitStringByMask('', mask)
	}

	static SplitStringByMask(input: string, primaryMask: string) {

		let mask = primaryMask; // Копия маски, которая будем постепенно обрезать
		const arr = [];
		// Чтобы не зашивать отдельно для валидации, получаем символы, которые входят в состав primary mask construction.
		// Мы помещаем все символы в один массив, затем помещаем всё в Set, чтобы убрать дубликаты, затем соединяем их.
		const availableLetters = [...new Set(
			DateController.ValidatedPrimaryMask.reduce((acc: string[], x) => {
				acc.push(...x.split(''))
				return acc;
			}, []))
		].join('');

		while(mask.length) {

			// Текущая маска начинается со значимого элемента
			const key = DateController.ValidatedPrimaryMask.find(key => mask.startsWith(key));

			// Если значимый ключ найден - получаем его значение из input и уменьшаем input и маску.
			if (key) {
				// Получаем из input возможную значимую строку
				const searchResult = new RegExp(`\\d{0,${key.length}}`).exec(input);
				const parsedResult = searchResult?.[0] || "";

				// Если parsedResult пустой, мы должны очистить все не нужные символы до цифр.
				if (parsedResult.length) input = input.slice(parsedResult.length);
				else while (input.length && /\D/.test(input.charAt(0))) input = input.slice(1)

				mask = mask.slice(key.length);

				const ended = parsedResult.length === key.length || (parsedResult.length && /^\D/.test(input))
				arr.push({
					part: key,
					input: parsedResult,
					construction: true,
					ended: !!ended, // проблема тут
					last: !DateController.ValidatedPrimaryMask.find(key => mask.includes(key))
				})
				continue;
			}

			const char = mask.charAt(0);
			const charOriginalPosition = mask.length - primaryMask.length;

			if (new RegExp(`[${availableLetters}]`).test(char)) throw DateError.WrongConstruction(primaryMask, char, charOriginalPosition);
			if (/[a-zA-Z]/.test(char)) throw DateError.UsingUnknownSymbol(primaryMask, char, charOriginalPosition);

			// Незначимый символ: * / - + или любой другой отличный от буквы и цифры.
			arr.push({
				part: char,
				skipped: input.length !== 0
			})

			// Если key не перешёл на следующий шаг, то проверяем текущий символ
			// Если он не цифра, то выпиливаем его
			if (!/\d/.test(input.charAt(0)))
				input = input.slice(1);

			mask  = mask.slice(1)
		}

		return arr;
	}

	/**
	 * @description Конвертация в строки в дату используя маску.
	 * */
	static ConvertToDate(input: unknown, mask: string): Date | null {
		if (typeof input !== 'string') throw new Error('Input is not string');
		const parsedResult = DateController.SplitStringByMask(input, mask);

		function get(key: AvailableMask) {
			return Number.parseInt(parsedResult.find(item => item.part === key)?.input || '0');
		}

		// Если какой-то part не закончен и не является последним.
		if (parsedResult.find(a => a.construction && !( a.ended || (a.last && a.input.length)))) return null;
		return new Date(get('YYYY'), get('MM') - 1, get('DD'), get('HH'), get('mm'))
	}

	/**
	 * @description Проверяет является ли переданная строка законченной маской. Это означает то, что для всех элементов
	 * маски есть хотя бы один символ, а для последнего - все. То есть если к значению поля в конец добавить любую цифру
	 * то данная строка будет уже не валидна.
	 * */
	static CheckFullerMask(input: string, mask: string) {
		const parseResult = DateController.SplitStringByMask(input, mask);
		return !parseResult.find(item => item.ended === false)
	}

	static GetPrettyDate(date: Date, mask: string) {
		return DateController.ParseMask(mask)
		.map(key => DateController.GetValueByMaskPart(date, key))
		.join('')
	}
	/**
	 * @description Используется только для красивой записи. По этому не используется getUTCFullYear, getUTCMonth и т.д.
	 * */
	static GetValueByMaskPart(date: Date, part: AvailableMask | string) {
		function pad(v: number, length = 2) {
			return String(v).padStart(length, '0');
		}

		switch (part) {
			case 'YYYY': return date.getFullYear()
			case 'MM': return pad(date.getMonth() + 1)
			case 'DD': return pad(date.getDate())
			case 'HH': return pad(date.getHours())
			case 'mm': return pad(date.getMinutes())
			default: return part
		}
	}
	/**
	 * @description Parse Mask to part.
	 * @example mm/dd/yyyy HH:MM -> ["mm", "/", "dd", "yyyy", " ", "HH", ":", "MM"]
	 * */
	static ParseMask(mask: string) {
		return DateController.SplitStringByMask('', mask).map(a => a.part);
	}

	/**
	 * @description Метод возвращает оставшуюся часть маски
	 * */
	static GetRestMask(input: string, mask: string) {
		const parsedResult = DateController.SplitStringByMask(input, mask);
		return parsedResult
		.filter(a => !(a.ended || a.skipped))
		.map(x => x.input ? x.part.slice(x.input.length) : x.part)
		.join('')
	}

	static isUTCDate(str: string) {
		if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
		const d = new Date(str);
		return d instanceof Date && !isNaN(d.getTime()) && d.toISOString()===str; // valid date
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
			Mask: ${mask}, Position: ${position}	
			`)
	}
	static WrongConstruction(mask: string, symbol: string, position?: number) {
		return new DateError(
			`
			Not full construction was founded: ${symbol}.
			You can use only ${DateController.ValidatedPrimaryMask.join()}.
			Mask: ${mask}, Position: ${position}	
			`
		)
	}
}
