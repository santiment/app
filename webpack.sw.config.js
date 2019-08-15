const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')
const dotenv = require('dotenv')

const envConfig = {...dotenv.config().parsed, ...dotenv.config({path: './.env.local'}).parsed}
const apiUrl = envConfig.REACT_APP_BACKEND_URL || process.env.REACT_APP_BACKEND_URL
const uiUrl = envConfig.REACT_APP_WEBSITE_URL || process.env.REACT_APP_WEBSITE_URL

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
    new webpack.DefinePlugin({
      __API_URL__: JSON.stringify(apiUrl),
      __UI_URL__: JSON.stringify(uiUrl)
    })
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
