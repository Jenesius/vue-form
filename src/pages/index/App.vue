<template>
  <div class = "wrap-app">
    {{computedTest}}
    <input-field label="test" name="test" autofocus max-length="10"/>
    <input-field label="Pretty" :pretty="test" name="pretty" autofocus :placeholder="prettyPlaceholder"/>
    <input-field label="test" name="test" autofocus type="select" :options="radio" required/>
    <input-field type="file" name="file"/>
    <input-field  name="test" autofocus />

    <input-field type="textarea" name="textarea" label = "Description" autoresize />
    <input-field type="textarea" name="textareaa" label = "Description" autoresize = "6" />
    <input-field  name="test" autofocus />

    <input-field type="inside"/>
    <p>Changed: {{ state.changed }}</p>

    <button @click="onValidate">validate</button>
    <button @click="init">button</button>
    <button @click="disable()">disable</button>
    <p>Value: {{ radioValue }}</p>
  </div>
</template>

<script setup lang='ts'>
import InputField from "../../../plugin/widgets/input-field.vue";
import {Form, useFormState} from "../../../plugin";
import {computed, onMounted} from "vue";
import replaceValues from "../../../plugin/utils/replace-values";
import ComputedValue from "../../../plugin/methods/ComputedValue";
import plainObject from "../../../plugin/utils/plain-object";

const form = new Form();
const {state} = useFormState(form);

window.form = form;



const computedTest = ComputedValue(form, 'test');

form.setValues({
  textarea: `1
  2
  3
  4
  5
  6
  7`,
  textareaa: `1
  2
  3
  4
  5
  6
  7`
})




function onValidate() {
  console.log(form.validate());
}

const radio = {
  1: "test-1",
  2: "test-2",
  3: "ttt",
  "user": '142'
}
const radioValue = ComputedValue<number>(form, 'test');
const prettyPlaceholder = computed(() => {
  switch (radioValue.value) {
    case "1": {
      console.log('Identiy number')
      return "Identity number";
    }
    case "2":
      return "00-00000";
    default:
      return "xxxxxxxxx"
  }
})


function test(v?: string) {
  if (v === undefined) return ''
  v = v.replace(/\D/g, '');

  if (radioValue.value == 1) return v

  if (v.length < 3) return v;
  return v.slice(0, 2) + '-' + v.slice(2);
}

function init() {
  form.setValues({
    user: {
      name: 'Jenesius',
      age: 16
    }
  })
}


const disable = form.disable.bind(form)

</script>

<style>
body {
  background-color: #e9f3ff;
}
.wrap-app{
  min-height: 2000px;
}
</style>
