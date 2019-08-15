const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: process.env.NODE_ENV,

  entry: ['whatwg-fetch', path.resolve(__dirname, 'src/san-sonar-service-worker.js')],

  output: {
    path: path.resolve(__dirname, 'public/'),
    filename: 'san-sonar-service-worker.js',
    library: '',
  },

  stats: {
    colors: true
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
  ],

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          keep_fnames: true
        }
      }),
    ]
  }
}
