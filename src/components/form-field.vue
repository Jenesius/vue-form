<template>
    <component :is = "state.component" :name = "name"/>
</template>

<script setup lang = "ts">

    import {Form} from "../../plugin";
    import {reactive} from "vue";

    const props = defineProps<{
        name: string
    }>()

    const parentForm = Form.getParentForm();

    function useStateFormField(f: Form){

        const state = reactive({
            component: null
        })

        f.emit('metadata-depend-new-proxy-field', {
            setComponent: (c: any) => {
                state.component = c;
            },
            name: props.name
        })

        return state;
    }

    const state = useStateFormField(parentForm);

</script>

<style scoped>

</style>
