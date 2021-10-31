公司需求拍摄视频上传，拍摄的视频体积大，上传常常因超时，导致上传失败。对此视频文件上传前，需要对文件进行一定的处理，实践中选择了ffmpem进行操作，本文目的是将ffmpem个人踩坑经验分享给大家

### ffmpeg视频压缩转码

上传视频将存储于[阿里云oss]([对象存储OSS_云存储服务_企业数据管理_存储-阿里云 (aliyun.com)](https://www.aliyun.com/product/oss/))，如果将视频压缩成压缩包上传，服务器端需要将上传成功的压缩包进行解压，第三方服务器并没有提供类似方案，这样客户端播放视频要将线上压缩包下载后进行解缩再播放，一来二去肯定会花费时间与性能，用户体验不友好，压缩成压缩包上传肯定是不能的。

移动端拍摄的视频格式一般为mp4或mov, 能不能将视频转化成其他体积相对更小的视频格式呢？思路可行，一顿Chrome找到了[专业视频处理库ffmpeg.js]([Kagami/ffmpeg.js: Port of FFmpeg with Emscripten (github.com)](https://github.com/Kagami/ffmpeg.js)),ffmpeg纯`C,C++`语言编写。

非`javaScpit`语言为什么能在浏览器环境中运行，不在本文中介绍。

有兴趣者，请阅读[WebAssembly]([WebAssembly概念 - WebAssembly | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/WebAssembly/Concepts))

![](https://i.bmp.ovh/imgs/2021/10/39abc5f97fc95e34.png)

ffmpeg压缩视频使用就简单的几行代码，复制粘贴完事。

然而简单的几行代码，运行却报错😂

![image-20211030203352191](C:\Users\hai\AppData\Roaming\Typora\typora-user-images\image-20211030203352191.png)

查阅[仓库issues#231]([SharedArrayBuffer is not defined in chrome 92 · Issue #231 · ffmpegwasm/ffmpeg.wasm (github.com)](https://github.com/ffmpegwasm/ffmpeg.wasm))，发现问题是chrome92版本发布限制了`SharedArrayBuffer`使用

#### 解决SharedArrayBuffer报错

##### 1. SharedArrayBuffer 降级 ArrayBuffer

```js
if(!crossOriginIsolated) {
  SharedArrayBuffer = ArrayBuffer;
}
```

缺点: 可以影响功能

ffmpeg.js运行失败

![](https://i.bmp.ovh/imgs/2021/10/663e0b0b24cbe099.png)

##### 2. 设置响应COOP和COEP状况

```js
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

缺点: 影响加载跨域资源，如iframe,script标签加载等

服务端响应头添加字段：

![](https://i.bmp.ovh/imgs/2021/10/b84e86dc9671820e.png)

成功运行，然而视频压缩时间较长

![](https://i.bmp.ovh/imgs/2021/10/2e0aa1b6ce17da6f.gif)

并且iframe资源无法进行加载

![](https://i.bmp.ovh/imgs/2021/10/b18cb29666dd55bb.png)

### 总结 

ffmpeg转码压缩视频时间长，并且需要设置`COOP`和`COEP`,影响到iframe,script标签等跨域资源加载。在用户上传视频场景下不适合使用ffmpeg

> ffmpeg使用详细代码获取:https://github.com/CatsAndMice/upfile/tree/master/ffmpeg

### 参考

[解决 SharedArrayBuffer is not defined - 掘金 (juejin.cn)](https://juejin.cn/post/7016962394479919118)

