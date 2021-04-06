## JS加载优化

js执行线程与浏览器渲染线程是互斥的，执行js代码的时候，渲染线程必须等待。

### 减少js对性能的影响

* 将`<srcipt>`标签放于页面的底部，保证脚本在页面解析时才执行

* 脚本打包，页面中的<script>标签越少，页面加载速度越快

* 非阻塞下载js

  * `<srcipt>`标签添加`defer`属性，延迟加载
  * 动态创建`<srcipt>`，

  ```js
  let src = document.createElement("srcipt");
  src.src = "index.js";
  document.body.appendChild(src);
  ```

  * `XHR`网络请求然后再用`srcipt`标签加入到页面中

  ```js
  let xhr = new XMLHttpRequest();
  ...
  let src = document.createElement("srcipt");
  src.text = ...;
  document.body.appendChild(src);
  ```



### 读写操作

js取一个变量的值时，当嵌套的层级越深，消耗的性能越大。

尽可以使用局部变量,用局部变量存储本地范围外的变量值。

```js
function add (){
     var doc = document.body,
         a = dociment.getElementsByTagName(".a");
    //dosting
    document.getElementById('.go').onclick = function (){
        console.log("click");
    }
    
}
```

三处地方使用了`document`,js引擎需要顺着**作用域链**寻找`document`对象三次，耗性能

优化:

```js
function add (){
    var doc = document;
    a = doc.getElementsByTagName(".a");
     //dosting
    doc.getElementById('.go').onclick = function (){
        console.log("click");
    }
}
```

* `with`改变作用域

```js
with(document){
    var doc = body,
    link = getElementsByTagName(".a"),
}
```

`with`可以避免重复书写`document`,但`with`会造成性能问题

### 对象的本质 

js中的对象是基于原型的。一个对象通过一个内部属性绑定它的原形。在浏览器Firefox,Safari和Chrome中可以通过`__proto__`访问原型，但在其他浏览器中不允许访问该属性。当我们创建一个对象时，它会自动拥有一个`Object`作为它们的原形。

对象即可以有两种类型的成员：实例成员和原形成员(继承Object原形)。使用`obj.hasOwnProperty(prop)`可以判断属性属于哪一种

使用`in`搜索对象的某个属性，属性在原型链上越深消费的性能越高

#### 总结

在js中数据存储位置可以对代码性能产生重要影响，有四种数据访问类型： 直接量，变量，数组项，对象成员。它们有不同的性能考虑。

**直接量和局部变量访问速度非常快，数组项和对象成员需要更长的时间。**

局部变量比域外变量快，因为它位于作用域第一个对象中。变量在作用域中的位置越深，访问需要的时间就越长。全局变量问题最慢，因为它们总是位于作用域的最后一环。

避免使用`with`表达式，因为它会改变运行期上下文的作用域

嵌套对象成员会造成重大性能影响，尽量少用

```js
function fn(){
    //在window对象寻找locatinon,在location中寻找href，非常费性能
    let href = window.location.href,
        hash = window.location.hash;
}
```

```js
function fn (){
    let loct = window.loaction,
    href = loct.href,
    hash = loact.hash;
}
```

一个属性或方法在原型链中的位置越深，访问它的速度越慢。

**提高js代码性能方法：**

将经常使用的对象成员，数组项，和域外变量存入局部变量中，访问局部变量的速度会快于访问原始变量

## DOM编程

DOM操作性能消耗大，

循环遍历集合时，将集合的`length`用一个变量缓存起来。不然每取一次集合`length`都会导致集合器更新，消耗性能

```js
 let dom = document.getElementsByTagName_r('div'),
     len = dom.length;
for(let i=0;i<len;i++){
    ...
}
```

**循环数组比循环集合速度快**,可以将集合转化成数组再循环

```js
 let dom = document.getElementsByTagName_r('div'),
     arr = [].splice.call(dom),
     len = arr.length;
for(let i = 0;i<len;i++){
    ...
}
```

减少`document.get...`的使用，它会每次都迭代元素。可能的话使用速度更快的API,诸如`querySelectorAll()`and`firstElementChild()`



#### 重绘和重排

当浏览器下载完所有页面HTML标记，JavaScript,CSS，图片之后，它解析文件创建两个内部数据

`DOM tree`(dom树)表示页面结构，`render tree`(渲染树)表示DOM节点如何显示。如果DOM树与渲染枝构造完毕，浏览器就可以绘制页面

**重排：**当DOM改变影响元素的几何属性(宽和高)。浏览器会重新计算元素几何属性，而其他的元素也会被影响重新计算。浏览器重构渲染树。

**重绘：**改变不是几何属性时，例如颜色。浏览器会重新绘制屏幕受影响的部分，元素的布局没有改变

**重排一定会引发重绘**

#### 读取元素位置大小会触发重排

```js
offsetTop ...
scrollTop ...
clientTop ...
getComputedStyle() 
```

使用上述API读取元素位置大小时，重排获取最新的数据并返回

#### 最少化重排，重绘

```js
let dom  = document.getElementByID("myDiv");
dom.style.left = "2px";
dom.style.top = "2px";
```

改变了两个风格属性，每次都影响到了元素的几何属性。在现代液浏览器只会进行一次重排，但在老式会有两次

#### 避免大面积重排

1. 使用绝对坐标定位元素，使它位于页面布局流外
2. 使用css3属性，触发cpu进行渲染

#### 事件三个阶段

1. 捕获（低版本IE,不支持捕获）
2. 到达目标
3. 冒泡



###  定时器优化

![image-20210116220901551](C:\Users\jasolar\AppData\Roaming\Typora\typora-user-images\image-20210116220901551.png)

```js
for(let i=0;i<100000;i++){
    let div =document.createElement('div');
    let div.innerHTML = i;
    document.body.appendChild(div);
}
```

向`body`标签插入100000个`div`,页面空白很长时间出现卡死的情况。原因在于：循环生成100000个`div`，现代浏览器优化，100000个`div`将会在JS代码生成完成后，统一插入到body标签中。页面的空白时间是JS执行生成`100000`个`div`的时间。

**定时器优化:**

```js
let index = 100000,
    i = 1000,
    j = 0;
function createDiv() {
    while (j < i) {
        let div = document.createElement('div');
        div.innerHTML = j;
        document.body.appendChild(div);
        j++;
    }
}
function time() {
    setTimeout(() => {
        createDiv();
        if (i < index) {
            i += 1000;
            time();
        }
    }, 25)
}
time();
```

每次只生成1000个`div`就渲染一次，执行定时器回调函数时，必须会有一次**UI渲染线程执行**，这样就不会造成页面长时间空白。但浏览器还是会卡，原因是100000个`div`占浏览器内存

### AJAX异步JavaScipt和XML

AjAX是高性能JavaScript的基石