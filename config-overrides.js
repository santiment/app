const path = require('path')
const CircularDependencyPlugin = require('circular-dependency-plugin')

module.exports = function override(config, env) {
  config.resolve.extensions.push('.svelte')

  config.module.rules
    .find((rule) => !!rule.oneOf)
    .oneOf.find((rule) => rule.loader && rule.loader.includes('file-loader'))
    .exclude.push(/\.svelte$/)

  config.resolve.alias.svelte = path.resolve('node_modules', 'svelte')
  config.resolve.alias['@sapper/app'] = path.resolve(
    __dirname,
    'src',
    'svelte.js',
  )

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
  return config
}
