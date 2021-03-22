const path = require('path');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  webpackFinal: async (config) => {
     // Make whatever fine-grained changes you need
     config.module.rules.push({
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      });

      config.resolve.alias = {
        '@forms': path.join(__dirname, '../', 'src', 'forms'),
        '@icons': path.join(__dirname, '../', 'src', 'icons'),
        '@layouts': path.join(__dirname, '../', 'src', 'layouts'),
        '@components': path.join(__dirname, '../', 'src', 'components'),
        '@utils': path.join(__dirname, '../', 'src', 'utils'),
        '@lib': path.join(__dirname, '../', 'lib'),
    };

    return config;
  },
}
