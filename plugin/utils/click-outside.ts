
export default function clickOutside(el: HTMLElement, callback: any) {
	
	function handleClickOutside(e: MouseEvent) {
		// Clicked outside
		if (!el.contains(e.target as Node)) {
			callback();
			document.removeEventListener('click', handleClickOutside);
		}
	}
	
	document.addEventListener('click', handleClickOutside)
	// Return off hook
	return () => {
		document.removeEventListener('click', handleClickOutside)
	}
}
