const merge = require('webpack-merge');// eslint-disable-line import/no-extraneous-dependencies
const path = require('path');// eslint-disable-line
const TerserPlugin = require('terser-webpack-plugin');// eslint-disable-line import/no-extraneous-dependencies
const base = require('./base');

module.exports = merge(base, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.min.js',
  },
  devtool: false,
  performance: {
    maxEntrypointSize: 900000,
    maxAssetSize: 900000,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
});
