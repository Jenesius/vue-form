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
            disabled: false
        })

        const off = parentForm.dependInput(name, {
            disable: () => {
                state.disabled = true;
            },
            enable: () => {
                state.disabled = false;
            },
            change: (v:any) => {
                state.value = v;
            },
            hide: () => {},
            show: () => {},
            validate: () => {},
            focus: () => {}
        })
        onUnmounted(() => {
            off();
        })

        return {
            state,
            input: {
                change: (v:any) => {
                    parentForm.input(name, v);
                }
            }
        }
    }
</script>

<style scoped>

</style>
