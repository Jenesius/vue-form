import Form from "../classes/Form";
import mergeObjects from "../utils/merge-objects";
import grandObject from "../utils/grand-object";
import {onUnmounted, reactive} from "vue";

/**
 * @description Return dynamic form values.
 * */
export default function useFormValues(form: Form) {
    const values = reactive(form.values || {});
    const off = form.onvalue(function (data) {
        const newValues = {
            [data.name]: data.newValue
        }
        mergeObjects(values, grandObject(newValues));
    })

    onUnmounted(() => {
        off?.()
    })

    return values;
}