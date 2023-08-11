<template>
    <div>
        <!--INPUT-->
        <div class = "input-date">

            <input type = "text" :value = "pretty(modelValue)" @input = "handleInput($event.target.value)">

            <div>ICON</div>
        </div>
        <!--CALENDAR-->
    </div>
</template>

<script setup lang = "ts">

const props = defineProps<{
    modelValue: any
}>()

function pretty(s: string) {
    const mask = "dd/mm/yyyy";

    if (typeof s !== 'string') return ''

    s = s.replace(/[^0-9]/g, '');



    console.log(s);
    return s + mask.slice(s.length);
}
const emit = defineEmits<{
    (e: 'update:modelValue', value: any): void
}>()
function handleInput(v: any) {

    v = (v || '').replace(/[^0-9]/g, '');

    emit('update:modelValue', v);
}


</script>

<style scoped>

</style>