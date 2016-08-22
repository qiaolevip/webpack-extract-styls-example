const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');

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
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.css', '.styl', '.html']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
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
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: 'url?limit=1024&name=css/fonts/[name].[ext]',
        include: __dirname + '/src/stylus'
      },
      // Copy static assets while keeping directory structure
      {
        test: /\.(png|gif|jpe?g)$/,
        loaders: [
          'file?limit=1024&name=[path][name].[ext]&context=./src/',
          'image-webpack'
        ],
        include: __dirname + '/src/images'
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
    new HtmlWebpackPlugin({template: './src/index.html', inject: false}),
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, 'src/images/icons'),
        glob: '*.png'
      },
      target: {
        image: path.resolve(__dirname, 'src/spritesmith-generated/sprite.png'),
        css: path.resolve(__dirname, 'src/spritesmith-generated/sprite.styl')
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
      {from: '**/*',to:'images/',context:'src/images'}
    ]),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      comments: false
    })
  ]
};