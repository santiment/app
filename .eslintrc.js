module.exports = {
  parser: 'babel-eslint',
  plugins: ['react'],
  extends: [
    '@sheerun/eslint-config-standard/index.js',
    'plugin:react/recommended',
  ],
  rules: {
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'comma-dangle': 'off',
  },
}
