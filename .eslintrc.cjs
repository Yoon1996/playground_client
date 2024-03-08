module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', '@typescript-eslint',
    'prettier'],
  rules: {

    "no-unused-vars":"off",
    "@typescript-eslint/no-unused-vars": ["warn"],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'prettier/prettier': [
      // 'error', {
      //   'endOfLine': 'auto'
      // }
      "warn"
    ],
    "@typescript-eslint/no-explicit-any": "off"
  },
}

