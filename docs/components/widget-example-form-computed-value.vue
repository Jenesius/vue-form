<template>
  <input-field name = "address.city.code" label = "Address.City.Code"/>
  <p>Computed value: {{cityCode}}</p> <!--Reactive {}-->
</template>

<script setup>
import {ComputedValue, Form, InputField} from "../../plugin"

const form = new Form();
const cityCode = ComputedValue(form, "address.city.code"); // ComputedRef
</script>

<style scoped>

</style>