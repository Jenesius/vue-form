<template>
  <div>
    <p>{{$attrs.label}}</p>
    <input class = "input-otp" type = "text" v-bind = "$attrs" :value="$attrs.modelValue" @input = "$emit('update:modelValue', $event.target.value)"/>

    <div class = "error-list">
      <p
        v-for = "(error, index) in $attrs.errors"
        :key = "index"
      >{{error}}</p>
    </div>
  </div>
</template>

<script setup lang="ts">



</script>
<style scoped>
  .input-otp{
    height: 35px;
    border-radius: 4px;
    border: 1px solid #c8c8c8;
    outline: none;
    padding: 0 4px;
    color: #1c1c1c;
  }
  .error-list {
    color: red;
    font-size: 14px;
  }
</style>
