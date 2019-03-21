const commonConfig = require('./common');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const env = require('dotenv').config({path: '.env'}).parsed;

module.exports = Object.assign(commonConfig, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      "process.env": env
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin([{ from: 'static', to: 'static' }]),
    new HtmlWebpackPlugin({template: './src/index.html'}),
  ]
})
