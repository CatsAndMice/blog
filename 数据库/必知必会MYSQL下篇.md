> 大家好，我是码爸爸👦，每天努力一点点💪，就能升职加薪💰当上总经理出任CEO迎娶白富美走上人生巅峰💥，想想还有点小激动呢😎。奥力给！！

目录：

<a>分页查询(重点)</a>

<a>DDL(表的增删改)</a>

​				&ensp;	​		&ensp;<a>创建表</a>

​				&ensp;	​		&ensp;<a>MYSQL字段的数据类型</a>

​			&ensp;	​		&ensp;<a>`insert`语句</a>

​				&ensp;	​		&ensp;<a>修改数据</a>

​				&ensp;	​		&ensp;<a>删除数据</a>

<a>约束（重点）</a>

​				&ensp;	​		&ensp;<a>非空约束</a>

​				&ensp;	​		&ensp;<a>唯一约束(unique)</a>

​				&ensp;	​		&ensp;<a>主键约束</a>

​				&ensp;	​		&ensp;<a>外键约束</a>

<a>事务</a>

​				&ensp;	​		&ensp;<a>什么是事务</a>

​				&ensp;	​		&ensp;<a>演示</a>

<a>索引</a>

​				&ensp;	​		&ensp;<a>什么是索引？有什么用？</a>

​				&ensp;	​		&ensp;<a>创建索引</a>

<a>视图</a>

​				&ensp;	​		&ensp;<a>什么是视图</a>

​				&ensp;	​		&ensp;<a>怎么创建视图？怎么删除视图？</a>

​				&ensp;	​		&ensp;<a>视图作用</a>

<a>总结</a>

前面将`SQL`中的查询语句基本上过了一遍，忘记了的小伙伙要复习复习。

博客中使用到的数据表均在前一篇博客交代过，有疑问的小伙伴也可以私聊我

<a href="https://blog.csdn.net/qq_45472813/article/details/109736158">必知必会MYSQL</a>

### 分页查询(重点)

> 前后分离开发中，前端经常需要分批请求服务器数据。这个时候就要借助数据库中的分页功能，

`limit`查询是`mysql`特有的，其他数据库不能使用（oracle中胡一个相同的机制叫`rownum`）

```sql
... limit startIndex, lenght  //startIndex表示起始位，lenght表示需要查询的长度
```

取工资最高前五位

```sql
select ename,sal from emp order by sal desc limit 0,5; 
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020120611082449.png#pic_center)


```sql
select ename,sal from emp order by sal desc limit 5; //省略一个参数时，从索引0开始
```

思路：查询sal字段数据结果后进行降序，最后分页

所以`limit`执行顺序是再`order by`之后

```
		执行顺序
select    5 
...
from 	  1
...
where     2
...
group by  3
...
having    4
...
order by  6 
...
limit     7
...;
```

### DDL(表的增删改)

> 该部分相对容易，重点是理解mysql中字段的数据类型

#### 创建表

创建表语句格式：

```
create table 表名 (
字段名 数据类型，
...
);
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201206110840724.png#pic_center)


