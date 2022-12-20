
> webpack构建工具会将vue及vue全家桶打包成一个vendors.js文件，体积至少会有一个1mb以上，导致首屏加载会出现长时间的白屏。

目录

[import异步加载]()

[CND]()

[静态资源压缩]()

[分包]()

[开启Gizp]()



### import异步加载

webpack构建代码时会将`js`代码打包在一个`app.js`文件中，页面渲染速度与`js`代码大小，执行快慢相关。浏览器渲染引擎与`js`引擎是相斥的，当`js`执行越慢时，浏览器渲染也会放慢。

为了防止`app.js`过大，需要将首页不需要加载的模块分离出来，只将需要的`js`打包进`app.js`中。只有当我们需要的时候才将需要的`js`加载进来

使用vue-cil脚手架使用`vue-ruter`搭建的项目开箱就可以使用路由懒加载，

```js
 new VueRouter({
  routes: [
    { path: '/foo', component: ()=>import('../view/index/index.vue') }
  ]
})
```

另外可以将给他们把按组分块

将路由下的所有组件打包在同一个异步块(chunk)中。只需要使用`命名chunk`,一个特殊的注释语法来提供chunk name(webpack>2.4)

```js
const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
const Bar = () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')
const Baz = () => import(/* webpackChunkName: "group-foo" */ './Baz.vue')
```

Webpack会将任何一个异步模块和相同块名称组合到相同的异步块中

详细说明: <a href="https://router.vuejs.org/zh/guide/advanced/lazy-loading.html"> vue官网</a>

### CDN

使用cdn加速,对webpack配置一些参数，打包过程中webpack会跳过我们自定义的，并不会将cdn加速的文件也打包到`vendors.js`中。将需要cdn加速的文件使用`script`标签加载放于`body`标签后面

index.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport"
    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, telephone=yes">
</head>

<body>
  <noscript>
    <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled.
        Please enable it to continue.</strong>
  </noscript>
  <div id="app"></div>
  <script src="https://cdn.bootcdn.net/ajax/libs/vue/2.6.12/vue.min.js"></script>
</body>

</html>
```

配置webpack，在Vue-cil脚手架搭建的项目中，使用`vue.config.js`来配置webpack外部扩展

vue.config.js

```js
module.exports = {
     configureWebpack: {
             //...
            externals: {
               "myvue": "Vue",
            },
            //...
     }

}
```

然后在其他文件中可以引入自己定义的名字，webpack是不会打包的

main.js

```js
import Vue from 'myvue';
//...
```

使用cdn加速，方法会挂在`window`身上
<img src="https://s3.ax1x.com/2021/01/30/ykbF8H.png" />

**注意点:**

将cdn加速的`script`标签放于`body`后,有时会出现webpack打包的文件加载完成了，但cdn加速的文件没有加载完成，控制台报错。这个问题我遇到过，将cdn加速文件放于`head`标签中就可以解决

<a href="https://webpack.docschina.org/configuration/externals/#root"> 外部扩展详细</a>



### 静态资源压缩

项目中一共会有一些图片加载或都UI设计师想要一些优美的字体样式,为了保证访客能看到我们项目中的字体图片我们就需要将这些静态资源从服务器上下载。当网速慢并且资源大时，下载速度就难搞了。

将字体文件放在阿里oss上，然后使用`@font-face`引入链接时会出现`跨域报错`，可以将字体base64文件，即解决跨域又能将文件大小减少

这里推荐一个网站可以将本地字体转化成base64

https://transfonter.org/

<img src="https://s3.ax1x.com/2021/01/31/yABeXR.png" />

* 图片压缩

推荐网站https://tinypng.com/

<img src="https://s3.ax1x.com/2021/01/31/yABRH0.png" />

压缩完成点击下载，即可

### 分包

前面说过webpack会将项目中使用的框架打包成一个`vendors.js`文件。浏览器是多线程的，它可以同时下载多个js文件，当`vender.js`过大时，我们可以将它分成好几个文件，充分利用好浏览器的多线程。

代码分割需要使用插件`splitChunks`,webpack自带该插件，所以没有必要下载

配置代码分割:

vue.config.js

```js
module.exports = {
    configureWebpack: {
          //...
          splitChunks:{
                chunks: 'all',
                minSize: 50000,//文件最小
                maxSize: 300000,//文件最大
                minChunks: 1,//至少分割成一个chunks文件
                maxAsyncRequests: 10,
                maxInitialRequests: 10,
                automaticNameDelimiter: '~',
           }
           //...
     }
} 
```

当然可以将某个框架单独打成一个文件，将`vue`打包成一个单独的文件

```js
module.exports = {
    configureWebpack: {
          //...
          splitChunks:{
                chunks: 'all',
                minSize: 50000,//文件最小
                maxSize: 300000,//文件最大
                minChunks: 1,//至少分割成一个chunks文件
                maxAsyncRequests: 10,
                maxInitialRequests: 10,
                automaticNameDelimiter: '~',
                cacheGroups: {
                 vue: {//配置后webpack会将vue单独打包
                      name: 'chunk-vue',
                      test: /[\\/]node_modules[\\/]vue[\\/]/,
                      priority: -2
                   },
             
                 }
           }
           //...
     }
} 
```

代码分割后：

[![yADdM9.png](https://img-blog.csdnimg.cn/img_convert/c706ab9aa90b2180f71ab432c0fcec77.png)](https://imgchr.com/i/yADdM9)

### 开启gizp

**解析gizp需要服务器配置nginx，开启gzip**

下载插件

```js
npm install compression-webpack-plugin --save-dev
```

使用

vue.config.js

```js
const CompressionWebpackPlugin = require('compression-webpack-plugin');
module.exports = {
    configureWebpack: {
          //...
          plugins: [
            new CompressionWebpackPlugin({
                filename: "[path][base].gz",
                test: /\.(js|css)(\?.*)?$/i,//需要压缩的文件正则
                threshold: 10240,//文件大小大于这个值时启用压缩
                deleteOriginalAssets: false,//压缩后是否删除原文件,
                algorithm: "gzip",
            })
        ],
           //...
     }
} 
```

开启gzip后,压缩的文件

<img src="https://s3.ax1x.com/2021/01/31/yArPWF.png" />

浏览器默认开启gzip,当解析的是gzip压缩后的文件时，编码是gzip。如果浏览器不支持gzip时，并且原文件存在时，浏览器会解析原文件
<img src="https://s3.ax1x.com/2021/01/31/yArrOs.png" />
