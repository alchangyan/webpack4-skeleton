const commonConfig = require('./common');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const env = require('dotenv').config({path: '.env'}).parsed;

const InterpolateHtmlPlugin = require('interpolate-html-plugin');

module.exports = Object.assign(commonConfig, {
  mode: 'development',
  entry: {
    main: [
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&noInfo=true&quiet=true',
      './src/index.js'
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": env
    }),
    new CopyPlugin([{ from: 'static', to: 'static' }]),
    new HtmlWebpackPlugin({template: './src/index.html' }),
    new InterpolateHtmlPlugin({
      STATIC_FOLDER: 'static',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
})
