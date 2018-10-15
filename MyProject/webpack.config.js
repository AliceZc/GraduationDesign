const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    mode: 'development', // production 设定模式
    entry: ['babel-polyfill', './src/main.js'],
    output: {
        path: path.join(__dirname, './dist/'),
        filename: 'bundle.js'
    },
    devtool: 'inline-source-map',
    plugins: [
        // 该插件的作用就是把 index.html 打包到你的 bundle.js 文件所属目录
        // 也就是说 bundle 到哪，你的 index.html 也就到哪
        // 同时这个会自动在你的 index.html 中注入 script 引用链接
        // 而且引用的资源名称，也取决于你的 bundle 叫什么
        new htmlWebpackPlugin({
            template: './index.html'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()    
    ],
    devServer: {
        // 配置 webpack-dev-server 的 www 目录
        contentBase: './',
        hot: true,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:3000/'
            },
            '/img': {
                target: 'http://127.0.0.1:3000/'
            }
        }
    },
    externals: {
        // key 就是包名
        // value 是全局的 Vue 导出的接口
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        lodash: '_',
        'blueimp-md5': 'md5'
    },
    module: {
        rules: [{
                test: /.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /.(jpg|png|gif|svg|jpeg)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /.less$/,
                use: [
                    'style-loader', // 3.根据模块生成 style 节点插入 head 中
                    'css-loader', // 2.再把 css 转换为 javascript模块
                    'less-loader' // 1.先把 less 转换为 css
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        // 默认把打包的结果缓存到 node_modules/.cache 目录
                        cacheDirectory: true,
                        presets: ['env'], // 语法
                        plugins: ['transform-runtime'] // 插件 
                    }
                }
            },
            {
                test: /.vue$/,
                use: [
                    'vue-loader'
                ]
            }
        ]

    }


}