const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin  = require('html-webpack-plugin');

const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin');
const dashboard = new Dashboard();

module.exports = {
  devtool: 'eval',
  entry: {
    'main': './src/scripts/main.js',
    'styles': './src/stylus/app.styl'
  },
  output: {
    path: './dist',
    filename: 'js/main.js'
  },
  devtool: '#cheap-module-source-map',
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.css', '.styl', '.html']
  },
  module: {
    loaders: [
      {
        test: /\.js/,
        loader: 'babel',
        include: __dirname + '/src/scripts'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css'),
        //loader: ExtractTextPlugin.extract('css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'),
        include: __dirname + '/src/styles'
      },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract('style', 'css!stylus'),
        include: __dirname + '/src/stylus'
      },
      {
        test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader : 'url?limit=1024&name=css/fonts/[name].[ext]',
        include: __dirname + '/src/stylus'
      },
      {
        test   : /\.(png|gif|jpe?g)$/,
        loader : 'file?limit=1024&name=images/[name].[ext]',
        include: __dirname + '/src/images'
      },
      /*{
        test: /\.(html)$/,
        loader: 'file-loader?name=[name].[ext]'
      }*/
    ]
  },
  plugins: [
    new DashboardPlugin(dashboard.setData),
    new HtmlWebpackPlugin({ template: './src/index.html', inject: false }),
    new ExtractTextPlugin('css/[name].css', {
      allChunks: true
    }),
    new CopyWebpackPlugin([
      { from: 'static/**/*' }
    ]),
    new webpack.optimize.UglifyJsPlugin()
  ]
};