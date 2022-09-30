<template>
  <input-field v-bind = "$props" type = "select" :options = "options" name = "inside" />
</template>

<script setup lang = "ts">
import {InputField} from "./../../../plugin/index";

const options = {
  a: "name - 1",
  b: "name - 2"
}

</script>

<style scoped>

</style>