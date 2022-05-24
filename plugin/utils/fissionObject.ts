interface FissionObject {
	[name: string]: string
}

export default function fissionObject(obj: FissionObject, output:any = {}) {
	

	Object.keys(obj).forEach(name => {
		
		if (!name.includes('.')) return output[name] = obj[name];
		
		
		
	})
	
}
