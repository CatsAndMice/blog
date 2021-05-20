![代码整洁](C:%5CUsers%5Cjasolar%5CDesktop%5C%E6%97%A5%E5%B8%B8%E8%AE%B0%E5%BD%95%5C%E4%BB%A3%E7%A0%81%E6%95%B4%E6%B4%81.png)

> 上图是我阅读书籍——代码整洁之道，绘制的思维导图。写本篇博客的目的是为了加强记忆，其中关于类模块没有总结，是因为最近在研究设计模式，有一定基础后，写一篇设计模式的学习笔记，其中会包括关于写类需要注意的整洁。

### 一，命名

##### 采用描述性名称

bad

```js
//获取当前时间
let yyddss = new Date();
```

good

```js
let curDate = new Date();
```

##### 说明副作用

bad

```js
function getOss(){
    if(!oss){
        return new Oss();
    }
    return oss;
}
```

good

```js
function createOrReturnOss(){
    if(!oss){
        return new Oss();
    }
    return oss;
}
```

`oss`不存在则创建，否则返回`oss`。名称`createOrReturnOss`恰当表述清楚。

##### 避免编码

bad

```js
class Person{
    p_name = '整洁';
	p_age = '20';
	//...
}
```

good

```js
class Person{
 	name = '整洁';
	age = '20';
	//...
}
```

`m_,f_`之类的前缀没有意义

##### 统一的命名规则

###### 构造函数使用大驼峰命名

bad

```js
function user(){
    //...
}
let u = new user();
```

good

```js
function User(){
    //...
}
let user = new User();
```

###### 变量，函数使用小驼峰或下划线分隔

bad

```js
let myname = '整洁';
function getname(){
    //...
}
```

good

```js
let my_name = '整洁';
//或
let myName = '整洁';

function getName(){
    //...
}
//或
function get_name(){
    //...
}
```

##### 清除魔法字符，数字

不要有硬代码，字符串，数字使用变量进行命名

bad

```js
setTimeout(()=>{
    //...
},200);
```

good

```js
const  WAIT_TIME = 200;
setTimeout(()=>{
    //...
}, WAIT_TIME)
```



### 二，注释

##### 不在代码中保存注释掉的代码

有git版本控制，不需要担心代码丢失，需要时查看历史记录找回即可

bad

```js
getName();
//getAge();
//getWifeName();
```

good

```js
getName();
```

##### 减少注释

好的代码就是文档，需要写注释前优先考虑重构代码。将精力花写出整洁有表达力的代码，而不是写大量的注释

bad

```js
//data是否含有id
function isIdIncludeData(data,id){
    //数组长度
    let len = data.length;
    //循环数组
    for(let i = 0;i<len;i++){
        //如果存在则返回true
        if(id === data[i]){
            return true;
        }
    }
    //不存在则返回false
    return false;
}
```

good

```js
//data是否含有id
function isIdIncludeData(data,id){
    let len = data.length;
    for(let i = 0;i<len;i++){
        if(id === data[i]){
            return true;
        }
    }
    return false;
}
```



### 三，函数

##### 参数越少越好

参数增多，参数组合传入就越多，不利用于测试，而且参数越多说明该函数做的不只一件事情。不可避免时可以使用一个对象包裹传入

bad

```js
function createPerson (name,age,sex){
   //...
}
```

good

```js
let personInfo = {
    name:'js',
    age:20,
    sex:'men'
}
function createPerson (personInfo){
    //...
}
```

##### 一个函数只做一件事

bad

```js
function isAdmin(admin){
    let isInAdmins = admins.includes(admin);
    if(isAdmin){
        arrs.forEach(arr=>{
            //...
        })
        return true;
    }
    datas.forEach(data=>{
        //...
    })
    return false;
}
```

good

```js
function arrsEach(){
    arrs.forEach(arr=>{
        //...
    })
}
function datasEach(){
    datas.forEach(data=>{
        //...
    })
}

function isAdmin(admin){
    return admins.includes(admin);
}

function arrsOrDatasEach(){
    isAdmin()? arrsEach():datasEach();
}
```

##### 删除死函数

删除代码中不调用的函数,需要时历史记录中找回

bad

```js
function getName(){
    //...
}
function getAge(){
    //...
}
getName();
```

good

```js
function getName(){
    //...
}
getName();
```

#####  分离`try...catch...`

`try...catch...`中的代码使用函数包裹，分离出来。

bad

```js
function haveError(){
    try{
        datas.forEach(data=>{
            //....
        })
    }catch(e){
        //...
    }
}
```

good

```js
function haveError(){
    try{
       datasEach(); 
    }catch(e){
        //...
    }
}
function datasEach(){
    datas.forEach(data=>{
        //....
     })
}
```

##### 不重复

###### 类似功能抽离公共代码

bad

```js
function arrsEach(){
    arrs.forEach(arr=>{
        //...
    })
}
function datasEach(){
    datas.forEach(data=>{
        //...
    })
}

function isAdmin(admin){
    return admins.includes(admin);
}

function arrsOrDatasEach(){
    isAdmin()? arrsEach():datasEach();
}
```

good

```js
function each(params){
    params.forEach(param=>{
    	//...           
    })
}
function isAdmin(admin){
    return admins.includes(admin);
}

function arrsOrDatasEach(){
    isAdmin()? each(arrs):each(datas);
}
```

