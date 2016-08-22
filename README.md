## Installation

Install all dependencies. 

```
$ npm install
```

## Extract import / require css styles

```
 entry.js import / require css file
```

## Extract direct stylus / sass / less styles

```
 webpack.config.js entry add stylus main file
```
```

## Extract stylus / sass / less styles using extract-text-webpack-plugin

```
const ExtractTextPlugin = require('extract-text-webpack-plugin');

Loaders:
{
  test: /\.styl$/,
  loader: ExtractTextPlugin.extract('style', 'css!stylus'),
  include: __dirname + '/src/stylus'
}

Plugins:
new ExtractTextPlugin('css/[name].css', {
  allChunks: true
})
```

## Create Html template file using html-webpack-plugin

```
const HtmlWebpackPlugin = require('html-webpack-plugin');

Plugins:
new HtmlWebpackPlugin({template: './src/index.html', inject: false})
```

## Copy files from dirctory to destination using copy-webpack-plugin

```
const CopyWebpackPlugin = require('copy-webpack-plugin');

Plugins:
new CopyWebpackPlugin([
  {from: 'static/**/*'},
  // Copy static assets while keeping directory structure
  {from: '**/*',to:'images/',context:'src/images'}
])
```

## Make picture to sprite picture using webpack-spritesmith

```
const SpritesmithPlugin = require('webpack-spritesmith');

Plugins:
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
})
```

## Compress images using image-webpack-loader
```
{
  test: /\.(png|gif|jpe?g)$/,
  loaders: [
    'file?limit=1024&name=[path][name].[ext]&context=./src/',
    'image-webpack'
  ],
  include: __dirname + '/src/images'
}
```
