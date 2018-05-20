const path = require('path');

const config = {
  entry: ['./client/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true
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
