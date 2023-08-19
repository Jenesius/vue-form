export default function debounce(fn: any, timeout: number = 100) {
	let timerId:any = 0;

	return (...args: any) => {
		clearTimeout(timerId);
		timerId = setTimeout(() => fn(...args), timeout)
	}
}