module.exports = {
  // 高版本的 standard-with-typescript 貌似有 Bug，无法声明 naming-convention
  // 因此将版本号固定在了 package.json 中
  extends: ['standard-with-typescript'],
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    '@typescript-eslint/strict-boolean-expressions': 0,
    // https://github.com/typescript-eslint/typescript-eslint/blob/ef88a696a157f617d38ce6d49207a4a4a089a19b/packages/eslint-plugin/docs/rules/naming-convention.md#enforce-that-interface-names-do-not-begin-with-an-i
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: false
        }
      }
    ],
    '@typescript-eslint/prefer-nullish-coalescing': 0
  },
  overrides: [
    // storybook 特定规则
    {
      files: [
        '**/**.stories.tsx'
      ],
      rules: {
        'import/no-anonymous-default-export': 0,
        'no-console': 0,
        '@typescript-eslint/consistent-type-assertions': 0
      }
    },
    // 根目录配置文件特定规则
    {
      files: [
        './*.js',
        './*.ts'
      ],
      rules: {
        'import/no-anonymous-default-export': 0,
        'filenames/match-exported': 0
      }
    }
  ]
}
