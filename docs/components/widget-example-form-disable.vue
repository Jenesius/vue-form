<template>
    <input-field type = "text" name = "street.name" label = "Street.Name"/>
    <input-field name = "username" label = "Username"/>
    <input-street name = "street"/>
    <button @click = "showValues">Values</button>
    <div class = "button-wrap">
        <button class = "btn" @click = "disable()">Disable Form</button>
        <button class = "btn btn-success" @click = "enable()">Enable Form</button>
    </div>
    <div class = "button-wrap">
        <button class = "btn" @click = "disable('street')">Disable street</button>
        <button class = "btn btn-success" @click = "enable('street')">Enable street</button>
    </div>
    <div class = "button-wrap">
        <button class = "btn" @click = "disable('street.name')">Disable street.name</button>
        <button class = "btn btn-success" @click = "enable('street.name')">Enable street.name</button>
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
    const formDisabledState = ref();

    // form.on(Form.EVENT_UPDATE_ABILITY, () => renderDisableState());

    const id = setInterval(() => {
        renderDisableState()
    }, 50);

    function renderDisableState() {
        //console.log(form.disabledElements)
        if (test.value)
        test.value.innerHTML = JSON.stringify(form.disabledElements, null, "  ");
        if (formDisabledState.value)
        formDisabledState.value.innerHTML = JSON.stringify({
            'form.disable': form.disabled
        }, null, "  ");
    }

    onUnmounted(() => { clearInterval(id); })
    function disable(name = undefined) { form.disable(name); }

    function enable(name = undefined) { form.enable(name) }
</script>

<style scoped>
    .btn{
        padding: 0 10px;
        border-radius: 15px;
        border: 1px solid #a9a9a9;
    }
    .btn-success{
        border: 1px solid #42b883;
        color:  #42b883;
    }
    .button-wrap{
        display: flex;
        gap: 5px;
        margin-bottom: 5px;
    }
</style>
