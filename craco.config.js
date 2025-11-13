const webpack = require('webpack');
const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Add buffer polyfill
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        buffer: require.resolve('buffer/'),
      };

      // Add Buffer as a global
      webpackConfig.plugins = [
        ...webpackConfig.plugins,
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
        }),
      ];

      // Ensure Babel can find the plugin in nested node_modules
      webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        '@babel/plugin-syntax-dynamic-import': path.resolve(
          __dirname,
          'node_modules/@babel/plugin-syntax-dynamic-import'
        ),
      };

      // Add module resolution to help find the plugin
      webpackConfig.resolve.modules = [
        ...(webpackConfig.resolve.modules || []),
        path.resolve(__dirname, 'node_modules'),
      ];

      return webpackConfig;
    },
  },
};

