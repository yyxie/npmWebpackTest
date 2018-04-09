const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

process.env.NODE_ENV = 'production';

const PATH = {
    app: path.join(__dirname, "app"),
    entry: path.join(__dirname, "app/main.build.jsx"),
    build: path.join(__dirname, "dist"),
    html: path.join(__dirname, "dist/index.html"),
    static_dir: path.resolve(__dirname, 'public/static'),
}



const copyIgnore = ['*.pdf', '*.key']

const config = {
    entry: {
        app: PATH.entry
    },
    output: {
        path: PATH.build,
        filename: 'assets/[name].[hash:8].js',
        chunkFilename: "assets/[name].[chunkhash:8].chunk.js",
    },
    module: {
        // noParse: [],
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'})
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader'],
                })
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: {
                    loader: 'file-loader?name=assets/fonts/[name].[ext]'
                }
            },
            {
                // for wangEditor
                test: /icomoon\.(woff|svg|eot|ttf)\??.*$/,
                loader: 'file-loader?limit=5000&name=assets/fonts/[name].[ext]'
            },
            {
                test: /\.(png|jpg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        limit: 15000,
                        name: './static/img/[name].[ext]'
                    }
                }
            }
        ]
    },
    resolve: {
        alias: {},
        extensions: [".js", ".json", ".jsx"],
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new webpack.ProvidePlugin({
            "Dict": path.resolve(
                __dirname,
                "./app/config/dict.jsx"
            ),
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ["vendors", 'manifest'],
            minChunks: 2
        }),
        new ExtractTextPlugin({
            filename: '[name].css'
        }),
        new HtmlWebpackPlugin({
            filename: PATH.html,
            template: "./template.html",
            env: process.env.NODE_ENV,
            minify: {    //压缩HTML文件
                removeComments: false,    //移除HTML中的注释
                collapseWhitespace: false    //删除空白符与换行符
            }
        }),
        new CopyWebpackPlugin([{
            from: __dirname + '/src/static',
            to: "static"
        }])
    ]
}

module.exports = config;
