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
    }
  }
})
