const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const path = require('path');

module.exports = {
  mode: 'development',
  entry: "./src/index.js",
  output: {
    "path": path.join(__dirname, 'build'),
    filename: 'first-bundle.js'
  },
  /* Dev server */
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    hot: true,
    hotOnly: true,
    open: true,
    overlay: true,
    port: 4000
  },
  module: {
    rules: [
      /* JS */
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
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
      /* HTML loader */
      /* {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'html-loader'
        ]
      } */
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([{ from: 'static', to: 'static' }]),
    new HtmlWebpackPlugin({template: './public/index.html'}),
    new webpack.HotModuleReplacementPlugin()
  ]
}