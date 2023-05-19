import STORE from "../config/store";
import Form from "../classes/Form";

class debug{
    private static getName<T extends NamedElement>(element: T) {
        return element.name ? `(${element.name})` : '';
    }
    static msg(...params: string[]) {
        if (!STORE.debug) return;

        console.log(`%c[form]%c`, 'color: #42b883', 'color: black', ...params)
    }
    static newForm(form: Form) {
        debug.msg(`form${debug.getName(form)}: created`);
    }
    static newSubscription<T extends NamedElement>(parent: T, child: T) {
        debug.msg(`subscription${debug.getName(child)}: add to ${debug.getName(parent)}`)
    }
}
export default debug;

interface NamedElement {
    name?: string
}