###### 减少`if...else...`或`switch...case...`嵌套链

bad

```js
function getType(data){
    let type = typeof data,
     stringType = 'string',
     numberType = 'number',
     //...;

    if(type === stringType){
      	Number(data);
    }else if(type===numberType){
        String(data);
    }
    //...
}
```

good

```js
let typeMaps = new Map([
    ['string',data=>{
        Number(data);
    }],
    ['number',data=>{
        String(data);
    }]]);
function getType(data){
    let type = typeof data;
    typeMaps.has(type)&&typeMaps.get(type)();
}
```

##### 判断条件

###### 封装判断条件

bad

```js
if(isHavePerson()&&isAdmin()){
   //...
}
```

good

```js
if(isPoss()){
   //...
 }
```

###### 避免否定性条件

bad

```js
function isHavePerson(){
    //...
}
if(!isHavePerson()){
   //...
 }
```

good

```js
function isHavePerson(){
    //...
}
if(isHavePerson()){
   //...
 }
```

###### 封闭边界条件

bad

```js
if(num+1>2){
 //...  
 }
```

good

```js
let one = 1,
    two = 2,
    sum = num + one,
    isBigger = sum > two;
if(isBiggeer){
    //...
}
```



### 四，对象和数据结构 

##### 使用`getters,setters`

javaScipt没有接口或类型，也没有`public`和`private`关键字。

使用原因：

* 获取一个对象属性在背后做更多的事情，不需要在代码库中查找修改每一处访问；
* `set`方便添加已验证；
* 封装内部实现;
* 使用getting,setter时，容易添加日志和错误处理
* 延迟加载对象属性，从服务器获取值然后在赋值给对象属性

bad

```js
class Person{
    constructor(age = 20){
        this.age = age;
    }
}
const person = new Person ();
person.age = 120;
console.log(person.age);
```

good

```js
class Person {
    constructor(age = 20){
        this._age = age;
    }
    set age(val){
        //年龄大于100或小0，为不合理
        let isErrorAge = val>100||val<0;
        isErrorAge ? null:this._age = val;
    }
    
    get age(){
        return this._age;
    }
}
const person  = new Person ();
person.age = 120;
console.log(person.age);
```

##### 私有成员

利用ES5闭包实现

bad

```js
function Person(name){
    this.name = name;
}
Person.prototype.getName = function (){
    return this.name;
}
const person  = new Person ('hai');
person.getName();//hai
delete person.name;
person.getName();//undefind
```

good

```js
function Person(name){
   this.getName = function (){
       return name;
   }
}
const person  = new Person ('hai');
person.getName();//hai
delete person.name;
person.getName();//hai

//或es6 class
class Person {
    //私有成员 ES2020新添加语法，#前缀声明私有成员
    #age;
    constructor(age = 20) {
        this.#age = age;
    }
	setAge(age){
        this.#age = age;
    }
    getAge() {
        return this.#age;
    }
}
```

##### 参考jquery链式调用思想

jquery中讲究链式调用，链式调用使用代码更加简洁，减少逻辑。每个方法最后均返回`this`

bad

```js
class Person {
	constructor(){
		this.name = 'hai';
		this.age = 20;
		this.sex = 'man';
	}
	setName(name){
		this.name = name;
	}
	setAge(age){
		this.age = age;
	}
	setSex (sex){
		this.sex = sex;
	}
}
const person =new  Person();
person.setName('java');
person.setAge(25);
person.setSex('wemen');
```

good

```js
class Person{
   constructor(){
		this.name = 'hai';
		this.age = 20;
		this.sex = 'man';
	}
	setName(name){
		this.name = name;
        return this;
	}
	setAge(age){
		this.age = age;
        return this;
	}
	setSex (sex){
		this.sex = sex;
        return this;
	}
}
const person = new Person();
person.setName('java')
	  .setAge(25)
	 .setSex('wemen');
```



### 五，代码美化

注意代码格式，当然我们要借助工具，自动格式化代码。

##### 函数调用方与被调用方应该靠近

人习惯性地从上往下进行阅读。由于这个原因，代码应该按从上往下让人阅读

bad

```js
class Person {
    name = 'javaScipt';
    age = 20;
    wife = "java";

    setAge(age) {
        this.age = age;
    }

    getAge() {
        return this.age;
    }

    getWife() {
        return this.wife;
    }

    setWife(name) {
        this.wife = name;
    }

    getSelfInfo() {
        return `名字:${this.getName()},年龄:${this.getAge()},女朋友:${this.getWife()}`
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }
}
const person = new Person();
console.log(person.getSelfInfo());
```

good

```js
class Person {
    name = 'javaScipt';
    age = 20;
    wife = "java";

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setAge(age) {
        this.age = age;
    }

    getAge() {
        return this.age;
    }

    setWife(name) {
        this.wife = name;
    }

    getWife() {
        return this.wife;
    }

    getSelfInfo() {
        return `名字:${this.getName()},年龄:${this.getAge()},女朋友:${this.getWife()}`
    }
}
const person = new Person();
console.log(person.getSelfInfo());
```



### 参考

<a href="https://github.com/beginor/clean-code-javascript#%E6%B3%A8%E9%87%8A">github开源项目——clean-code-javascript</a>

<a>书籍——代码整洁之道(java语言)</a> 

