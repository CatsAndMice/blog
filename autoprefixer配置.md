# autoprefixer配置

版本

```JavaScript
webpack 4.46.0
webpack-cli 4.8.0        
webpack-dev-server 3.11.2
node v14.15.1

```


下载插件

```PowerShell
 npm i postcss-loader sass-loader style-loader autoprefixer css-loader -D
```


webpack.config.js添加配置, css预处理器使用了scss,需要配置 sass-loader

```JavaScript
 module: {
      rules: [
        {
          test: /\.{scss,css}$/,
          use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
        }
      ]
    }

```


运行报TypeError:this.getOptions is not a function，

![](image/image.png)

该问题属于: 版本不兼容，降级sass-loader@9，


