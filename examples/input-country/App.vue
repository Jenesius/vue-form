<template>
  <div class = "container">
    <div>
      <h2>Values</h2>
      <pre class = "container-values">{{JSON.stringify(values, undefined, 4)}}</pre>
    </div>

    <div class = "wrap-app">
      <h2>Input Country</h2>
      <input-field name = "officeCountry" type = "country" />

      <button class = "button" @click = "form.cleanValues()">Clean Form</button>
    </div>
  </div>
</template>

<script setup lang='ts'>
import {config, Form, InputField, useFormValues} from "../../src";
import InputCountry from "./input-country.vue";
config({
  inputTypes: {
    country: InputCountry
  }
})

const form = new Form();
const values = useFormValues(form);


</script>

<style scoped >

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
