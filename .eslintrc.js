module.exports = {
  parser: 'babel-eslint',
  plugins: ['react'],
  extends: [
    'plugin:react/recommended',
  ],
  rules: {
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'comma-dangle': 'off',
  },
}
