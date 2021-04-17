module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    // '@nuxtjs',
    'plugin:vue/essential',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'prettier/vue',
    // "plugin:vue/essential",
    // 'prettier',
    // 'plugin:nuxt/recommended',
  ],
  plugins: ['vue', 'prettier'],
  // add your custom rules here
  rules: {
    'prefer-promise-reject-errors': 'off',

    // allow debugger during development only
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
}
