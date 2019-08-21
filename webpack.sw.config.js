const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const minimizers = []

// GarageInc: special
if(false && process.env.NODE_ENV === 'production'){
  minimizers.push(
    new UglifyJsPlugin({
      uglifyOptions: {
        keep_fnames: true
      }
    }))
}

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
