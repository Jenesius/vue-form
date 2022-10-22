const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: {
      entry: './src/pages/index/main.ts'
    },
    "simple-form": {
      entry: './examples/simple-form.md/main.ts'
    }
  }
})
