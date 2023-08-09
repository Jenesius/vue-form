<template>
    <div>
        <input-field name="name" :pretty="pretty" :modify="modify"/>
    </div>
</template>

<script setup lang="ts">
import InputField from "../../../../src/widgets/form-field.vue";
import Form from "../../../../src/classes/Form";

const form = new Form();
defineExpose({
    form
})

const pretty = (x: unknown) => {
    if (typeof x !== 'string') return '';
    if (x.length) return `-${x}-`;
    return ''
}
const modify = (x: string) => {
    // @ts-ignore
    return x.replaceAll(/[^a-zA-Z]/g, '');
}

</script>

<style scoped>

</style>