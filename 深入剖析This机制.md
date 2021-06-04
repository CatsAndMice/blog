> JavaScript中有许多令人困惑的地方，但是，因为这些东西让JavaScript更加强大。例如原型链，闭包等，其中包括this机制，处处坑。

#### This绑定规则   

> this机制有四种绑定的规则：默认绑定，隐式绑定 ，显式绑定 ，new绑定，分别对应函数四种**调用方式**：函数直接调用 ， 对象方法调用，间接调用 ，构造函数调用。
>
> **非严格模式下: ** `this`都会指向一个对象

##### 默认绑定

全局环境，`this`指向`window`

```js
console.log(this == window);//true
```

独立调用的方法，`this`指向`window`

```js
function fn (){
    console.log(this==window);//true
}
```

调用嵌套的函数，`this`指向`window`

```js
function fn (){
    function test(){
        console.log(this == window);//true
    }
    test();
}
fn();
```

以上是在非严格模式下情况。

在严格模式下，默认绑定有区别。非严格模式下`this`会绑定到上级作用域，而严格模式(`use strict`)时,不会绑定到`window`对象身上

```js
function fn(){
    'use strict';
    console.log(this);//undefined
}
fn();
```



##### 隐式绑定

调用对象中的方法，该方法中`this`指向对象本身

```js
let obj = {
    count:1,
    getCount(){
        console.log(this);//obj
        console.log(this.count);//1
    }
}
obj.getCount();
```

上述代码相当于

```js
let obj = {
    count:1,
    getCount(){
        console.log(obj);//obj
        console.log(obj.count);//1
    }
}
obj.getCount();
```



##### 显式绑定

通过`call()`,`apply()`,`bind()`，强制改变`this`指向

```js
let count = 2
let obj = {
    count:1,
    getCount(){
        console.log(this.count);//2
    }
}

obj.getCount.call(this);
```

```js
let obj1 = {
    a:'obj1’
},
 obj2 = {
     a:'obj2'
 }
function fn(){
    console.log(this.a);
}

fn.call(obj1);//obj1
fn.call(obj2);//obj2

```

```js
let obj = {
    a:"obj"
}
let a = 'a'
function fn (param){
    console.log(this.a);
    console.log(param);
}
fn()//a
fn.call(obj,'call')//obj,call
fn.apply(obj,['apply'])// obj , ['apply']

let fnBind = fn.bind(obj);
fnBind('bind');//obj , 'bind'


```

`call(),apply(),bind()`均可以改变`this`指向



###### `call(),apply()`与`bind()`的区别

`fn.bind(obj)`时，`bind`方法会返回一个已经绑定`this`的**新函数**。需要单独再次调用都会执行

```js
let obj = {
    name:'bind'
}
function fn (){
    console.log(this.name);
}
let fn1 = fn.bind(obj);
fn1();//bind
```

`call(),apply()`绑定`this`，并执行该方法

```js
let obj = {
    name:'obj',
    getName(){
        console.log(this.name);
    }
}

let obj1 = {
    name:'call'
}
let obj2 = {
    name:'bind'
}

obj.getName.apply(obj2)//bind
obj.getName.call(obj1);//call
```



###### `apply()`与`call()`的区别

两者在于传递的参数形式不同,`apply()`接收的参数为数组形式



##### new绑定

函数或者方法是使用`new`调用,它就当成构造函数调用。

```js
function Fn (){
    this.name = "fn";
}
let f = new Fn();
console.log(f);//{name: "fn"}
```

一般使用构造函数不会使用`return`。new调用时，内部会创建一个`this`的对象将我们添加的属性挂到时`this`对象身上并返回。

如果在构造函数中`return`一个原始值，然后再进行new绑定，内部会忽略掉构造函数返回的原始值，自己创建一个对象并返回

```js
function Fn(){
    this.name = "fn";
    return 1;
}
let f = new Fn();
console.log(f);//{name: "fn"}
```

如果构造函数返回一个对象时，new绑定时内部不再自行创建，而是直接将对象返回即可

```js
function Fn(){
    this.name = "fn";
    return {
        name:'object',
        age:20
    }
}
let f = new Fn ();
console.log(f);//{name: "object", age: 20}
```



