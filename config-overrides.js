const webpack = require('webpack')
const path = require('path')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = function override(config, env) {
  config.resolve.extensions.push('.svelte')

  config.module.rules
    .find((rule) => !!rule.oneOf)
    .oneOf.find((rule) => rule.loader && rule.loader.includes('file-loader'))
    .exclude.push(/\.svelte$/)

  config.resolve.alias.svelte = path.resolve('node_modules', 'svelte')
  config.resolve.alias['@sapper/app'] = path.resolve(__dirname, 'src/svelte.js')
  config.resolve.alias['@/apollo'] = path.resolve(
    __dirname,
    'src/apollo/index.js',
  )

  config.resolve.alias['studio'] = path.resolve('node_modules/san-studio/lib')
  config.resolve.alias['webkit'] = path.resolve('node_modules/san-webkit/lib')

  config.resolve.mainFields = ['svelte', 'browser', 'module', 'main']

  config.module.rules.splice(2, 0, {
    test: /\.svelte/,
    use: {
      loader: 'svelte-loader',
    },
  })

  config.plugins.push(
    new CircularDependencyPlugin({
      exclude: /SignalMaster|OpenSignalLink|SignalCard|node_modules/,
      failOnError: true,
      allowAsyncCycles: false,
      cwd: process.cwd(),
    }),
  )

  const dev = process.env.NODE_ENV === 'development'

  config.plugins.push(
    new webpack.DefinePlugin({
      'process.browser': true,
      'process.env.GQL_SERVER_URL': dev
        ? JSON.stringify(process.env.REACT_APP_BACKEND_URL + '/graphql')
        : '(window.env || {}).BACKEND_URL + "/graphql"',
      'process.env.SPRITES_PATH': JSON.stringify('/static/sprites'),
      'process.env.ICONS_PATH': JSON.stringify('/static/icons'),
    }),
  )

  config.plugins.push(
    new CopyPlugin([
      {
        from: path.resolve('node_modules/san-webkit/lib/sprites/*.svg'),
        to: 'static/sprites',
        flatten: true,
      },
      {
        from: path.resolve('node_modules/san-webkit/lib/icons/*.svg'),
        to: 'static/icons',
        flatten: true,
      },
    ]),
  )

  return config
}
