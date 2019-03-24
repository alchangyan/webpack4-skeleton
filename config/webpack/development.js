const merge = require('webpack-merge');
const common = require('./common');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  entry: {
    main: [
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&noInfo=true&quiet=true',
      './src/index.js'
    ]
  },
  plugins: [
    new webpack.AutomaticPrefetchPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
})
