<template>
  <div class = "container">
    <div>
      <h2>Values</h2>
      <pre class = "container-values">{{JSON.stringify(values, undefined, 4)}}</pre>
    </div>

    <div class = "wrap-app">
      <h2>Simple Form</h2>
      <input-field name = "username" label = "Username"/>
      <input-field name = "about" label = "About yourself" type = "textarea"/>
      <input-field name = "gender" label = "Gender" type = "radio" :options = "sexOptions"/>
      <input-field name = "language" label = "Language" type = "select" :options = "languageOptions" />
      <input-field name = "age" label = "Age" type = "number"/>
      <input-field name = "mobile" type = "tel" label = "Mobile phone" required/>
      <input-field name = "range" type = "range" label = "Volume"/>
      <input-field name = "isProgrammer" label = "You are programmer" type = "switch" class="padding_10"/>

      <input-field name = "programLanguages" label = "Program language" type = "checkbox"
                   :options = "programLanguageOptions" v-if = "computedIsProgrammer"/>
      <button class = "button" @click = "form.cleanValues()">Clean Form</button>
    </div>
  </div>
</template>

<script setup lang='ts'>

import {ComputedValue, Form, InputField, useFormValues} from "../../src";

const form = new Form({name: "Simple Form"});
window.form = form;
const computedIsProgrammer = ComputedValue(form, 'isProgrammer');
const values = useFormValues(form);

/*JUST ENUMS*/
const sexOptions = {
  0: "female",
  1: "male"
}
const languageOptions = {
  1: "English",
  2: "Dutch",
  3: "Chinese",
  4: "Portuguese",
  5: "Spanish",
  6: "Italian",
  7: "Russian"
}
const programLanguageOptions = {
  1: "JavaScript",
  2: "TypeScript",
  3: "Assembler",
  4: "C++"
}

</script>

<style>
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
body {
  font-family: sans-serif;
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
