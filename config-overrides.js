const path = require('path')

module.exports = function override(config, env) {
  config.resolve.extensions.push('svelte')

  config.module.rules
    .find(rule => !!rule.oneOf)
    .oneOf.find(rule => rule.loader && rule.loader.includes('file-loader'))
    .exclude.push(/\.svelte$/)

  config.resolve.alias.svelte = path.resolve('node_modules', 'svelte')

  config.resolve.mainFields = ['svelte', 'browser', 'module', 'main']

  config.module.rules.splice(2, 0, {
    test: /\.svelte/,
    use: {
      loader: 'svelte-loader',
      options: {
        emitCss: true,
      },
    },
  })

  return config
}
