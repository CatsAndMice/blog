# 前端Vue+axios实现阿里云oss文件上传(服务端签名直传)

## 问题描述

项目需要上传图片至服务器，但因为上传带宽慢，所以需要使用<a href="https://help.aliyun.com/document_detail/31927.html?spm=a2c4g.11186623.6.1724.18c3366c8STSJ6">阿里云对象存储OSS</a>用于上传文件，然后将上传后的文件链接处理上传到自己项目的服务器

* 问题一

上传文件到服务器端规定请求头中的`Content-type`使用`multipart/form-data`形式，由于缺少经验自己并不清楚使用`multipart/form-data`要如何发送请求

* 问题二

服务器端签名直传，首先是后端会提供一个接口，前端请求该接口后会返回一些字段数据，在依据返回的数据处理后再发送请求上传文件

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201228155604928.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1NDcyODEz,size_16,color_FFFFFF,t_70#pic_center)


其中`callback`字段我请求的接口数据没有，查看<a href="https://help.aliyun.com/document_detail/31927.html?spm=a2c4g.11186623.6.1724.18c3366c8STSJ6">官网服务端签名直传</a>还是没有弄明白，该怎么将返回的数据整合在一个`FromDate`对象中，然后发送`post`请求将`FromDate`对象传递给阿里云端的服务器

* 问题三

将问题二中的数据整合后，使用axios发送`post`请求。由于发送请求的`url`是问题二中返回数据的`host`，出于浏览器的同源策略会出现`跨域报错`。登陆<a href="https://account.aliyun.com/login/qr_login.htm?spm=5176.20979228.J_8058803260.25.7ce4718b4l23VI&oauth_callback=https%3A%2F%2Fwww.aliyun.com%2F1212%2Fhome%3Fspm%3D5176.12901015.d71.d71.152b525ciTM3qm%26scm%3D20140722.3511.1.3338">阿里云后台</a>配置阿里云服务器的`CORS`允许跨域请求后，请求依然会出现`跨域报错`

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201228155615164.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1NDcyODEz,size_16,color_FFFFFF,t_70#pic_center)


## 问题解决

* 问题一

使用`multipart/form-data`形式上传文件，需要使用到`FormData`对象

1. 创建一个空对象

```js
let fromData = new FormData();
```

2. API添加查看数据 

```js
/*
*append() 追加数据,当字段已经存在时,使用append()添加相同字段，相当于对一个数组使用push()
*/
fromData.append("name","oss");
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201228155632772.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1NDcyODEz,size_16,color_FFFFFF,t_70#pic_center)


```js
/*
*set()方法,不管相同字段多次set，前面的值会被后面的值给覆盖掉
*/
fromData.set("name","oss");
fromData.set("name","lihai");
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201228155639914.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1NDcyODEz,size_16,color_FFFFFF,t_70#pic_center)


```js
/*
*getAll() 返回一个数组,数组中包括传入字段的值
*get() 返回一个字符串类型的数据，如果某个字段多次append()数据，get方法永远都是获取第一次append的数据
*/
formData.getAll("age");// ["10", "11"]
formData.get("age");//"10"
```

**注意点：**

向`FormData`对象添加任何数据类型的值都会被自动转化成字符串类型

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201228155652983.png#pic_center)




**使用`axios`发送**

axios应该需要二次封装，为了方便我用原生发送

```js
import Axios from "axios";
Axios.post(url,formData,{
    headers:{
        "Content-Type":"multipart/form-data"
    }
})
```

* 问题二

请求服务器接口会返回一些数据

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201228155701866.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1NDcyODEz,size_16,color_FFFFFF,t_70#pic_center)


获取数据后，前端部分只需要使用`FromData`对象添加字段数据

上传文件使用`vant`组件`uploader`

```vue
<uploader :after-read="onChange" v-if="index === 3">
    <div class="items-title">
        <p :class="{ font: index === 0 || index === 3 }">
            <img src="../../assets/images/icon/mandatory.png" alt="" />
        </p>
        <h3>{{ val.title }}</h3>
    </div>
</uploader>
```



`Vue`核心代码

```js
onChange: async function (e) {
    let data = await this.getOss();//服务接口返回数据 
    const files = e,
          file = files.file,
          maxLen = 9;
    if (!/^image\/.+$/.test(file.type)) {
        Toast("请选择图片");
        return;
    }

    /**
       * 服务器签名直连
       */
    let fileName = `${Date.now()}.${file.type.split("/")[1]}`,//使用时间来定义文件名
        pathName = `${data.dir}${fileName}`;//相对路径   
    this.Files.set("key", pathName);//key 唯一值  即相对路径
    this.Files.set("policy", data.policy);//服务器返回的policy
    this.Files.set("OSSAccessKeyId", data.accessId);//服务器返回的accessId
    this.Files.set("success_action_status", "200");//定义成功为200
    this.Files.set("signature", data.signature);//服务器返回的signature
    this.Files.set("name", fileName);//文件名
    this.Files.set("file", file, fileName);//文件对象
    
    this.fileUpdata(data.host, pathName);
},
    
fileUpdata: async function (url, fileName) {
    let res = await _http.post(url, this.Files, {//发送请求的url就是服务器返回的host
      "Content-Type": "multipart/form-data",
    });
},
```

