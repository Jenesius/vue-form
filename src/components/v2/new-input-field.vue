<template>
    <input type = "text" @input = "input.change($event.target.value)" :value="state.value"
        :disabled = "state.disabled"
    >
</template>

<script setup lang = "ts">

    import Form from "../../../plugin/classes/Form";
    import {inject, onUnmounted, reactive} from "vue";

    const props = defineProps<{
        name: string
    }>()

    const {state, input} = useState(props.name);

    function useState( name: string) {

        const parentForm = inject(Form.PROVIDE_NAME) as Form;

        const state = reactive({
            value: parentForm.getValueByName(name),
            disabled: parentForm.getDisabledByName(name)
        })

        const off = parentForm.dependInput(name, {
            change: (v:any) => {
                state.value = v;
            },
            disable: () => {
                state.disabled = true;
            },
            enable: () => {
                state.disabled = false;
            },
        })
        onUnmounted(() => {
            off();
        })

        /**
         * Предоставляется фронтенду, презентейшен view.
         * */
        return {
            state,
            input: {
                change: (v:any) => {
                    parentForm.input(name, v);
                },
            }
        }
    }
</script>

<style scoped>

</style>
