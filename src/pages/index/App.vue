<template>
    <div>
        <p>Test v-model</p>
        <input-field name = "1" type = "radio" v-model = "test" :options = "array" disabled
                     :validation = "[required]"
        />
        <input-field name = "1" type = "radio" v-model = "test" :options = "array" label = "Test"
        />
        <input-field name = "3" type = "checkbox" v-model = "test2" :options = "array"/>
        <input-field name = "3" type = "checkbox" v-model = "test2" :options = "array" disabled/>

        <input-field name = "4" type = "switch" v-model = "test3"/>
        <input-field name = "4" type = "switch" v-model = "test3" disabled/>
        <p>Value: {{test3}}</p>

        <input-field name = "5" type = "select" v-model = "test5" :options = "computedOptions"/>
        <input-field name = "5" type = "select" v-model = "test5" :options = "array" disabled/>
        <input-field name = "5" type = "select" v-model = "test5" :options = "arrayO"/>
        <p>{{test5}}</p>

        <input-field name = "pass" type = "password" v-model = "pass" />
        <input-field name = "pass" type = "password" v-model = "pass"  disabled/>
        <input-field name = "pass"  v-model = "pass"  />

        <input-field type = "address" name = "addressss" v-model = "test5" />
        <input-field type = "tel" name = "tel" label = "tel" v-model = "test6" />
        <input-field type = "tel" name = "tel" label = "tel" v-model = "test7" />
    </div>
</template>

<script setup lang = 'ts'>
    import InputField from "../../../plugin/widgets/input-field.vue";
    import {ref} from "vue";
    import {Form} from "../../../plugin";
    import config from "../../../plugin/config/config";
    import InputAddress from "./../../components/v2/input-address.vue";

    const form = new Form()
    window.form = form;
    const required = (v: any) => {
        console.log(v);
        return !!v || "Not empty";
    }
    const test = ref('2');
    const test2 = ref([]);
    const test3 = ref(false);
    const test5 = ref();
    const test6 = ref();
    const test7 = ref("+796275272");
    const ad = ref();
    const array = [
        { title: 'test', value: '1'},
        { title: 'test2', value: '2'}
    ]
    const arrayO = {
        1: 'test',
        2: 'test2',
        3: 'test3',
        4: 'test3',
        5: 'test3',
        6: 'test3',
        7: 'test3',
        8: 'test3',
        9: 'test3',
        10: 'test3',
        11: 'test3',
        12: 'test3',
        13: 'test3',
        14: 'test3',
        15: 'test3',
    }

    const computedOptions = ref([
        { title: 'test', value: '1'},
        { title: 'test2', value: '2'}
    ])

    setTimeout(() => {
        computedOptions.value.push({
            title: 'test3', value: '3'
        })
    }, 3000);

    const pass = ref("");

    config({
        inputTypes: {
            address: InputAddress
        }
    })

</script>

<style>


</style>
