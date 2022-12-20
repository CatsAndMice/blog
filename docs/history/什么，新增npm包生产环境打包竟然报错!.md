## 前言

本人在`npm`发布了一个常用方法工具包<a href="https://www.npmjs.com/package/@lihai-js/tool/v/1.2.5">@lihai-js/tool</a>，有具体的api说明。<a href="https://www.npmjs.com/package/@lihai-js/tool/v/1.2.5">@lihai-js/tool</a> github地址<a href="https://github.com/lihai-boop/tool">github</a>,欢迎大家提<a href="https://github.com/lihai-boop/tool/issues">issues</a>。

项目中新引入<a href="https://www.npmjs.com/package/@lihai-js/tool/v/1.2.5">@lihai-js/tool</a>包,生产环境下打包竟然报错了！

## debug

报错详情

<img src="https://p.pstatp.com/origin/pgc-image/f35b687059044ecaa02d00b2c32228ca"/>

debug思路

1. 项目开发环境下完全可以运行
2. 开发环境成功打包

基于上述两点，判断打包失败，原因在于`vue.config.js`中插件的使用

`vue.config.js配置`

```js
let UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const path = require('path');
function isProd() {
    return process.env.NODE_ENV === 'production';
}
module.exports = {
    configureWebpack: {
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'js/[name][hash].js',
            chunkFilename: 'js/[name][hash].js'
        },
        plugins: isProd && [
            new CompressionWebpackPlugin({
                filename: "[path][base].gz",
                test: /\.(js|css)(\?.*)?$/i,
                threshold: 10240,
                deleteOriginalAssets: false,
                algorithm: "gzip",
            })
        ],
        optimization: isProd && {
            minimizer: [
                new UglifyJsPlugin({
                    uglifyOptions: {
                        warnings: false,
                        compress: {
                            pure_funcs: ['console.log', 'console.debug']
                        }
                    }
                })
            ],
            splitChunks: isProd && {
                chunks: 'all',
                minSize: 50000,
                maxSize: 300000,
                minChunks: 1,
                maxAsyncRequests: 10,
                maxInitialRequests: 10,
                automaticNameDelimiter: '~',
            }
        },
    },
}
```

版本详情

```json
webpack 4.44.2
webpack-cli 4.7.2
webpack-dev-server 3.11.0
uglifyjs-webpack-plugin: 2.2.0
compression-webpack-plugin: 1.1.12
```

`vue.config.js`配置插件使用少，为找出哪个配置出问题，进行逐功能注释打包。

问题插件在于`uglifyjs-webpack-plugin`配置，`uglifyjs-webpack-plugin`插件不支持`ES6`语法压缩。<a href="https://www.npmjs.com/package/@lihai-js/tool/v/1.2.5">@lihai-js/tool</a>均使用了<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor">ES6 类</a>对方法封装

## 配置可替换插件

`uglifyjs-webpack-plugin`对`ES6`不支持，官方推荐使用<a href="https://webpack.docschina.org/plugins/terser-webpack-plugin/">TerserWebpackPlugin插件</a>

下载

```shell
npm i terser-webpack-plugin -D
```

配置

```js
optimization: isProd && {
    minimizer: [
        new TerserPlugin({
            parallel: true,
            terserOptions: {
                warnings: false,
                compress: {
                    pure_funcs: ['console.log', 'console.ware', "console.debug", 'console.error']
                }
            },
        })
    ],

    splitChunks: isProd && {
        chunks: 'all',
        minSize: 50000,
        maxSize: 300000,
        minChunks: 1,
        maxAsyncRequests: 10,
        maxInitialRequests: 10,
        automaticNameDelimiter: '~',
    }
}
```

还是报错! 但报错内容变了

<img src="https://p.pstatp.com/origin/pgc-image/2a0b473757a14b34a9af593825722e4e" />

Goolge结果:版本兼容性问题

`webpack`当前版本为`4.44.2`,`terser-webpack-plugin`版本为`5.1.4`,它当前版本太高了

`terser-webpack-plugin`降级

```shell
npm i terser-webpack-plugin@4 -D
```

完美解决,正常使用打包<a href="https://www.npmjs.com/package/@lihai-js/tool/v/1.2.5">@lihai-js/tool</a>成功