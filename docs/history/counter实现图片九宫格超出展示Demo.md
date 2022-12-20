<img src="https://tse1-mm.cn.bing.net/th/id/R-C.42d3628c98467e01c2e5a2b37f8468bd?rik=9tL%2bZJV9RrH5kw&riu=http%3a%2f%2fwww.augie.edu%2fsites%2fdefault%2ffiles%2fstyles%2fbanner%2fpublic%2fCode-Conduct.jpg%3fitok%3dax1W9Skg&ehk=CXao8wPFHAgwsDvYL0%2fPEusIWauiDUGazLpkWOAT4MY%3d&risl=&pid=ImgRaw" style="margin:0;"/>



### 效果展示

<img src="https://p.pstatp.com/origin/pgc-image/a57169496b7c49758bce9c4b2c20c960" style="margin:0;"/>



### 绘制大致容器

`gird`简易布局,11个`dd`元素模拟图片

```html
<dl class="view">
    <dd></dd>
    <dd></dd>
    <dd></dd>
    <dd></dd>
    <dd></dd>
    <dd></dd>
    <dd></dd>
    <dd></dd>
    <dd></dd>
    <dd></dd>
    <dd></dd>
</dl>
```

```css
dl,
dd {
    padding: 0;
    margin: 0;
}

.view {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 300px;
}
.view dd {
    height: 100px;
    background: #ccc;
    box-sizing: border-box;
    border: 1px solid #fff;
}
```

<img src="https://p.pstatp.com/origin/pgc-image/5e09f419dbae486db5baa3ec8368bc16" style="margin:0;" />

### `counter`计算属性展示数量

使用`::before伪元素覆盖住图片，将`counter`计算的数量展示在`::before元素中

<a href="[counter() - CSS（层叠样式表） | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/counter())">counter</a>

```css
.view {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 300px;
    counter-reset: images;
}
.view dd {
    height: 100px;
    background: #ccc;
    box-sizing: border-box;
    border: 1px solid #fff;
    counter-increment: images;
}
.view dd::before{
    content: "+"counter(images);
    display: inline-block;
    width: 100%;
    height: 100%;
    line-height: 100px;
    color: #fff;
    font-size: 30px;
    text-align: center;
}
```

<img src="https://p.pstatp.com/origin/pgc-image/39b700de73894ac585e9d9ffb27a8a52" style="margin:0;">

`counter`已经将全部`dd`元素数量展示出来,可我们只需要超出第九个`dd`元素的数量,这要怎么做呢？

其实很简单，使用<a href="[:nth-child - CSS（层叠样式表） | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-child)" >:nth-child伪类</a>选择**第九个`dd`元素后的兄弟元素**

```css
.view {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 300px;
    counter-reset: images;
}

.view dd {
    height: 100px;
    background: #ccc;
    box-sizing: border-box;
    border: 1px solid #fff;
}

.view dd:nth-child(9)~dd {
    counter-increment: images;
}

.view dd:nth-child(9) ~ dd::before{
    content: "+"counter(images);
    display: inline-block;
    width: 100%;
    height: 100%;
    line-height: 100px;
    color: #fff;
    font-size: 30px;
    text-align: center;
}
```

`~ dd`表示后面所有的`dd`元素

<img src="https://p.pstatp.com/origin/pgc-image/a564ee72b65540288b191e95dbf5d768" style="margin:0" />

嘿嘿！只差将最后的元素移个位置了，可以使用定位

```css
dl,
dd {
    padding: 0;
    margin: 0;
}

.view {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 300px;
    counter-reset: images;
    position: relative;
}

.view dd {
    height: 100px;
    background: #ccc;
    box-sizing: border-box;
    border: 1px solid #fff;
}

.view dd:nth-child(9)~dd {
    width: 100px;
    counter-increment: images;
    position: absolute;
    right: 0;
    bottom: 0;
}

.view dd:nth-child(9)~dd::before {
    content: "+"counter(images);
    display: inline-block;
    width: 100%;
    height: 100%;
    line-height: 100px;
    color: #fff;
    font-size: 30px;
    text-align: center;
}
```

将超出第九个的所有元素定位至容器右下方

<img src="https://p.pstatp.com/origin/pgc-image/3b434b7b526544899ed745733b44f39c" style="margin:0;" />

### 原生js实现点击展示

超出第九个的所有元素被定位在右下，利用js实现点击定位的元素则将元素去除定位属性

```css
//去除定位 
.view dd.no-befter {
    position: static !important;
}

.view dd.no-befter::before {
    display: none !important;
} 
```

```js
let dd = document.getElementsByTagName('dd'),
    len = dd.length;
dd[len - 1].onclick = () => {
    [].slice.call(dd).forEach(val => {
        val.classList.add('no-befter');
    })
}
```

<img src="https://p.pstatp.com/origin/pgc-image/d102cd22544842258744c3535233a63b" style="margin:0" />

### counter另一种思维实现

`counter`实现九宫格，上面是使用`counter`默认从`0`开始。现在重新设置`counter`从`-9`开始计算。

```css
dl,
dd {
    padding: 0;
    margin: 0;
}

.view {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 300px;
    counter-reset: images -9;
    position: relative;
}

.view dd {
    height: 100px;
    background: #ccc;
    box-sizing: border-box;
    border: 1px solid #fff;
    counter-increment: images;
}

.view dd::before {
    content: counter(images);
    display: inline-block;
    width: 100%;
    height: 100%;
    line-height: 100px;
    color: #fff;
    font-size: 30px;
    text-align: center;
}

```

<img src="https://p.pstatp.com/origin/pgc-image/23edbdd88bf74dcda2bb7ce9fda62217" style="margin:0;" />

同理，超出第九个元素才展示数量，然后定位

```css
dl,
dd {
    padding: 0;
    margin: 0;
}

.view {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 300px;
    counter-reset: images -9;
    position: relative;
}

.view dd {
    height: 100px;
    background: #ccc;
    box-sizing: border-box;
    border: 1px solid #fff;
    counter-increment: images;
}

.view dd:nth-child(9)~dd:before {
    content: counter(images);
    display: inline-block;
    width: 100%;
    height: 100%;
    line-height: 100px;
    color: #fff;
    font-size: 30px;
    text-align: center;
}
```

<img src="https://p.pstatp.com/origin/pgc-image/f37d9896343a404db0ab6bce003e7670" style="margin:0;" />

后面的代码就不展示了，基本上是一样的。

所有代码保存在<a href="https://github.com/lihai-boop/simple-dome/blob/master/counter%E5%AE%9E%E7%8E%B0%E4%B9%9D%E5%AE%AB%E6%A0%BC%E5%9B%BE%E7%89%87%E5%B1%95%E7%A4%BA.html"> github</a>需要的自取。

### 最后

<a href="https://blog.csdn.net/qq_45472813/article/details/118382226">CSS::marker让文字序号不再呆板</a>,`counter`配合`::marker`可以做有趣列表展示。

公众号:凌览社，求个关注❤️‍🔥

