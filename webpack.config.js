var webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    'main': './src/scripts/main.js',
    'styles': './src/stylus/app.styl'
  },
  output: {
    path: './dist',
    filename: 'main.js'
  },
  devtool: '#cheap-module-source-map',
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.css']
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
        test: /\.styl/,
        loader: ExtractTextPlugin.extract('style', 'css!stylus'),
        include: __dirname + '/src/stylus'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css', {
      allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
};