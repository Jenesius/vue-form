<template>
    <input type = "text" @input = "input.change($event.target.value)" :value="state.value">
</template>

<script setup lang = "ts">

    import {Form} from "../../../plugin";
    import {inject, reactive} from "vue";

    const props = defineProps<{
        name: string
    }>()

    const {state, input} = useState(props.name);

    function useState( name: string) {

        const parentForm = inject(Form.PROVIDE_NAME) as Form;

        const state = reactive({
            value: parentForm.getValueByName(name)
        })

        parentForm.onInput(props.name, (v: any) => state.value = v)
        return {
            state,
            input: {
                change: (v:any) => {
                    parentForm.changeByName(name, v);
                }
            }
        }
    }
</script>

<style scoped>

</style>
