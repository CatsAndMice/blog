> 大家好，我是码爸爸👦，每天努力一点点💪，就能升职加薪💰当上总经理出任CEO迎娶白富美走上人生巅峰:boom:，想想还有点小激动呢😎。奥力给！！



**前言：**

每天看视频学习是不行的，要适当的写几个dome，把该有的坑踩一遍。前天自己写一个以localStorage储存数据的商品购物车，不多bb,直接上展示链接  

> [https://lihai-boop.github.io/mySOL/%E5%95%86%E5%93%81%E8%B4%AD%E7%89%A9%E8%BD%A6/html/index.html](https://lihai-boop.github.io/mySOL/商品购物车/html/index.html)



**目录：**

<a hred ="#">locaStorage介绍</a>

<a href = "#">storage事件</a>

<a href ="#">踩坑总结</a>



##  localStorage介绍 

locatorage，sesionStorage统称webStorage。大家知道cookie储存空间大约4k，日常满足不了开发需求，webStorage是html5新引入的存储方式。

### localStorage

使用键值对储存方式，只能存储字符串。在各个主流浏览器上储存的大小不一定相同。可以将json转换成字符串在储存

特点：

1. 存储内容大约5mb
2. 不同浏览器上不能共享数据，相同浏览器不同窗口可以共享数据

> 共享数据前提是**符合同源策略** (协议，主机，端口号相同)

3. 永久的有效，数据存储在硬盘上，并不会随着页面或浏览器的关闭而清除

**操作方法：**

```js
 setItem(key,value)//存储数据，通过指定名称key获取对应的value值 

 getItem(key)//获取数据，通过指定名称key获取对应的value值

 removeItem（key）//删除数据，通过指定名称key删除对应的值

 clear（）//指定所有存储的内容

```

不明白的小伙伴请移步：

> https://developer.mozilla.org/zh-CN/docs/Web/API/Storage/LocalStorage



## storage事件

当存储区域(localStorage 或 sessionStorage)在另一个文档的上下文中被修改时，将触发 Window 接口的存储事件。

**监听方式有两种：**

```js
window.addEventListener('storage', () => {
     console.log(JSON.parse(window.localStorage.getItem('sampleList')));    
});
```

```js
window.onstorage = () => {
    console.log(JSON.parse(window.localStorage.getItem('sampleList')));    
};
```

任何不明白的地方移步：

>  https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event



## 踩坑总结

1. localStorage支持同源策略，即开发时要开服务器方式打开看效果
2. localStorage数据展示

例如：我有两个html文件，在html文件1中用`setItem("key","value")`给localStroge储存了一些数据用服务器方式打开在控制台中输入`locatlStorage.getItem("key")`时会输出`value`。

在用服务器方式打开html文件2，同样在控制台中输入`locatlStorage.getItem("key")`是没有`value`这个结果的

**具体的查看数据：**

![\[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-OovAJVvt-1591660560783)(C:\Users\li2322873900\Desktop\markdown\博客\image-20200609075033210.png)\]](https://img-blog.csdnimg.cn/20200609075620945.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1NDcyODEz,size_16,color_FFFFFF,t_70)

3. 触发storage事件在`MND`上给我们的例子就是我上面的代码块，这是针对同源的两个页面，在练习时只有一个html文件，所以修改localStorage数据后是无法触发的。

**解决办法:**
重新定义`setItem()`方法 ，具体搜索`storage触发一个页面`或者看我的源码

源码地址：

> [https://github.com/lihai-boop/mySOL/tree/master/%E5%95%86%E5%93%81%E8%B4%AD%E7%89%A9%E8%BD%A6](https://github.com/lihai-boop/mySOL/tree/master/商品购物车)

另外该练习适合有一定基础的小伙伴。用到了ES6模块化的知识。不明白的可以百度下，很容易就打通了。
