const path = require('path');
const webpack = require('webpack');

/* Plugins */
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const env = require('dotenv').config({path: '.env'}).parsed;
const { ROOT_FOLDER, BUILD_FOLDER_NAME } = env;

/* Configuration */
const { pages } = require('../pages');

const HtmlWebpackPluginCollection = pages.map(page => 
  new HtmlWebpackPlugin({
    filename: `${page.name}.html`,
    template: `./src/index.html`,
    chunks: [page.name],
    minify: true
  })
);

const devMode = env.ENV === 'development';

module.exports = {
  output: {
    path: path.join(__dirname, ROOT_FOLDER, BUILD_FOLDER_NAME),
    filename: './js/[name].js',
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
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
      {
        test: /\.sass$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ],
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
    extensions: ['.js', '.jsx']
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
    ...HtmlWebpackPluginCollection,
    // new MiniCssExtractPlugin({
    //   filename: "./css/[name].css"
    // }),
    new InterpolateHtmlPlugin({
      STATIC_FOLDER: 'static',
    })
  ]
}



/* 


const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')

let HWPConfig = new HtmlWebpackPlugin({
  template: __dirname + "/index.html",
  file: "index.html",
  inject: "body"

let articlesHtmlPlugin = ['sass-react', 'chart-js', 'copy-right', 'object-literal', 'spread-operator'];

let multiplesFiles = articles.map(function(entryName) {
  return new HtmlWebpackPlugin({
    filename: entryName + '.html',
    template: __dirname + `/articles/{entryName}.html`
})

module.exports = {
  .
  .
  .
  plugins: [
    HWPConfig
  ].concat(articlesHtmlPlugin)
};


*/