* 问题三

终于将请求发出去了，但没想到它报跨域错误。还是在阿里云后台已经把`CORS`修改成`*`的前提下。

参考文档:<a href="https://help.aliyun.com/document_detail/31870.html?spm=a2c4g.11186623.2.9.1aba5d49k0Z2dG ">https://help.aliyun.com/document_detail/31870.html?spm=a2c4g.11186623.2.9.1aba5d49k0Z2dG </a>

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201228155716340.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1NDcyODEz,size_16,color_FFFFFF,t_70#pic_center)


`xhr.withCredentials=false;`表示跨域请求时，不发送cookit资源

我想到`Axios`二次封装，我把这个字段设置成了`true`,

```js
axios.defaults.withCredentials = true;
```

将`axios.defaults.withCredentials`设置回`false`后，成功了！！！！

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201228155728529.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1NDcyODEz,size_16,color_FFFFFF,t_70#pic_center)


`https://ywja-public-bucket.oss-cn-hangzhou.aliyuncs.com/`加上前面自己拼接上传的文件的相对路径就可以在浏览器上访问该图片了

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201228155743473.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1NDcyODEz,size_16,color_FFFFFF,t_70#pic_center)


![在这里插入图片描述](https://img-blog.csdnimg.cn/20201228155752625.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1NDcyODEz,size_16,color_FFFFFF,t_70#pic_center)
## 图片压缩
> 本来没有东西写了，但我又遇到了个问题。在移动端上传图片文件大小会很大，占流量，而且上传后，再加载浏览会加载很慢，所有在上传图片文件时，要将图片进行压缩一次

前端压缩使用`canvas`进行操作,在原有代码上修改
```js
  onChange: async function (e) {
      let data = await this.getOss();
      const files = e,
        file = files.file,
        maxLen = 9;
      if (!/^image\/.+$/.test(file.type)) {
        Toast("请选择图片");
        return;
      }
      if (this.htmlContext.length === maxLen) {
        return Toast("图片已超出数量");
      }
      this.showIconFn("上传中", "loading");

      /**
       * 服务器签名直连
       */
      let fileName = `${Date.now()}.${file.type.split("/")[1]}`,
        pathName = `${data.dir}${fileName}`;
      this.Files.set("key", pathName);
      this.Files.set("policy", data.policy);
      this.Files.set("OSSAccessKeyId", data.accessId);
      this.Files.set("success_action_status", "200");
      this.Files.set("signature", data.signature);
      this.Files.set("name", fileName);
      //图片压缩
      this.compression(file, data.host, pathName);
    },
    compression(file, host, pathName) {
      let image = document.createElement("img"),
        max = 600;//图片宽高
      self = this;
	 //图片加载后触发函数 
      image.onload = function () {
        let w = image.width,
          h = image.height,
          nw = w,
          nh = h;
        if (w > max) {
          nw = max;
          nh = h / (w / nw);
        }
        if (h > max) {
          nh = max;
          nw = w / (h / nh);
        }
       
        const canvas = document.createElement("canvas"); //新建一个画布,用来处理图像
        let ctx = canvas.getContext("2d") || canvas.getContext("2D"); //画布为2d
        canvas.width = nw;
        canvas.height = nh; //初始化画布的大小为之前的计算结果
        ctx.clearRect(0, 0, canvas.width, canvas.height); //清空画布
        ctx.drawImage(image, 0, 0, nw, nh); //绘制画布
		
		/*
		* 图片压缩关键在于canvas方法toBlob,第一个参数是回调函数，第二个参数为转化的图片格式,第三个参数是像素位数。将图片转化成image/jpg或image/webp大小可以变小
		*/
        canvas.toBlob(
          (blob) => {
          	//oss上传Blob文件会报错，所以再将Blob文件转化回File形式在上传阿里oss
            let files = new File([blob], file.name); //拿到的blod文件转化成文件
            self.Files.set("file", files, file.name); //将压缩后的图片二进制文件传入表单对象
            self.fileUpdata(host, pathName);
          },
          "image/webp",
          0.95
        ); 
      };
      image.src = URL.createObjectURL(file);
    },
```



