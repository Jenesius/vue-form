const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: {
      entry: './src/main.ts'
    },
    v2: {
      entry: './src/pages/v2/main.ts'
    }
  }
})
