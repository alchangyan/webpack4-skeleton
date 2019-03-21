const commonConfig = require('./common');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const env = require('dotenv').config({path: '.env'}).parsed;
const path = require('path');

const {ROOT_FOLDER, BUILD_FOLDER_NAME, PORT} = env;

module.exports = Object.assign(commonConfig, {
  mode: 'development',
  /* Dev server */
  devServer: {
    contentBase: path.join(__dirname, ROOT_FOLDER, BUILD_FOLDER_NAME),
    hot: true,
    open: true,
    overlay: true,
    quiet: true,
    port: PORT,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": env
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin([{ from: 'static', to: 'static' }]),
    new HtmlWebpackPlugin({template: './src/index.html'}),
    new webpack.HotModuleReplacementPlugin(),
  ]
})
