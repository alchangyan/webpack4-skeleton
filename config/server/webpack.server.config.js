const path = require('path');
const nodeExternals = require('webpack-node-externals');
const env = require('dotenv').config({path: '.env'}).parsed;

const { ROOT_FOLDER, BUILD_FOLDER_NAME } = env;

module.exports = (env, argv) => {
  const SERVER_PATH = (argv.mode === 'production')
  ? path.join(__dirname) + '/server-prod.js'
  : path.join(__dirname) + '/server-dev.js';

  return ({
    entry: {
      server: SERVER_PATH,
    },
    output: {
      path: path.join(__dirname, ROOT_FOLDER, BUILD_FOLDER_NAME),
      publicPath: '/',
      filename: '[name].js'
    },
    mode: argv.mode,
    target: 'node',
    node: {
      // Need this when working with express, otherwise the build fails
      __dirname: false,
      __filename: false,
    },
    externals: [nodeExternals()], // Need this to avoid error when working with Express
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ]
    }
  })
}