![在这里插入图片描述](https://img-blog.csdnimg.cn/20201206110852767.png#pic_center)


#### MYSQL字段的数据类型

常用数据类型：

```
int 	   整数型
bigint	   长整数
float	   浮点型
char	   定长字符串
varchar    可变长字符串   (效率没有char快)
date	   日期类型
BLOB	   二进制对象(存储图片，视频等)
CLOB 	   字符大对象(存储大数据的文本)
```

* `char`,`varchar`如何选择

当某个字段长度肯定时，使用`char`,例如：性别，出生年份

当不肯定字段长度时，使用`varchar`,例如：用户的个性签名



* 数据类型后面的括号

经常性的看到创建表时，数据类型后面会带有`(..)`

```sql
create table t_c(name varchar(255),age int(2));
```

这样做是人为的规定字段数据字符的长度，超出规定长度报错



* 查看表中的所有字段类型

```sql
create table t_c(name varchar(1));
```

查看字段类型

```sql
desc t_c;
```



![在这里插入图片描述](https://img-blog.csdnimg.cn/2020120611090984.png#pic_center)


当我们只是创建表，但没有插入值时。默认字段值为`null`

如果要想默认值不是`null`,可以自己设置

```sql
create table t_d(name varchar,num int,age int default 0);
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020120611094770.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1NDcyODEz,size_16,color_FFFFFF,t_70#pic_center)


`age int default 0`将age字段值默认值修改成了0



* 表的复制

语法：

```
create table 表名 as select语句 ;//将查询结果当做表创建出来 
```

将emp中的ename,job字段复制

```sql
create table t_emp as select ename,job from emp;
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201206111049793.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1NDcyODEz,size_16,color_FFFFFF,t_70#pic_center)




**建议：**

当我们创建表时，命名时要用`t_`或 `tbl_`开始。见名知意，便于管理



#### `insert`语句

> 插入数据 

语法格式：

```
insert into 表名 (字段1,字段2...) values(值1,值2...);
```

向表`t_c`中的`name`插入值

```sql
insert into t_c (name) values("m");
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201206111103637.png#pic_center)


可省略`values`

```sql
insert into t_c ("lihai");//括号中的值，与创建表的字段是一一对应的
```

一次插入多行

```sql
insert into t_c (name) values("a"),("b");
```

* 表的复制(`insert`)

方式一：

```sql
create table t_e as select ename,job from emp;
```

方式2：

```sql
create table t_e (name varchar(255),job varchar(255));
```

```sql
insert into t_e select ename,job from emp;
```

#### 修改数据

> `insert`只能插入，并不能将已存在的数据修改

语法格式：

```
update 表名 set 字段1 = 值1 ，字段2 = 值2 ... where 条件;
```

当没有限制条件时，将把整张表的数据修改

将部门10的loc修改为hai，将部门名称修改为li

```sql
update dept set loc='shanghai' ,dname = 'renshibu' where deptno = 10;
```

更新所有数据 

```sql
update dept set loc = "x",dname = "y";
```

#### 删除数据

语法格式：

```
delete from 表名 where 条件;
```

当没有限制条件时，全部删除

删除10部门的数据 

```sql
delete from dept where deptno = 10;
```

删除所有数据

```sql
delete from dept;
```

* `truncate`删除

使用`truncate`可以将整个表中的内容清空，**删除后数据不可找回**

语法格式：

```sql
truncate table 表名;
```

删除表`t_e`

```sql
truncate table t_e;
```

* `drop`删除

> 将表整个删除，使用`show tables`也不会有删除后的表

语法：

```
drop table 表名;
```

一般对表结构修改，会使用工具，实际开发中对表结构的修改很少。如果真的要修改，百度完全可以搞定

### 约束（重点）

> 在创建表的时候，可以给表的字段添加相应的约束，添加约束的目的是为了保证表中数据的合法性，有效性，完整性

常见约束：

非空约束(`not null`):约束字段不能为`null`

唯一约束(`unique`):约束字段不能重复

主键约束(`primary key`):约束字段不能为`null`,也不能重复(简称pk)

检查约束(`check`):Oracle数据库有check约束，但mysql没有，目前mysql不支持该约束

#### 非空约束

```SQL
drop table if exists t_user; //如果表存在则删除
```

创建表设置非空约束

```sql
create table t_user(id int,username varchar(255) not null ,paddward varchar(255));
```

插入数据

```sql
insert into t_user(id , paddward) values(1,"paddward");
```

执行会报错：`ERROR 1364 (HY000): Field 'username' doesn't have a default value`

`usename`不能为默认值，默认值为`null`

#### 唯一约束(unique)

> 唯一约束，修饰字段具有唯一性，不能重复，但可以为`null`

```sql
drop table t_user if exists t_user;
```

```sql
create table t_user(id int,name varchar(255),paddward varchar(255) unique);
```

```sql
insert into t_user values(1,"lihai","123");
insert into t_user values(2,"lihai01","123");//报错paddward唯一约束不可重复，可以为null
```

* 列级约束与表级约束

  * 列级约束

  > 表中只给一个字段唯一约束

  ```sql
  create table t_user(id int unique,name varchar(255));
  ```

  * 表级约束

  > 创建表时，使用相应的约束函数。可以给一个字段也可以给多个字段 

  ```sql
  create table t_user(id int,name varchar(255),unique(id,name))
  ```

  使用表级约束时，字段值要全部相同才会算重复

  例如：

  ```
  id 		name
  1		"100"
  1		"200"
  ```

  这样不属于重复

**注意：**非空只有列级约束，并没有表级约束

#### 主键约束

创建主键字段 

```sql
create table t_user(id int primary key);
```

主键特点：

1. 主键字段值不能重复
2. 主键字段不能为`null`
3. 每个表中只能有一个主键字段 

表级约束主键

```sql
create table t_user(id int, primary key(id));
```

* 自增约束

> 使用自增约束后。若省略自增字段插入字段值，自增字段会自动加一

```sql
drop table  if exists t_user;
```

```sql
create table t_user(id int primary key auto_increment,name varchar(255));
```

只给`name`字段插入值

```sql
insert into t_user(name) values("1");
insert into t_user(name) values("2");
```

```sql
select * from t_user;
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201206111719565.png#pic_center)


主键使用自增`auto_increment`,不对主键插入值时，插入一条记录都会使主键值加一。也因此主键需要是一个数字值才能加一。当主键不是一个数字类型值时，不能使用`auto_increment`

**注意：**`auto_increment`自增，只能使用到主键字段 

* 主键作用

三范式有要求，第一范式要求任何一张表都应该有主键

主键值是记录在表中的唯一标识 

表级约束方式定义主键

```sql
drop table if exists t_user;
create table t_user(id int ,name varchar(255), primary key(id));
```

复合主键（不推荐）

```sql
create table t_user(id int,name varchar(255),primary key(id,name));
```

#### 外键约束

例如：

t_class  班级表

```
no		cname
101		一班
102     二班
```

t_student  学生表

```
sno		name		classno(该字段添加外键约束)
1		"a"			  101
2		"b"			  102
```

t_student 学生表中`classno`添加外键约束后，该字段的值必须是t_class班级表中的值

```sql
create table t_student(sno int,name varchar(255),classno int foreign key (classno) references t_calss(cno));
```

`classno int foreign key (classno) references t_calss(cno)`表示t_student表中的classno字段以表t_class中字段`no`作为外键 

t_student表中的`classno`字段值必须属于t_class表中`no`字段的值。此时t_student为子表，t_class为父表

顺序要求：
		  删除数据时，先删除子表，再删除父表。
		  添加数据时，先添加父表，在添加子表。
		  创建表时，先创建父表，在创建子表。
		  删除表时，先删除子表，在删除父表。
		  删除表时，先删除子表，在删除父表。

外键是可以为`null`

外键字段引用其他某个字段时，被引用的字段必须是主键吗？

**注意：**被引用的字段不一定是主键，但至少具有unique约束



### 事务

#### 什么是事务

一个事务是一个完整的业务逻辑单元，不可两分

比如：银行账户转账，从a账户向b账户转账1000，需要执行两条sql

```sql
update t_act set balance = balance - 1000 where actno = 'act-001';
```

```sql
update t_act set balance = balance + 1000 where actno = 'act-002';
```

以上两条语句要么同时成功，要么同时失败。不允许一条成功，一条失败

要保证该两条DML语句成功或者同时失败，那么就要使用数据库的**事务**

语句：

```sql
rollback
```

```sql
commit
```

#### 演示

mysql事务默认情况下是自动提交的，执行任意条DML语句则提交一次

创建表并插入一条数据 

```sql
create table t_user(id int , name varchar(255));
insert into t_user (id,name) values(1,"11");
select * from t_user;
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201206111832111.png)





回滚（返回）

```sql
rollback;
select * from t_user;
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201206111413354.png#pic_center)


执行回滚后，并没有反应。因为mysql默认是自动提交，提交后是不能回滚的

关闭自动提交

```sql
start transaction;
```

再次插入一条数据 

```sql
insert into t_user (id,name) values(2,"22");
select * from t_user;
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201206111357554.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1NDcyODEz,size_16,color_FFFFFF,t_70#pic_center)


**注意：**没有提交的数据只是保存在内存中，并没有写入到硬盘中

执行回滚，回滚后前面插入的数据会从内存中清除

```sql
rollback;
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020120611133971.png#pic_center)


每次执行`rollback`回滚后，mysql会开启自动提交。



插入数据提交

```sql
start transaction; //关闭自动提交
insert into t_user values(5,"2222");
select * from t_user;
```

提交

```sql
commit;//提交，提交后不可心再回滚，数据会保存在硬盘中
```



### 索引 

#### 什么是索引？有什么用？

索引相当于一本书，通过目录可以快速找到对应的资源 

查找是数据库有两种方式：

1. 全表扫描
2. 根据索引检索(效率很高)

索引可以提高检索效率，但不能随便添加索引



#### 创建索引 

语法：

创建索引对象

```
create index 索引名称  on 表名(字段名);
```

删除索引对象

```
drop index 索引名称 on 表名;
```

* 索引应用场景
  * 数据量大
  * 该字段数据很少进行增删(当字段增删时，索引也会进行一定的变化。数据量大的同时索引变化就会消耗性能)
  * 该字段经常用于`where`中（根据该字段查询 ）

* 自带索引 

使用主键约束，唯一约束的字段会自动添加索引 

在三范式中每个表都需要一个主键，所以我们根据主键进行检索效率会高

### 视图

#### 什么是视图

> 站在不同角度去看数据（同一张表的数据，通过不同的角度去看待）

#### 怎么创建视图？怎么删除视图？

```sql
 create view myview as select empno , ename from emp ;//创建
 drop view myview;//删除
```
对视图进行增删改查会影响到原表数据（通过视图影响原表数据，不是直接操作原表）

可以对视图进行增删改查

```sql
create view my_view as select job,comm from emp1;//创建视图
select * from my_view;//操作视图
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201206111141868.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1NDcyODEz,size_16,color_FFFFFF,t_70#pic_center)


#### 操作视图改变原表

```sql
delete from my_view where comm is null;
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201206111132445.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1NDcyODEz,size_16,color_FFFFFF,t_70#pic_center)


视图为`my_view`,原表为`emp1`;

当然除了删除操作，其他操作也能改变原表

#### 视图作用

对原表字段选择性的创建视图，人为的防止原表数据全部展示出来。这样保密级别高，不会暴露原表中的重要数据 



### 总结
本篇文章是我在学习`MYSQL`记录下来的笔记，涉及到大部分的基础知识。

希望看完后的你，能够有所收获。如果能够帮助到你就是我最大的满足。

如果本文对你有帮助，就点个赞支持下吧，你的「赞」是我创作的动力。



