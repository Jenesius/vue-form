const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: {
      entry: './src/pages/index/main.ts'
    },
    "simple-form": {
      entry: './examples/simple-form/main.ts'
    },
    "disable-form": {
      entry: './examples/disable-enable-form/main.ts'
    },
    "form-changes": {
      entry: "./examples/form-changes/main.ts"
    },
    "form-proxy": {
      entry: "./examples/form-proxy/main.ts"
    },
    "input-country": {
      entry: "./examples/input-country/main.ts"
    },
    "input-otp": {
      entry: "./examples/input-otp/main.ts"
    },
    "test": {
      entry: "./src/pages/test/main.ts"
    },
    "inputs": {
      entry: "./src/pages/inputs/main.ts"
    }
  }
})
