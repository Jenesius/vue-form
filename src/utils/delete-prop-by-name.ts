/**
 * @param {Object} object. Deepen object!
 * @param {String} name of removed item.
 * @return {Boolean} removed. True if property was found and removed.
 * */
export default function deletePropByName(object: any, name: string) {
											   // 'address.city.code'
	const splitName = name.split('.'); // ['address', 'city', 'code']
	
	let index = 0;
	
	// Until last item. Last item don't touched. We need to delete it.
	while (index < splitName.length) {
		const currentName = splitName[index];
		
		// Name was not founded. Operation rejected.
		if (!Object.prototype.hasOwnProperty.call(object, currentName)) return false;
		
		// last item
		if (index === splitName.length - 1) {
			delete object[currentName];
			return true;
		}
		object = object[currentName];
		index++;
	}
	
	return false;
}
