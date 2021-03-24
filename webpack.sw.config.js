const path = require('path')

const minimizers = []

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
    minimizer: minimizers
  }
}
