const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

function optimization() {
  if (isProd) {
    return {
      minimize: true,
      minimizer: [new TerserWebpackPlugin(), new CssMinimizerPlugin()],
    };
  }

  return {};
}

function filename(ext) {
  return isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;
}

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: filename('js'),
    publicPath: '/',
    clean: true,
  },
  mode: 'development',
  devServer: {
    port: 3000,
    open: true,
    compress: true,
    hot: isDev,
    client: {
      logging: 'error',
      overlay: {
        warnings: false,
      },
    },
    historyApiFallback: true,
  },
  devtool: isDev ? 'eval-source-map' : 'source-map',
  resolve: {
    modules: [path.resolve(__dirname, './src'), 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  plugins: [
    new Dotenv(),
    new HTMLWebpackPlugin({
      template: './public/index.html',
      minify: { collapseWhitespace: isProd },
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public/assets'),
          to: path.resolve(__dirname, 'dist'),
          noErrorOnMissing: true,
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
  ],
  optimization: optimization(),
  module: {
    rules: [
      {
        test: /\.(css)$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ttf|woff|woff2|eot)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ],
  },
};
