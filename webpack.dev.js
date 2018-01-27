const merge = require('webpack-merge');
const webpack = require('webpack');

const path = require('path');

const common = require('./webpack.common');

module.exports = merge(common, {
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './build',
    hot: true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('dev')
    })
  ]
});