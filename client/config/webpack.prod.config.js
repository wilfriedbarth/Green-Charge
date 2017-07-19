const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const WebpackChunkHash = require('webpack-chunk-hash');
const WebpackManifestPlugin = require('webpack-manifest-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'source-map',
  entry: {
    bundle: path.join(__dirname, '../src/index.js')
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js','.jsx','.json']
  },
  module: {
    rules: [
      { 
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { 
          cacheDirectory: true
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { 
                sourceMap: true,
                minimize: true,
                importLoaders: 2,
                modules: true,
                localIdentName: '[name]__[local]___[hash:base64:5]'
              }
            },
            { 
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                ident: 'postcss',
                plugins: () => [ 
                  require('postcss-flexbugs-fixes'),
                  autoprefixer({
                    browsers: [
                      '>1%',
                      'last 4 versions',
                      'Firefox ESR',
                      'not ie < 9'
                    ],
                    flexbox: 'no-2009'
                  })
                ]
              }
            },
            {
              loader: 'sass-loader', 
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.scss$/,
          /\.json$/,
          /\.bmp$/,
          /\.gif$/,
          /\.jpe?g$/,
          /\.png$/
        ],
        loader: 'file-loader',
        options: {
          name: '[name].[chunkhash:8].[ext]'
        }
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[chunkhash:8].[ext]'
        }
      },
      {
        test: /test.js$/,
        exclude: /node_modules/,
        loader: 'mocha-loader'
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      minChunks: Infinity
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true,
        warnings: false
      },
      comments: false
    }),
    new WebpackChunkHash(),
    new WebpackManifestPlugin(),
    new HTMLWebpackPlugin({ 
      inject: true,
      template: path.join(__dirname, '../src/index.html')
    }),
    new CleanWebpackPlugin(
      ['dist'],
      { root: path.join(__dirname, '../') }
    ),
    new ExtractTextWebpackPlugin('[name].[contenthash:8].css')
  ],
};

