module.exports = {
  // 高版本的 standard-with-typescript 貌似有 Bug，无法声明 naming-convention
  // 因此将版本号固定在了 package.json 中
  extends: [
    'standard-with-typescript',
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended', //
    'plugin:react/recommended',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'no-console': 'warn',
    'react/jsx-sort-props': 'error',
    'react/prop-types': 0,
    '@typescript-eslint/strict-boolean-expressions': 0,
    // https://github.com/typescript-eslint/typescript-eslint/blob/ef88a696a157f617d38ce6d49207a4a4a089a19b/packages/eslint-plugin/docs/rules/naming-convention.md#enforce-that-interface-names-do-not-begin-with-an-i
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: false,
        },
      },
    ],
    '@typescript-eslint/prefer-nullish-coalescing': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
  },
  overrides: [
    // storybook 特定规则
    {
      files: ['**/**.stories.tsx'],
      rules: {
        'import/no-anonymous-default-export': 0,
        'no-console': 0,
        '@typescript-eslint/consistent-type-assertions': 0,
      },
    },
    // 根目录配置文件特定规则
    {
      files: ['./*.js', './*.ts'],
      rules: {
        'import/no-anonymous-default-export': 0,
        'filenames/match-exported': 0,
      },
    },
  ],
  settings: {
    react: {
      version: '17.0.1', // React version. "detect" automatically picks the version you have installed.
      // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
      // default to latest and warns if missing
      // It will default to "detect" in the future
    },
  },
}
