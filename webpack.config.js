const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');

const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin');
const dashboard = new Dashboard();

const srcPath = path.resolve(__dirname, 'src');
module.exports = {
  devtool: 'eval',
  entry: [`${srcPath}/scripts/main.js`, `${srcPath}/stylus/app.styl`],
  output: {
    path: './dist',
    filename: 'js/main.js'
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.css', '.styl', '.html']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: `${srcPath}/scripts`
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css'),
        //loader: ExtractTextPlugin.extract('css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'),
        include: `${srcPath}/styles`
      },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract('style', 'css!stylus'),
        include: `${srcPath}/stylus`
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: 'url?limit=1024&name=/css/fonts/[name].[ext]',
        include: `${srcPath}/stylus`
      },
      // Copy static assets while keeping directory structure
      {
        test: /\.(png|gif|jpe?g)$/,
        loaders: [
          'file?limit=1024&name=[path][name].[ext]&context=./src/',
          'image-webpack'
        ],
        include: `${srcPath}/images`
      },
      /*{
       test: /\.(html)$/,
       loader: 'file-loader?name=[name].[ext]'
       }*/
    ]
  },
  plugins: [
    new webpack.BannerPlugin('Copyright qiaole@vip.qq.com@Joe.'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new DashboardPlugin(dashboard.setData),
    new HtmlWebpackPlugin({template: `${srcPath}/index.html`, inject: false}),
    new SpritesmithPlugin({
      src: {
        cwd: `${srcPath}/images/icons`,
        glob: '*.png'
      },
      target: {
        image: `${srcPath}/spritesmith-generated/sprite.png`,
        css:`${srcPath}/spritesmith-generated/sprite.styl`
      },
      apiOptions: {
        cssImageRef: "~sprite.png"
      }
    }),
    new ExtractTextPlugin('css/[name].css', {
      allChunks: true
    }),
    new CopyWebpackPlugin([
      {from: 'static/**/*'},
      // Copy static assets while keeping directory structure
      {from: '**/*',to:'images/',context:`${srcPath}/images`}
    ]),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      comments: false
    })
  ]
};