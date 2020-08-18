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

  console.log(config)
  config.plugins.push(
    new CircularDependencyPlugin({
      // exclude detection of files based on a RegExp
      exclude: /SignalCard|WalletLink|OpenSignalLink|SharedTriggerForm|SignalMaster|SignalDialog|ViewBalanceDialog|MetricState|node_modules/,
      // include specific files based on a RegExp
      //include: /dir/,
      // add errors to webpack instead of warnings
      failOnError: true,
      allowAsyncCycles: false,
      // set the current working directory for displaying module paths
      cwd: process.cwd(),
    }),
  )
  return config
}
