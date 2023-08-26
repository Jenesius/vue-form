const { defineConfig } = require('@vue/cli-service')
const path = require("path");
module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: {
      entry: './project/pages/index/main.ts'
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
      entry: "./project/pages/test/main.ts"
    },
    "inputs": {
      entry: "./project/pages/inputs/main.ts"
    },
    "input-select": {
      entry: "./examples/input-select/main.ts"
    },
    "input-checkbox": {
      entry: "./examples/input-checkbox/main.ts"
    },
    "all-inputs": {
      entry: "./examples/all-inputs/main.ts"
    },
    "input-single-radio": {
      entry: "./examples/input-single-radio/main.ts"
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, 'project')
      }
    }
  }
})
