import bypassObject from "./bypass-object";

export default function grandObject(object: any) {
	
	return bypassObject(object)
	.reduce((acc: any, {path, value}) => {
		
		let link = acc;
		let index = 0;
		
		while (index !== path.length) {
			const name = path[index];
			
			if (index === path.length - 1) {
				// last item
				link[name] = value;
			} else {
				link = link[name] || (() => {
					link[name] = {};
					return link[name];
				})()
			}
			
			
			index++;
		}

		return acc;
	}, {})
	
}

