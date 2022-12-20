## CSS::marker让文字序号不再呆板

<img src="https://desk-fd.zol-img.com.cn/t_s1366x768c5/g6/M00/0D/02/ChMkKmBdVRiIK7LEAE_CB2CYD80AAMGwgNaucgAT8If023.jpg" />

本文介绍CSS新增的伪元素`:marker`,它可以改变文字序号样式。

### 什么是`::marker`

`::marker`是在[CSS Lists Module Level 3](https://drafts.csswg.org/css-lists-3/#marker-pseudo)提出，于[CSS Pseudo-Elements Level 4](https://drafts.csswg.org/css-pseudo-4/#marker-pseudo)完善。**Chrome86+**对`::marker`开始支持。

元素标签`<li>,<summary>`,它们`display`默认为`list-item`,即会带有呆板的文字序号

```html
<ol>
    <li>::marker</li>
    <li>::before</li>
    <li>::after</li>
</ol>
<ul>
    <li>::marker</li>
    <li>::before</li>
    <li>::after</li>
</ul>
```

<img src="https://img11.360buyimg.com/ddimg/jfs/t1/184971/17/11812/6159/60dc1fa9Eaff4d2c3/07b547baeaac5464.png" style="text-align: left;"/>

使用`::marker`可以改变默认的文字序号

```html
<style>
    li::marker{
        color: rgb(219, 93, 20);
    }
</style>


<ol>
    <li>::marker</li>
    <li>::before</li>
    <li>::after</li>
</ol>
<ul>
    <li>::marker</li>
    <li>::before</li>
    <li>::after</li>
</ul>
```

<img src="https://img11.360buyimg.com/ddimg/jfs/t1/188382/38/10968/5689/60dc20faEa50364a7/341d9140f315c5c1.png">

### `::marker`的一些限制

使用`::marker`时，只能使用某些css属性:

* 所有的`font`字体属性
* `color`
* `content`

元素标签使用`::marker`,需要将`display`设置成`list-item`,否则`::marker`不起作用。

### `::marker`应用探索

#### 标题前缀

```html
<style>
   h1 {
            display: list-item;
            padding-left: 8px;
            max-width: 800px;
            margin: auto;
            margin-top: 15px;
        }

        .title::marker {
            content: '▍';
            color: rgb(189, 63, 63);
        }

        .emoji::marker {
            content: "㊗️";
        }
</style>

<h1 class="title">中国共产党100年生日快乐</h1>
<h1 class="emoji">中国共产党100年生日快乐</h1>
```

或者使用emoji表情

<img src="https://i.bmp.ovh/imgs/2021/07/7e193995d9a3c1ba.png" />

<a href="https://codepen.io/lihai-boop/pen/zYwxQjL">CodePen Demo--::marker example</a>

#### 动态改变

```html
<style>
    li:hover {
         color: rgb(241, 208, 97);
    }

    li::marker {
        content: "😠";
    }

    li:hover::marker {
        content: "🤒";
    }
</style> 
<ul>
        <li>face with medical mask</li>
        <li>face with thermometer</li>
        <li>angry face</li>
    </ul>
```

<img src="https://ftp.bmp.ovh/imgs/2021/07/55955ea0d0e7af3a.gif" />

<a href="https://codepen.io/lihai-boop/pen/rNmagqr">CodePen Demo--::marker example</a>

#### 配合`counter`

`::marker`配合计算属性`counter`，`counter-increment`完成一个自动递增的列表

<a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/counter()">counter详细介绍</a>

```html
<style>
 .view {
     counter-reset: h3;
    }

    div {
        padding: 0 80px;
    }

    h3 {
        display: list-item;
        counter-increment: h3;
    }

    h3::marker {
        content: "✔"counter(h3) "  ";
        color: rgb(243, 182, 69);
  }

</style>

<div class="view">
        <div>
            <h3>Lorem ipsum dolor</h3>
            <p>Ratione culpa reprehenderit beatae quaerat voluptatibus, debitis iusto?</p>
        </div>
        <div>
            <h3>Itaque sequi eaque earum </h3>
            <p>Ratione culpa reprehenderit beatae quaerat voluptatibus, debitis iusto?</p>
        </div>
        <div>
            <h3>Laudantium sapiente </h3>
            <p>Ratione culpa reprehenderit beatae quaerat voluptatibus, debitis iusto?</p>
        </div>
    </div>

```

<img src="https://i.bmp.ovh/imgs/2021/07/8d4ebff1820b5bb3.png" />

<a href="https://codepen.io/lihai-boop/pen/VwbYONw">CodePen Demo--::marker example</a>

### 最后

不要忘记点**赞**，微信公众号搜索**凌览社**。

### 往期文章

<a href="https://blog.csdn.net/qq_45472813/article/details/117564368">深入剖析This机制</a>

<a href="https://blog.csdn.net/qq_45472813/article/details/117062661">看完这篇，让您的js优雅一个档次</a>

<a href="https://blog.csdn.net/qq_45472813/article/details/114790141">多个Vue项目如何配置nginx</a>

<a href="https://blog.csdn.net/qq_45472813/article/details/113793943">重学Vue Components</a>

<a href="https://blog.csdn.net/qq_45472813/article/details/111868454">前端Vue+axios实现阿里云oss文件上传(服务端签名直传)</a>

<a href="https://blog.csdn.net/qq_45472813/article/details/106169939">前端奇技淫巧之js调试</a>

