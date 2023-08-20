import STORE from "../config/store";
import Form from "../classes/Form";

class debug{
    private static getName<T extends NamedElement>(element: T) {
        return element.name ? `(${element.name})` : '';
    }
    static readonly colorName =  `color: blue;`
    static readonly colorDefault = 'color: black;'
    static readonly colorSuccess = 'color: #42b883;'
    static readonly colorFocus = "color: purple";
    static readonly colorError = "color: red";
    static msg(...params: any[]) {
        debug.write(console.log, params);
    }
    static group(...params: any[]) {
        debug.write(console.group, params);
    }
    static groupEnd(...params: any[]) {
        debug.write(console.groupEnd, params);
    }
    static write(out: any, params: any) {
        if (!STORE.debug) return;

        // If first params is string we add form label.
        if (typeof params[0] === 'string') {
            params[0] = `%c[form]%c ${params[0]}`;
            params.splice(1,0, `${debug.colorSuccess} font-weight:normal;`, debug.colorDefault)
        }

        out.apply(console, params);
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