const webpack = require('webpack')
const path = require('path')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const cssModules = require('svelte-preprocess-cssmodules')
const sveltePreprocess = require('svelte-preprocess')

module.exports = function override(config, env) {
  config.resolve.extensions.push('.svelte')

  config.module.rules
    .find((rule) => !!rule.oneOf)
    .oneOf.find((rule) => rule.loader && rule.loader.includes('file-loader'))
    .exclude.push(/\.svelte$/)

  const urlLoader = config.module.rules
    .find((rule) => !!rule.oneOf)
    .oneOf.find((rule) => rule.loader && rule.loader.includes('url-loader'))

  if (urlLoader) {
    urlLoader.options.limit = 1000
  }

  const babelLoader = config.module.rules
    .find((rule) => !!rule.oneOf)
    .oneOf.find((rule) => rule.loader && rule.loader.includes('babel-loader'))

  babelLoader.include = [path.resolve('src'), path.resolve('node_modules/monaco-editor')]
  babelLoader.options.plugins.push('@babel/plugin-proposal-optional-chaining')

  config.resolve.alias.svelte = path.resolve('node_modules', 'svelte')
  config.resolve.alias['@sapper/app'] = path.resolve(__dirname, 'src/svelte.js')
  config.resolve.alias['@/apollo'] = path.resolve(__dirname, 'src/apollo/index.js')

  config.resolve.alias['@cmp'] = path.resolve(__dirname, 'src/components')
  config.resolve.alias['@'] = path.resolve(__dirname, 'src')

  config.resolve.alias['studio'] = path.resolve('node_modules/san-studio/lib')
  config.resolve.alias['insights'] = path.resolve('node_modules/san-insights/lib')
  config.resolve.alias['webkit'] = path.resolve('node_modules/san-webkit/lib')

  config.resolve.alias['svelte'] = path.resolve('node_modules/svelte')
  config.resolve.alias['san-webkit/lib'] = path.resolve('node_modules/san-webkit/lib')
  config.resolve.alias['san-studio/lib'] = path.resolve('node_modules/san-studio/lib')

  config.resolve.mainFields = ['svelte', 'browser', 'module', 'main']

  config.module.rules.splice(2, 0, {
    test: /\.svelte/,
    use: {
      loader: 'svelte-loader',
      options: {
        preprocess: [
          cssModules(),
          sveltePreprocess({
            assumptions: { noDocumentAll: true },
            plugins: ['@babel/plugin-proposal-optional-chaining'],
          }),
        ],
      },
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
        : '`https://api${window.location.hostname.includes("stage") ? "-stage" : ""}.santiment.net/graphql`',
      'process.env.IS_DEV_MODE': dev,
      'process.env.MEDIA_PATH': JSON.stringify('/static'),
      'process.env.ICONS_PATH': JSON.stringify('/static/icons'),
      'process.env.IS_PROD_BACKEND': dev
        ? (process.env.REACT_APP_BACKEND_URL || '').includes('-stage') === false
        : 'window.location.hostname.includes("-stage") === false',

      'process.env.IS_STAGE_BACKEND': dev
        ? (process.env.REACT_APP_BACKEND_URL || '').includes('-stage')
        : 'window.location.hostname.includes("-stage")',
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
        from: path.resolve('node_modules/san-webkit/lib/sprites/editor/*.svg'),
        to: 'static/sprites/editor',
        flatten: true,
      },
      {
        // NOTE(vanguard): update CopyPlugin to use recursive copy
        from: path.resolve('node_modules/san-webkit/lib/sprites/illus/*.svg'),
        to: 'static/sprites/illus',
        flatten: true,
      },
      {
        from: path.resolve('node_modules/san-webkit/lib/sprites/illus/halloween/*.svg'),
        to: 'static/sprites/illus/halloween',
        flatten: true,
      },
      {
        from: path.resolve('node_modules/san-webkit/lib/sprites/illus/christmas/*.svg'),
        to: 'static/sprites/illus/christmas',
        flatten: true,
      },
      {
        from: path.resolve('node_modules/san-webkit/lib/icons/*.svg'),
        to: 'static/icons',
        flatten: true,
      },
      {
        from: path.resolve('node_modules/san-webkit/lib/illus/*.svg'),
        to: 'static/illus',
        flatten: true,
      },
      {
        from: path.resolve('node_modules/san-webkit/lib/illus/halloween/*.svg'),
        to: 'static/illus/halloween',
        flatten: true,
      },
      {
        from: path.resolve('node_modules/san-webkit/lib/illus/christmas/*.svg'),
        to: 'static/illus/christmas',
        flatten: true,
      },
    ]),
  )

  return config
}
