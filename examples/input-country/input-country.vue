<template>
  <div>
    <input-field v-bind="$attrs" label = "Country" :options = "optionsCountries" type = "select"/>
  </div>
</template>

<script setup lang="ts">
import {InputField} from "../../src";

const optionsCountries = {
  1: "German",
  2: "USA",
  3: "Russia"
}
</script>
