const path = require('path');

module.exports = {
  entry: "./src/index.js",
  output: {
    "path": path(__dirname, 'build') ,
    filename: 'first-bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: 'raw-loader'
      }
    ]
  }
}