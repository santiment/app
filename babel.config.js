module.exports = function(api) {
  const presets = [ [
    "@babel/preset-env",
    {
      "useBuiltIns": "usage",
      "targets": {
        "browsers": [
          ">0.2%",
          "not dead",
          "not ie <= 11",
          "not op_mini all"
        ]},
      "corejs": 2
    }
  ], '@babel/preset-react']
  const plugins = [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-object-assign'
  ]

  if (api.env('test')) {
    plugins.push('require-context-hook')
  }

  api.cache(false)

  return {
    presets,
    plugins
  }
}
