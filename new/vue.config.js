const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 5000 // O cualquier otro puerto que desees utilizar
  }
});
