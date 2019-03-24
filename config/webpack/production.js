const merge = require('webpack-merge');
const common = require('./common');

/* Plugins */
const BabelMinifyPlugin = require('babel-minify-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  entry: "./src/index.js",
  optimization: {
    mangleWasmImports: true
  },
  plugins: [
    new BabelMinifyPlugin({
      mangle: { topLevel: true }
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    /* for serving with Content-Encoding */
    // new CompressionPlugin({
    //   test: /\.js(\?.*)?$/i
    // })
  ]
})
