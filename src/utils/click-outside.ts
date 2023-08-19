/**
 * @description Всегда забываешь, что если на обработчик повесишь .stop, то до документа событие не всплывёт. И срабатывать
 * не будет.
 * */
export default function clickOutside(el: HTMLElement, callback: any) {

	const globalItem = document;

	function clean() {
		globalItem.removeEventListener('click', handleClickOutside);
	}

	function handleClickOutside(e: MouseEvent) {
		// Clicked outside
		console.log('+++', el.childNodes)
		if (!el.contains(e.target as Node)) {
			callback();
			clean()
		}
	}
	// SetTimeout Нужен для того, чтобы подождать, пока предыдущий event всплывёт полностью. В противном случае мы можем
	// сразу начать обрабатывать клик, которые и инициировал добавление обработчика
	setTimeout(() => globalItem.addEventListener('click', handleClickOutside), 0)
	// Return off hook
	return () => {
		clean()
	}
}
