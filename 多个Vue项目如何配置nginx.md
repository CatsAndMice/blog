> 环境基于window,文件中的配置路径为绝对路径。window中配置nginx，路径要使用`//`代替`\`

业务需求：一个服务器运行两个vue项目，并且要求端口号必须是一致的。

实现效果：http://localhost:8080/，http://localhost:8080/screen。

#### 一，Vue路由Hash模式配置nginx

路径为`/`访问项目配置：

将Vue-router插件中基础路径选项`base`设置为`/`。

`router/index.js`

```js
const router = new VueRouter({
  base:'/',
  routes,
})
```

打包好的文件`dist`的绝对路径复制，打开nginx配置文件`nginx.conf`,在servera选项中配置路径

```shell
server:{
	# ....
    location / {
        root   D://nginx-1.18.0//html//app//dist//;
        index  index.html index.htm;
    }
	#....
}
```

[![6w3fw8.png](https://s3.ax1x.com/2021/03/13/6w3fw8.png)](https://imgtu.com/i/6w3fw8)



路径为`/screen`访问项目配置：

`router/index.js`

```js
const router = new VueRouter({
  base:'/screen',
  routes,
})
```

`vue.config.js`

```js
module.exports = {
    publicPath:'/screen/',
    //...
}
```

`base`选项与`publicPath`选项值要一致；<a href='https://cli.vuejs.org/zh/config/#publicpath'>关于`publicPath`的介绍</a>

```shell
server:{
	# ....
    location /screen {
        alias   D://nginx-1.18.0//html//screen//dist//;
        index  index.html index.htm;
    }
	#....
}
```

[![6w8thQ.png](https://s3.ax1x.com/2021/03/13/6w8thQ.png)](https://imgtu.com/i/6w8thQ)



`nginx.conf`

```shell
#user  nobody;
worker_processes  1;
#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;
#pid        logs/nginx.pid;
events {
    worker_connections  1024;
}
http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';
    #access_log  logs/access.log  main;
    sendfile        on;
    #tcp_nopush     on;
    #keepalive_timeout  0;
    keepalive_timeout  65;
    #gzip  on;
    server {
        listen       8080;
        server_name  localhost;
        #charset koi8-r;
        #access_log  logs/host.access.log  main;
        location /screen {
        	alias   D://nginx-1.18.0//html//screen//dist//;
        	index  index.html index.htm;
    	}
        location / {
        	root   D://nginx-1.18.0//html//app//dist//;
        	index  index.html index.htm;
    	}
        #error_page  404              /404.html;
        # redirect server error pages to the static page /50x.html
        #
       # error_page   500 502 503 504  /50x.html;
       # location = /50x.html {
       #     root   html;
       # }
        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}
        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}
        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }
    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;
    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}
    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;
    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;
    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;
    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;
    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}
}
```

Hash模式配置完成了！

#### 二，Vue路由History模式配置nginx

同Hash模式配置nginx,History模式配置nginx对Vue文件的操作是一样的。唯独在`nginx.conf`需要添加`try_files`选项配置。

演示的两个Vue项目中`router/index.js`将`History`模式打开

`router/index.js`

```js
const router = new VueRouter({
  mode:'history'
 //...
})
```

`nginx.conf`

```shell
#...
server:{
	# ....
	location / {
		root D://nginx-1.18.0//html//app//dist//;
		index index.html index.htm;
		try_files  try_files $uri $uri/ /index.html;
	}
    location /screen {
        alias   D://nginx-1.18.0//html//screen//dist//;
        index  index.html index.htm;
        try_files $uri $uri/ /screen/index.html;
    }
	#....
}
#...
```

这样Vue路由History模式就配置好了。

#### 三，`nginx.conf`文件中`root`与`alias`的区别

`root`,`alias`都是指定文件路径的方式

`alias`指定文件路径的后面必须以`/`结束 ,`root`指定文件路径以`/`结束不是必须的。

* 当url没有前缀

  url没有前缀时，使用`root`,`alias`没有什么区别

  `root`

  ```shell
  location / {
      root D://nginx-1.18.0//html//app//dist//;
      index index.html index.htm;
  }
  ```

  `alias`

  ```shell
  location / {
      alias D://nginx-1.18.0//html//app//dist//;
      index index.html index.htm;
  }
  ```

  使用`alias`,`root`都能达到我们想要的效果

* 当url有前缀

  url有前缀后，`root`,`alias`各自有不同的表现

  `root`

  ```shell
  location /screen {
      root D://nginx-1.18.0//html//app//dist//;
      index index.html index.htm;
  }
  ```

  指定的文件路径会变成:root路径+location路径；服务器就会去`D:\\nginx-1.18.0\html\app\dist\screen`路径下寻找`index.html`文件，但该路径下没有。访问时是`404`页面

  `alias`

  ```shell
  location /screen {
      alias D://nginx-1.18.0//html//app//dist//;
      index index.html index.htm;
  }
  ```

  指定的文件路径不会发生变化，`alias`路径替换`location`路径

#### 四，`try_files`的作用

> try_files相当于重定向的作用

```shell
location /screen {
    root D://nginx-1.18.0//html//app//dist//;
    index index.html index.htm;
    try_files $uri $uri/ /screen/index.html;
}
```

try_files语法:

```shell
try_files file... uri
```

该语法表示:

try_files后面可以定义多个文件路径和最后一个作为内部跳转的uri，文件路径是`root`和`alias`指令合在一起构造而成的

例如：访问http://localhost/screen, `$uri`就是`/screen`     

`try_files`第一个值是`$uri`, `root+$uri`为`D:\nginx-1.18.0\html\app\dist\screen` 明显服务器查找不到该文件夹；

 `try_files`第二个值是`$uri/`, `root+$uri/`为`D:\nginx-1.18.0\html\app\dist\screen\` 明显服务器也查找不到该文件夹;

最后只能返回`/screen/index.html`,其中`/screen`会被`root`或`alias`替换 ，实际路径为`D:\nginx-1.18.0\html\app\dist\index.html`

前端工程师还需要知道的知识点:<a href="https://blog.csdn.net/kong2030/article/details/82014438?utm_medium=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.control&dist_request_id=&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.control">nginx匹配规则及优先级</a>

<a href='https://blog.csdn.net/qq_45472813/article/details/114790141'>博客CSDN地址</a>

#### 参考

https://juejin.cn/post/6926785971287490573