>小编在运用css过程中，发现一些`官方文档没有具体解释的规律`。由此特分享出来与大家一起讨论，共同进步
##  `position:fixed;`  
**文档解释**：`positon:fixed;`生成固定定位的元素，相对于浏览器窗口进行定位。元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。  
<a href="https://www.runoob.com/cssref/pr-class-position.html">  查看文档</a>
可事实真的是这样吗？小编也曾被迷惑过。用具体操作来说明吧。  
```html  
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .box {
            margin: auto;
            position: relative;
            width: 200px;
            height: 200px;
            border: 1px solid #000;
        }
        .div1 {
            background-color: rebeccapurple;
            width: 100px;
            height: 100px;
            position: fixed;
            left0px;
            top: 0px;
        }
    </style>
</head>
<body>
    <div class="box">
        <div class="div1"></div>
    </div>
</body>
</html>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200426104119876.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1NDcyODEz,size_16,color_FFFFFF,t_70)

 结果与**文档解释**一样，`position:fixed;`属性以浏览器相对定位。到这里小编还是不信，再看个例子。  
 ```html
   <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .box {
            position: relative;
            margin: auto;
            border: 1px solid #000;
            transform: translate(0,0);
            width: 200px;
            height: 200px;
        }

        .div1 {
            background-color: rebeccapurple;
            position: fixed;
            left: 0;
            top: 0;
            width: 100px;
            height: 100px;
        }
    </style>
</head>

<body>
    <div class="box">
        <span class="div1"></span>
    </div>
</body>

</html>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200426104244693.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1NDcyODEz,size_16,color_FFFFFF,t_70)
事实胜于雄辨，`只有父级中添加了transform: translate(0,0);`子元素脱离了浏览器相对定位，以父级位置相对定位。这个现象与**文档解释**不符。  
小编看到此结果，心中很是不解。再次确认，得出以下结果：  
**结论**：`
	当父级元素中含有**transform **,或** transform-style: preserve-3d;**属性时，**position：fixed**不在相对浏览器窗口定位，而是相对父级元素定位`  

## transform  
**官方解释**：`transform` 属性向元素应用 2D 或 3D 转换。该属性允许我们对元素进行旋转、缩放、移动或倾斜。
<a href="https://www.w3school.com.cn/cssref/pr_transform.asp">查看文档</a>   
在说`transform`不为人知的秘密之前，先想像一个场景：给父级元素一个相对定位属性：`position:relative;`给子元素一个绝对定位：`position:absolute;`。小编相信这种场景见多了，难不到您们。但小编还是要将效果展示出来。
```html  
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .box {
            position: relative;
            border: 1px solid #000;
            width: 200px;
            height: 200px;
        }

        .div1 {
            background-color: rebeccapurple;
            position: absolute;
            left: 0;
            top: 0;
            width: 100px;
            height: 100px;
        }
    </style>
</head>

<body>
    <div class="box">
        <span class="div1"></span>
    </div>
</body>

</html>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200426113001366.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1NDcyODEz,size_16,color_FFFFFF,t_70)
效果如您所想；可您有没有想过不给父级元素相对定位`position:relative;`也可以达到这样的效果，也许您会想到用`  transform-style: preserve-3d;`一些第三方的教育机构可能会提到这种方法。  
```html  
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .box {
            border: 1px solid #000;
            transform-style: preserve-3d;
            width: 200px;
            height: 200px;
        }

        .div1 {
            background-color: rebeccapurple;
            position: absolute;
            left: 0;
            top: 0;
            width: 100px;
            height: 100px;
        }
    </style>
</head>

<body>
    <div class="box">
        <span class="div1"></span>
    </div>
</body>

</html>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200426113516564.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1NDcyODEz,size_16,color_FFFFFF,t_70)
还有一种就是小编提到的`transform`,效果与` transform-style: preserve-3d;`一致  
```html  
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .box {
            border: 1px solid #000;
            /* transform-style: preserve-3d; */
            transform: rotate(0);
            width: 200px;
            height: 200px;
        }

        .div1 {
            background-color: rebeccapurple;
            position: absolute;
            left: 0;
            top: 0;
            width: 100px;
            height: 100px;
        }
    </style>
</head>

<body>
    <div class="box">
        <span class="div1"></span>
    </div>
</body>

</html>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200426113803451.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1NDcyODEz,size_16,color_FFFFFF,t_70)
**结论**：`transform, transform-style: preserve-3d;具有相对定位position:relative;的部分功能。  
注意：transform, transform-style: preserve-3d;不能使用left,top，right,bottom来调整位置；
`  

##  结语  
希望小编的分享可以给您带来帮忙，欢迎评论指出小编的不足。如果觉得不错请给小编一个赞作为对小编的肯定。

