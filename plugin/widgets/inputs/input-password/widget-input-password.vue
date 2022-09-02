<template>
    <input-wrap :label = "label" :errors = "errors">
        <div class = "input-password-container"
            :class = "{
			'input-password-container_disabled': disabled,
			'input-password_error': errors.length
		}"
        >
            <input
                class = "input-password"
                :type = "typeInput"
                :value = "modelValue"
                @input = "emit('update:modelValue', $event.target.value)"
                :disabled = "disabled"
				:autofocus="autofocus"
            />
            <div class = "input-password__toggle" @click = "toggleType()">
                <div
                    class = "password-eye"
                    :class = "{
                    'password-eye_cross': typeInput === 'text'
                }"
                ></div>
            </div>

        </div>
    </input-wrap>
</template>

<script setup lang = "ts">
    import InputWrap from "../input-wrap.vue";
    import {ref} from "vue";
	interface Props  {
		label?: string,
		errors: string[],
		modelValue: any,
		disabled: boolean,
		autofocus: boolean
	}
    const props = defineProps<Props>()
    const emit = defineEmits<{
        (e: 'update:modelValue', v: any): void
    }>()

    function onInput(v: any) {
        if (props.disabled) return;
        emit('update:modelValue', v)
    }


    const typeInput = ref<"password" | "text">("password");
    /**
     * @description Change type of InputElement. text -> password. password -> text
     * */
    function toggleType() {
        typeInput.value = typeInput.value === "text" ? "password" : "text";
    }

</script>

<style scoped>
    .input-password-container{
        display: flex;
        align-items: center;

        height: 35px;
        border-radius: 4px;
        border: 1px solid #c8c8c8;
		background-color: white;
    }
    .input-password-container:focus-within{
        border-color: #b2b2b2;
    }

    .input-password-container_disabled{
        background-color: #e9e9e9;
    }
    .input-password{
        outline: none;
        border: 0;
        background-color: transparent;
        height: 100%;
        flex-grow: 1;
		width: 100%;
        padding: 0 4px;
    }

    .input-password__toggle{
        padding: 0 10px;
        height: 100%;
        display: grid;
        place-content: center;
        cursor: pointer;
    }
    .password-eye{
		box-sizing: content-box;
        width: 13px;
        height: 13px;
        border: solid 1px #000;
        border-radius:  75% 15%;
        position: relative;
        transform: rotate(45deg);
    }
    .password-eye:before {
        content: '';
        display: block;
        position: absolute;
        width: 5px;
        height: 5px;
        border: solid 1px #000;
        border-radius: 50%;
        left: 3px;
        top: 3px;
    }
    .password-eye_cross:after {
        content: '';
        display: block;
        position: absolute;
        height: 1px;
        width: 16px;
        background-color: black;
        left: -21%;
        top: 48%;
    }
	.input-password_error{
		border: 1px solid red;
	}
</style>
