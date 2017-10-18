/* webpack.config.js */

var webpack = require('webpack');
var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');


// 项目根路径
var APP_PATH = path.resolve(__dirname, 'app');
// 项目源码路径
var SRC_PATH = path.join(__dirname, 'src');
// 产出路径
var DIST_PATH = path.join(__dirname, 'dist');
// 使用缓存
var CACHE_PATH = path.join(__dirname, 'cache');
var PUB_PATH = path.join(__dirname, 'public');

// 是否是开发环境
var __DEV__ = process.env.NODE_ENV !== 'production';

var config = {
    entry: {//打包的入口文件，一个字符串或者一个对象
        app: [path.join(__dirname, "app/main.hot.dev.jsx")]
    },
    output: { //配置打包的结果，一个对象
        filename: '[name].bundle.js',//这里面的name对应于entry中的键值对里面的键
        chunkFilename: "[name].chunk.js",
        path: path.resolve(__dirname, 'dist'),
        //publicPath: '/build/' //这个publicPath使用是当devServer 中未设置publicPath后才起作用，当这个publicPath中的设置和devServer中设置的不相同的时候使用devServer中的地址
    },
    devServer: {
        hot: true,
        /* contentBase: PUB_PATH,*/
        // publicPath: '/dist/',
        compress: true,
        port: 8083
    },
    module: { //定义对模块的处理逻辑，一个对象
        rules: [
            {
                test: /\.(js|jsx)$/, //正则表达式，用于匹配到的文件
                exclude: /node_modules/,//指排除的文件夹
                //include: SRC_PATH,      //指包含的文件夹
                use: {
                    loader: "babel-loader",//字符串或者数组, 处理匹配到的文件。

                }

            },
            {
                test: /\.css$/,
                //请注意loader里的写法，有一些低版本的例子中是过时的写法
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!autoprefixer-loader" //autoprefixer-loader 用于解析CSS文件并且添加浏览器前缀到CSS规则里，使用Can I Use的数据来决定哪些前缀是需要的。
                })
            },
             {
                 test: /\.less$/,
                 loader: "less-loader!style-loader"
             }, {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=8192"
            },
        ]
    },

    resolve: {
        alias: {},
        extensions: ['.webpack.js', '.web.js', '.js', '.jsx']
    },
    plugins: [
        new webpack.DefinePlugin({
            // http://stackoverflow.com/questions/30030031/passing-environment-dependent-variables-in-webpack
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        //
        new HtmlwebpackPlugin({
            filename: DIST_PATH + '/pages/index.html',
            chunks: ['app'],//需要引入的chunk 不配置就会引入所有页面的资源，名字来源于你的入口文件
            template: 'template.html'//html模版路径
        }),
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),


    ]
};

module.exports = config;