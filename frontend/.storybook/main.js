// 参考：https://storybook.js.org/docs/configurations/typescript-config/
const path = require('path')
const postcssNormalize = require('postcss-normalize')

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.less$/,
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [
              require('postcss-flexbugs-fixes'),
              require('postcss-preset-env')({
                autoprefixer: {
                  flexbox: 'no-2009'
                },
                stage: 3
              }),
              // Adds PostCSS Normalize as the reset css with default options,
              // so that it honors browserslist config in package.json
              // which in turn let's users customize the target behavior as per their needs.
              postcssNormalize()
            ],
          },
        },
        {
          loader: 'less-loader'
        },
      ],
    });
    config.resolve.extensions.push(...['.js', '.jsx', '.ts', '.tsx', '*']);

    const alias = {
      '@': path.resolve(path.join(__dirname, '../src')),
    };

    for (const key in alias) {
      config.resolve.alias[key] = alias[key];
    }
    return config;
  },
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ]
}
