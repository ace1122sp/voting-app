const path = require('path');

const config = {
  entry: [],
  output: {
    path: path.resolve('dist');
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.sass$/,
        loader: "extract-loader!style-loader!css-loader!postcss-loader!sass-loader"
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: { presets: ['env', 'react', 'stage-2'] }
      }
    ]
  }
}

module.exports = config;