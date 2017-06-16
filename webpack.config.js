let _ = require('lodash');
let webpack = require('webpack');
let path = require('path');

let babelOptions = {
  "presets": "es2015"
};

function isVendor(module) {
  return module.context && module.context.indexOf('node_modules') !== -1;
}

let entries = {
  index: './src/index.ts',
  other: './src/other.ts'
};

module.exports = {
  entry: entries,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'js'),
    publicPath: 'js/',
  },
  module: {
    rules: [{
      test: /\.ts(x?)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: babelOptions
        },
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true // IMPORTANT! use transpileOnly mode to speed-up compilation
          }
        }
      ]
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: babelOptions
        }
      ]
    }]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor'],
      minChunks: function (module, count) {
        // creates a common vendor js file for libraries in node_modules
        return isVendor(module);
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "commons",
      chunks: Object.keys(entries),
      minChunks: function (module, count) {
        // creates a common vendor js file for libraries in node_modules
        return !isVendor(module) && count > 1;
      }
    })
  ]
}
