/**
 * @description Проверяет является parentName родителем для childrenName.
 * @example
 *		parent:address или address.city или address.city.index
 * 		children: address.city.index
 * */
export default function checkCompositeName(parentName: string, childrenName: string): boolean {
	return new RegExp(`^(${parentName})(\\.|$)`).test(childrenName);
}
