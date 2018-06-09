const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    'index': './example/index.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'example/index.html',
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer : {
    port: '8081',
    contentBase: path.join(__dirname, './example'),
    compress: true,
    // historyApiFallback: true,
    hot: true,
    host: '0.0.0.0'
  }
}