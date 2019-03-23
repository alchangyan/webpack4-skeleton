const commonConfig = require('./common');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const env = require('dotenv').config({path: '.env'}).parsed;

module.exports = Object.assign(commonConfig, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      "process.env": env
    }),
    new CopyPlugin([{ from: 'static', to: 'static' }]),
    new HtmlWebpackPlugin({template: './src/index.html' }),
    new InterpolateHtmlPlugin({
      STATIC_FOLDER: 'static',
    }),
  ]
})
