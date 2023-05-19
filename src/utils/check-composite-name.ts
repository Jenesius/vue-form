export default function checkCompositeName(parentName: string, childrenName: string): boolean {
	
	// Parent name can't be less for size;
	if (parentName.length > childrenName.length) return false;
	// Equal
	if (parentName === childrenName) return true;
	
	let index = 0;
	const parentArray = parentName.split('.');
	const childrenArray = childrenName.split('.');
	
	while(index < parentArray.length) {
		if (parentArray[index] !== childrenArray[index]) return false;
		index++;
	}
	
	return true;
}
