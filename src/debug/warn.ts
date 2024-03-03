export default function warn(subject: string, text: string, error?: any) {
	console.log(`%c[${subject}] %c${text}`, 'color: #dac400', 'color: black',error);
}
