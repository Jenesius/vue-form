<template>
  <div class = "container">
    <div>
      <h2>Just Changes</h2>
      <pre class = "container-values" :key = "changesKey">{{JSON.stringify(form.changes, undefined, 4)}}</pre>
      <h2>Values</h2>
      <pre class = "container-values" :key = "changesKey">{{JSON.stringify(values, undefined, 4)}}</pre>
    </div>

    <div class = "wrap-app">
      <h2>Form Changes</h2>
      <input-field name = "username" label = "Username"/>
      <input-field name = "about" label = "About yourself" type = "textarea"/>
      <input-field name = "gender" label = "Gender" type = "radio" :options = "sexOptions"/>
      <input-field name = "programLanguages" label = "Program language" type = "checkbox" :options = "programLanguageOptions" />

      <button class = "button" @click = "form.cleanChanges(); setDefaultValues()">Clean changes & set default values</button>
      <button class = "button" @click = "form.cleanValues();">Clean values</button>
      <button class = "button" @click = "form.cleanChanges();">Clean changes</button>

    </div>
  </div>
</template>

<script setup lang='ts'>

import {Form, InputField, useFormValues} from "../../src";
import {ref} from "vue";

const form = new Form();
const values = useFormValues(form);

function setDefaultValues() {
  form.setValues({
    username: "Robot",
    about: "I'm robot."
  })
}

/**
 * Just for reactive update changes. Not for Education or Examples.
 * */
const changesKey = ref(0);
form.on(Form.EVENT_CHANGED, () => {
  changesKey.value++;
})

/*JUST ENUMS*/
const sexOptions = {
  0: "female",
  1: "male"
}
const programLanguageOptions = {
  1: "JavaScript",
  2: "TypeScript",
  3: "Assembler",
  4: "C++"
}

</script>

<style scoped>
.container{
  display: flex;
}
@media screen and (max-width: 768px) {
  .container{
    flex-direction: column;
  }
}
.wrap-app{
  width: 100%;
  max-width: 600px;
  margin:  auto auto;
}

.padding_10{
  padding: 10px 0;
}
.container-values{
  width: 300px;
  padding: 20px 0;
}
.button{
  cursor: pointer;
  padding: 6px 10px;
  border: 1px solid lightgray;
  background-color: white;
  transition: transform;
}
.button:hover {
  transform: scale(.96);
}
</style>
