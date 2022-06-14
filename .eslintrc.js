module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    // 这里增加一行，用于支持后面的测试环境
    jest: true
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module'
  },
  rules: {
    'import/prefer-default-export': 0,
    'comma-dangle': [2, 'never'],
    semi: [2, 'never'],
    'linebreak-style': ['error', 'windows'],
    'no-use-before-define': 0,
    'no-shadow': 0,
    'no-restricted-syntax': 0,
    'no-return-assign': 0,
    'no-param-reassign': 0,
    'no-sequences': 0,
    'no-loop-func': 0,
    'no-nested-ternary': 0,
    'object-curly-newline': 0,
    'import/no-unresolved': 0,
    'operator-linebreak': 0,
    'max-len': 0,
    'semi-style': 0,
    'implicit-arrow-linebreak': 0,
    'function-paren-newline': 0,
    'no-bitwise': 0,
    indent: 0
  }
}
