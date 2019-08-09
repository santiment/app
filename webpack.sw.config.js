const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  mode: 'production',

  entry: ['whatwg-fetch', path.resolve(__dirname, 'src/san-service-worker.js')],

  output: {
    path: path.resolve(__dirname, 'public/'),
    filename: 'san-service-worker.js',
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
