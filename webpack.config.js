const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const babelOptions = {
    "presets": "es2015"
};

function isNodeModule(module) {
    return module.context && module.context.indexOf("node_modules") !== -1;
}

const entries = {
    index: "./src/index.ts",
};

module.exports = {
    entry: entries,
    output: {
        filename: "js/[name].js",
        path: path.resolve(__dirname, "built"),
        //publicPath: "built/",
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: babelOptions
                    },
                    {
                        loader: "ts-loader",
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
                        loader: "babel-loader",
                        options: babelOptions
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: "resources/",
                        },
                    },
                ],
            },
            {
                test: /\.(ttf|otf|woff)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: "resources/",
                        },
                    },
                ],
            },
            {
                test: /\.hbs$/,
                use: {
                    loader: "handlebars-loader",
                    options: {
                        helperDirs: [ __dirname + "/src/handlebars-helpers" ],
                        inlineRequires: "\/images\/",
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
            },
            {
                test: /\.txt$/,
                use: [
                    {
                        loader: "raw-loader"
                    }
                ]
            },
            {
                test: /\.md$/,
                use: [
                    {
                        loader: "html-loader"
                    },
                    {
                        loader: "markdown-loader",
                        options: {
                            /* your options here */
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            //handlebars: "handlebars/dist/handlebars.min.js" // allows handlebars to work without the need for "fs"
        },
        alias: {
            "~": path.resolve(__dirname, "src/"),
            "src": path.resolve(__dirname, "src/"),
        }
    },
    node: {
        fs: "empty"
    },
    plugins: [
        // generate for us our index.html page
        new HtmlWebpackPlugin({
            title: "Loading Custom Deck Builder...",
        }),

        // provides a great speedup in both module use and development debugging
        // https://webpack.js.org/plugins/commons-chunk-plugin/
        new webpack.optimize.CommonsChunkPlugin({
            names: ["node_modules"],
            minChunks: function (module, count) {
                // creates a common vendor js file for libraries in node_modules
                return isNodeModule(module);
            }
        }),
    ],
    devtool: "source-map",
    devServer: {
        historyApiFallback: true,
        watchOptions: { aggregateTimeout: 300, poll: 1000 },
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        }
    },
}
