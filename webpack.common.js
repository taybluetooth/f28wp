const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    game: './src/client/index.js',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'stylesheet.css',
      template: 'src/client/css/stylesheet.css',
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css',
      template: 'src/client/css/main.css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/client/html/index.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'about.html',
      template: 'src/client/html/about.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'contact.html',
      template: 'src/client/html/contact.html',
    }),
  ],
};
