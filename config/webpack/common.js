const path = require('path');
const webpack = require('webpack');

/* Plugins */
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const env = require('dotenv').config({path: '.env'}).parsed;
const { ROOT_FOLDER, BUILD_FOLDER_NAME } = env;

module.exports = {
  output: {
    "path": path.join(__dirname, ROOT_FOLDER, BUILD_FOLDER_NAME),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      /* JS */
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ],
      },
      /* Raw data */
      {
        test: /\.txt$/,
        use: 'raw-loader'
      },
      /* Styles */
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.sass$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      /* Images */
      {
        test: /\.(png|svg|jp(e)g|gif|ico)$/,
        use: [
          'file-loader',
        ]
      },
      /* Fonts */
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        // HTML LOADER
        test: /\.html$/,
        loader: 'html-loader'
      },
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.env": env
    }),
    new CopyPlugin([
      {
        from: 'static',
        to: 'static'
      }
    ]),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: true
    }),
    new InterpolateHtmlPlugin({
      STATIC_FOLDER: 'static',
    }),
  ]
}
