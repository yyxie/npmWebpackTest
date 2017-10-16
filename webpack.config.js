/* webpack.config.js */

var webpack = require('webpack');
var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');


// 项目根路径
var APP_PATH = path.resolve(__dirname, 'app');
// 项目源码路径
var SRC_PATH = path.join(__dirname, 'src');
// 产出路径
var DIST_PATH = path.join(__dirname, 'dist');
// 使用缓存
var CACHE_PATH = path.join(__dirname, 'cache');

// 是否是开发环境
var __DEV__ = process.env.NODE_ENV !== 'production';

var config = {
    entry: {//打包的入口文件，一个字符串或者一个对象
        app: ['webpack-dev-server/client?http://localhost:8080', './src/pages/app.js']
    },
    output: { //配置打包的结果，一个对象
        path: DIST_PATH,
        filename: '[name].bundle.js'//这里面的name对应于entry中的键值对里面的键
    },
    module: { //定义对模块的处理逻辑，一个对象
        loaders: [{
            test: /\.js|\.jsx$/, //正则表达式，用于匹配到的文件
            exclude: /node_modules/,//指排除的文件夹
            include: SRC_PATH,      //指包含的文件夹
            loaders: ['babel-loader']//字符串或者数组, 处理匹配到的文件。
        },{
            test: /\.(scss|css|less)$/,
            loaders: ['style', 'css|less', 'sass']
        }]
    },
    resolve: {
        alias: {}
    },
    plugins: [
        new webpack.DefinePlugin({
            // http://stackoverflow.com/questions/30030031/passing-environment-dependent-variables-in-webpack
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        //
        new HtmlwebpackPlugin({
            filename: DIST_PATH + 'pages/index.html',
            chunks: ['app'],//需要引入的chunk 不配置就会引入所有页面的资源，名字来源于你的入口文件
            template: 'template.html'//html模版路径
        })
    ]
};

module.exports = config;