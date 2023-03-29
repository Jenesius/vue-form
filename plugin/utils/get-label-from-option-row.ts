import {OptionRow} from "../types";

/**
 * @description Пока нет надобности убирать title, и полноценно его заменять на label, по этому в текущей системе
 * поддерживается эти два варианта. В будущем будем придерживаться политики сужения, чтобы был единственный ВЕРНЫЙ вариант
 * описания данных
 * */
export default function getLabelFromOptionRow(optionData: OptionRow) {
	return (("title" in optionData) ? optionData.title : optionData.label) || '';
}