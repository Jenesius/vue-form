<template>
  <div class = "container">
    <div>
      <h2>Values</h2>
      <pre class = "container-values">{{JSON.stringify(values, undefined, 4)}}</pre>
    </div>

    <div class = "wrap-app">
      <h2>Input One-time</h2>
      <input-field name = "one-time-password" type = "otp" maxLength = "5" required label = "Fill OneTime Password"/>

      <button class = "button" @click = "form.cleanValues()">Clean Form</button>
    </div>
  </div>
</template>

<script setup lang='ts'>
import {config, Form, InputField, useFormValues} from "../../plugin";
import InputOTP from "./input-otp.vue";
config({
  inputTypes: {
    otp: InputOTP
  }
})

const form = new Form();
// @ts-ignore
window.form = form;
const values = useFormValues(form);


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
