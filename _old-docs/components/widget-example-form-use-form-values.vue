<template>
  <input-field name = "address.city.code" label = "Address.City.Code"/>
  <p>{{values}}</p> <!--Reactive {}-->
</template>

<script setup>
import {useFormValues, Form, InputField} from "../../src"

const form = new Form();
const values = useFormValues(form); // Reactive {}
</script>

<style scoped>

</style>