#### This绑定丢失

别名丢失隐式绑定

```js
var name = 'window';
let obj = {
    name:'obj',
    getName(){
        return this.name;
    }
}

let getName = obj.getName;
console.log(getName());//'window'

```

回调丢失隐式绑定

```js
const WITH_TIME = 1000;
let name = "window";
let obj = {
    name:"obj",
    getName(){
        console.log(this.name);
    }
}

setTimeout(obj.getName,WITH_TIME);//window
```

##### This丢失修复

显式`bind()`绑定this

```js
var name = 'window';
let obj = {
    name:'obj',
    getName(){
        return this.name;
    }
}

let getName = obj.getName.bind(obj);
console.log(getName());//'obj'
```

es6剪头函数

```js
const WITH_TIME = 1000;
let name = "window";
let obj = {
    name:"obj",
    getName(){
       setTimeout(()=>{
           console.log(this.name);//'obj'
       },WITH_TIME);
    }
}
obj.getName();

```



#### This绑定优先级

##### 显式绑定VS隐式绑定

```JS
function getName(){
    console.log(this.name);
}
let obj1 = {
    name:"javaScipt",
    getName:getName
}
let obj2 = {
    name:'Python',
    getName:getName
}

obj1.getName();//'javaScipt'
obj2.getName();//'Python'

obj1.getName.call(obj2);//Python
obj2.getName.call(obj1);//javaScipt
```

结论：显式绑定优先级大于隐式绑定



##### 隐式绑定VS`new`绑定

```js
function getName(){
    console.log(this.name);
}
let obj1 = {
    name:"javaScipt",
    getName:getName
}
let obj2 = {
    name:'Python',
    getName:getName
}

obj1.getName();//'javaScipt'
obj2.getName();//'Python'

let o1 = new obj1.getName();//undefined
let o2 = new obj2.getName();//undefined
```

结论：new绑定优先级大小隐式绑定



#####  显式绑定VS`new`绑定

```js
function getName(){
    console.log(this.name);
}
let obj1 = {
    name:"javaScipt",
    getName:getName
}
let obj2 = {
    name:'Python',
    getName:getName
}

obj1.getName.call(obj2);//'Python'
obj2.getName.call(obj1);//'javaScitp'

let o1 = new obj1.getName.call(obj2);//obj1.getName.call is not a constructor
let o2 = new obj2.getName.call(obj1);//obj2.getName.call is not a constructor
```

直接报错了，显式绑定与new绑定不能共用

`bind()`呢？

```js
function getName(){
    console.log(this.name);
}
let obj1 = {
    name:"javaScipt",
    getName:getName
}
let obj2 = {
    name:'Python',
    getName:getName
}

let f1 = obj1.getName.bind(obj2);
let f2 = obj2.getName.bind(obj1);
f1();//'Python'
f2();//'javaScitp'

let b1 =obj1.getName.bind(obj2);
let b2 = obj2.getName.bind(obj1);
let o1 = new b1();//undefined
let o2 = new b2();//undefined
```

`bind()`会返回一个改变`this`指向的函数，然后`new`调用,`this`又改变了

结论: new绑定优先级大于显式绑定



#### 参考文章

<a href="https://github.com/ascoders/weekly/blob/master/%E5%89%8D%E6%B2%BF%E6%8A%80%E6%9C%AF/13.%E7%B2%BE%E8%AF%BB%E3%80%8AThis%20%E5%B8%A6%E6%9D%A5%E7%9A%84%E5%9B%B0%E6%83%91%E3%80%8B.md">13.精读《This带来的困惑》</a>



#### 往期文章

<a href="https://blog.csdn.net/qq_45472813/article/details/117062661">看完这篇，让您的js优雅一个档次</a>

<a href="https://blog.csdn.net/qq_45472813/article/details/114790141">多个Vue项目如何配置nginx</a>

<a href="https://blog.csdn.net/qq_45472813/article/details/113793943">重学Vue Components</a>

<a href="https://blog.csdn.net/qq_45472813/article/details/111868454">前端Vue+axios实现阿里云oss文件上传(服务端签名直传)</a>

<a href="https://blog.csdn.net/qq_45472813/article/details/106169939">前端奇技淫巧之js调试</a>