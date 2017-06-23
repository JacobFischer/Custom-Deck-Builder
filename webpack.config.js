let _ = require('lodash');
let webpack = require('webpack');
let path = require('path');

let babelOptions = {
  "presets": "es2015"
};

function isNodeModule(module) {
  return module.context && module.context.indexOf('node_modules') !== -1;
}

let entries = {
  index: './src/index.ts',
};

module.exports = {
  entry: entries,
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'built'),
    publicPath: 'built/',
  },
  module: {
    rules: [
      {
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
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'resources/',
            },
          },
        ],
      },
      {
        test: /\.(ttf|otf|woff)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'resources/',
            },
          },
        ],
      },
      {
        test: /\.hbs$/,
        use: { 
          loader: "handlebars-loader",
          options: {
            helperDirs: [ __dirname + '/src/handlebars-helpers' ],
          },
        },
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
       //handlebars: 'handlebars/dist/handlebars.min.js' // allows handlebars to work without the need for 'fs'
    }
  },
  node: {
    fs: "empty"
  },
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['node_modules'],
      minChunks: function (module, count) {
        // creates a common vendor js file for libraries in node_modules
        return isNodeModule(module);
      }
    })
  ]
}
