const merge = require('webpack-merge');
const common = require('./common');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  entry: {
    index: [
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&noInfo=true&quiet=true',
      './src/index.js'
    ],
    main: [
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&noInfo=true&quiet=true',
      './src/main.js'
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
})
