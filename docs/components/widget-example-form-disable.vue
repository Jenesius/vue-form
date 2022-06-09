<template>
    <input-field type = "text" name = "street.name" label = "Street.Name"/>
    <input-field name = "username" label = "Username"/>
    <input-street name = "street"/>
    <button @click = "showValues">Values</button>
    <div>
        <button @click = "disable()">Disable Form</button>
        <button @click = "enable()">Enable Form</button>
    </div>
    <div>
        <button @click = "disable('street')">Disable street</button>
        <button @click = "enable('street')">Enable street</button>
    </div>
    <div>
        <button @click = "disable('street.name')">Disable street.name</button>
        <button @click = "enable('street.name')">Enable street.name</button>
    </div>
    <div class = "language-json">
        <pre><code ref = "test"></code></pre>
    </div>
    <div class = "language-json">
        <pre><code ref = "formDisabledState"></code></pre>
    </div>
</template>

<script setup>
    import InputStreet from "../../src/components/v2/input-street.vue";
    import {Form, InputField} from "../../plugin";
    import {onUnmounted, ref} from "vue";

    const form = new Form();
    function showValues() {
        alert(JSON.stringify(form.values, null, "   "))
    }
    const test = ref();
    const formDisabledState = ref(form.disabled);

    // form.on(Form.EVENT_UPDATE_ABILITY, () => renderDisableState());

    const id = setInterval(() => {
        renderDisableState()
    }, 50);

    function renderDisableState() {
        //console.log(form.disabledElements)
        test.value.innerHTML = JSON.stringify(form.disabledElements, null, "  ");
        formDisabledState.value.innerHTML = JSON.stringify({
            'form.disable': form.disabled
        }, null, "  ");
    }

    onUnmounted(() => { clearInterval(id); })
    function disable(name = undefined) { form.disable(name); }

    function enable(name = undefined) { form.enable(name) }
</script>

<style scoped>

</style>
