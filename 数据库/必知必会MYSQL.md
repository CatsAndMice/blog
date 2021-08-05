
![在这里插入图片描述](https://img-blog.csdnimg.cn/cover1/247645555211370768.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,image_MjAyMDA3MTUxNjIxMDEzOC5wbmc=,size_16,color_FFFFFF,t_70,image/resize,m_lfit,w_962#pic_center)
> 大家好，我是码爸爸👦，每天努力一点点💪，就能升职加薪💰当上总经理出任CEO迎娶白富美走上人生巅峰:boom:，想想还有点小激动呢😎。奥力给！！


<a>什么是MYSQL数据库</a>

​		&ensp;	​		&ensp;	<a>MySQL基本命令</a>

 <a>SQL语句</a>

​		&ensp;	​		&ensp;	 <a >SQL语句分类</a>

​		​		&ensp;	​		&ensp;<a>SELECT查询</a>

​				​		&ensp;	​		&ensp;	​		&ensp;	​		&ensp;	<a>WHERE条件判断</a>

​				&ensp;	​		&ensp;	​		&ensp;	​		&ensp;	<a>排序（升序，降序）`order by`</a>

​			&ensp;	​		&ensp;	​		&ensp;	​		&ensp;		<a>分组函数</a>

​				&ensp;	​		&ensp;	​		&ensp;	​		&ensp;	<a>SETECT 语句执行顺序 </a>

​				&ensp;	​		&ensp;	​		&ensp;	​		&ensp;	<a>去重</a>

​				&ensp;	​		&ensp;	​		&ensp;	​		&ensp;	<a>嵌套</a>

​		​				&ensp;	​		&ensp;	​	<a>多表查询</a>

​				&ensp;	​		&ensp;	​		&ensp;	​		&ensp;	<a>年代分类</a>

​				&ensp;	​		&ensp;	​		&ensp;	​		&ensp;	<a>多表连接方式分类（`重点`）</a>



> * mysql安装教程此博客不打算介绍。
>
> * 博客中sql语句执行结果，并没有一一截图展示，每一条sql语句希望大家自己也执行一次
> * 为了便于阅读查找，将mysql基础知识会成两到三篇博客来写
>
> * 博客中使用的数据全部存放在百度网盘链接：<a>https://pan.baidu.com/s/1fiIPNxoT5W2tud-wL7XyKQ </a>  提取码：keev 

## 什么MYSQL数据库

MySQL是一种开放源代码的关系型数据库管理系统（RDBMS）,将数据以表的形式储存为文件。保存在我们电脑硬盘中。我们可以使用一种叫`sql计算机语言`控制MySQL如何储存数据 

### MySQL基本命令

> MySQL基本命令是MySQL独有的，在其他数据库中命令可能并不是这样的，例如：Oracle

向数据库中导入数据`source  C:\windows\..\my.sql `  导入的文件后缀名必须是`.sql`

`show databases;`展示所有数据库

`use 数据库名;`切换至某个数据库

`show tables;`展示该数据库中的所有表

其他`MySQL`命令不一个一个列出来了，直接百度比我列举的更详细

## SQL语句

在介绍MySQL时，说过`SQL语句`是用于告诉MySQL如何存取数据。其他数据库中也能使用`SQL语言`,所以我们学数据库就是学习`SQL`。

### SQL语句分类

> 对数据操作无非就是 **增删改查**

1. 数据操作语言(DML): 操作数据库中的数据。包括：select,insert,updata,delete
2. 数据定义语言(DDL):对表结构的增删改

3. 数据控制语言(DCL):控制权限等命令
4. 其他语言：流程控制语言、内嵌函数、批处理语句等

### SELECT查询

> 为了更直观操作，准备了三个`.sql`文件, 利用`source`导入后，生成了三张表,需要者看目录下的前言

`emp表` 员工信息

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201117094734763.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1NDcyODEz,size_16,color_FFFFFF,t_70#pic_center)


`salgrade表`工资泛围

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201117094746439.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1NDcyODEz,size_16,color_FFFFFF,t_70#pic_center)


`dept`表  工作部门

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201117094758372.png#pic_center)




在`sql`语句中**不区分大小写**，

**注意：** 在`sql`中`null`表示数据为空；

在`sql`中查询表中的数据，使用的是`select`，图中查询语句中用到了`*`表示全部字段。

 例如:查询emp表中所有员工的名字

```sql
select ename from emp;
```

支持多字段查询：

例如：查询emp表中所有员工的名字和薪水

```sql
select ename,sal from emp;
```

#### WHERE条件判断

例如：查询emp表中薪水大于3000的员工名字

```sql
select ename from emp where sal > 3000;
```



* 并且(and)` `或者(or)`语言：

例如：查询emp表中薪水在2000到3000之间所有员工的名字

```sql
select ename from emp where sal>2000 and sal<3000;
```

查询emp表中薪水是2000或者是3000的员工名字

```sql
select ename from emp where sal = 2000 or sal = 3000;
```

**注意：** `sql`语言中`=`表示判断是否相等，并不是赋值



* `and` 与`or`语句联用，  `and`优先级大于`or`

例如： 找出薪资大于1000的并且部门编号是20或30部门的员工

```sql
select ename,sal,deptno from emp where sal>1000 and deptno = 20 or deptno = 30; //错误
```

```sql
select ename,sal,deptno from emp where sal>1000 and (deptno = 20 or deptno = 30);
```

`sql`为了方便提供一个API`in`

`in(20,30)`表示20或30，可以用`in`代替`or`

```sql
select ename,sal,deptno from emp where sal>1000 and deptno in(20,30);
```

与`in(a,b)`相反的是`not in(a,b)`,表示不是a或b的数据 



* 模糊查询`like`

模糊查询中只有二个特殊符号:`%`表示任意个字符，`_`表示一个字符 

例如：查询emp表中员工名字中第二个字母是A的

```sql
select ename from emp where ename like('_A%');
```



* 排除`null`

`is not null` 表示不为`null`的数据

`is null`表示为`null`的数据

找出emp中数据不为null的comm数据

```sql
select comm from emp where comm is not null;
```



#### 排序（升序，降序）`order by`

```sql
select ename ,sal from emp order by sal;//以sal升序
```

```sql
select ename,sal from emp order by sal desc ;//以sal降序
```

`sql中以升序为默认排序`



* 多字段排序

以sal进行降序，当sal相同时按ename进行降序

```sql
select ename,sal from emp order by sal,ename desc;
```

多字段排序时，以最前面的字段作为主导地位，最前面的字段相同时，后面的字段都会起作用；

`order by`后面可以是数字，表示以第几列字段排序

```sql
select ename,sal from emp order by 1;//以第一列的字段进行升序排列 
```

#### 分组函数

求emp表中各部门deptno薪水最多的数值

```sql
select max(sal) as maxSal from emp group by deptno;
```

使用分组函数时，要配合`group by`使用表示以某个字段分组后在作其他的操作（分情况可以不用`group by`）

上述`sql`中，用`group by deptno`表示将`deptno`中相同的数值分成一组，`max(sal)`表示将已经分好的各组中，获取`sal`最大的值；其中`as`表示重命名

其他分组函数：

​	`count()`	计数

​	`sum()	`		求和

​	`avg()`		平均值

​	`max()`		最大值 

​	`min()`		最小值

* 多字段分组

求各部门（deptno）中不同工作（job）的薪水的平均值

```sql
select deptno, job, avg(sal) as avgSal from emp group by deptno , job;
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201117094817484.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1NDcyODEz,size_16,color_FFFFFF,t_70#pic_center)


​	**注意点：** 

​				分组函数会自动忽略`null`,`null`与其他数据操作都是`null`;

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201117094832790.png#pic_center)


为了排除`null`的影响，`sql`提供了`ifnull(comm,0)`函数表示将comm字段中可能为`null`的数值替换成0

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201117094847776.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1NDcyODEz,size_16,color_FFFFFF,t_70#pic_center)


* `having`对分组过滤

找出每个部门(deptno)最高薪资，要求薪水大于2000的数据 

`having`实现

```sql
select ename,max(sal) as maxSal from emp group by sal having maxSal > 2000;
```

`having`是等分组完成后，再对数据进行过滤
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201117095009901.png#pic_center)




`where`实现

```sql
select ename,max(sal) as maxSal from emp where sal>2000 group by sal ;
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201117094948100.png#pic_center)




* `having`,`where`如何选择

  两者区别：

  ​		`having` 它是在`分组后`，对数据再进行过滤。效率低

  ​		`where`它是在`分组前`，先对数据进行过滤

  结论：当能使用`where`完成的，优先使用`where`

#### SETECT 语句执行顺序 

一句完整的DQL语句

```
		 执行顺序 
select      5 
...
from  		1
...
where       2
...
group by    3
...
having      4
...
order by    6
...
```

`order by`排序永远是最后执行的，

先`from`确定需要操作的表，后`where`对一个或多个字段进行筛选，筛选过后分组`group by`,分组后可以在一次过滤`having`不需要的数据 ；`select`查询一个或多个字段的数据，`order by` 对查询出来的结果进行升序或降序



#### 去重

查找员工的岗位

```sql
select job from emp;
```

结果：出现了许多一样的工作岗位

我们想把同样的岗位去除，该怎么做呢？

`sql` 提供了一个`distinct`关键字，用于去除重复记录

```sql
select distinct job from emp;
```

这样就可以去除重复的岗位了

**注意点：**

`distinct`只能放于查询字段的最前面

```sql
select ename,distinct job from emp;//报错
```

正确写法：

```sql
select distinct ename,job from emp;
```

多字段联合去重，ename,job数据组合在一起后，有重复的才去除 。

 有点像javaScipt中两个字符串相加后才会去比较是否相等



#### 嵌套

> select语句中可嵌套select语句

找出每个员工所在部分，要求显示员工名和部门名。  

```sql
select e.ename,d.dname  from emp as e join dept as d on e.deptno = d.deptno;
```

另外写法：

```sql
select e.ename,(select d.dname from dept d where e.deptno = deptno) as dname from emp e;
```

先执行完`select e.ename   from emp e;`，然后在执行`(select d.dname from dept d where e.deptno = deptno) as dname`，嵌套的`select`语句**需要看它所处位置**才能判断它执行的先后顺序，参考**SELECT语句执行顺序**一节



### 多表查询

> `sql`语句很强大，但在实际运用中不可能总是对一张表内的数据进行操作。
>
> 它一般需要两张或两张以上同时进行操作

#### 年代分类

> 在`sql`中对多表查询有两种不同的写法,它们用出现年代分类

找出emp表中所有员工对应的部门(dept)表的所处部门的名字(dname)



SQL92：

 ```sql
select ename,dname from emp , dept where emp.deptno = dept.deptno;
 ```



SQL99（掌握）：

```sql
select ename ,dname from emp join dept on emp.deptno = dept.deptno;
```

上面两种写法都能找出来，推荐使用SQL99,SQL99是1999年出现的新语法

多表查询借助`join ... on ...`



#### 多表连接方式分类（`重点`）

* 内连接 

  * 等值连接

  > 利用`=`判断是否相等来连接

  查询员工对应的部门名称

  ```sql
  select ename,dname from emp inner join dept on emp.deptno = dept.deptno; 
  ```

  其中`inner`可以省略

  ```sql
  select ename , dname from emp join dept on  emp.deptno = dept.deptno;
  ```

  

  * 非等值连接

  > 没有利用`=`进行连接

  查询emp中员工薪水sal在薪水表（salgrade）中处于的薪水等级

  ```sql
  select e.ename, s.grade,e.sal from salgrade as s join emp as e on s.losal<e.sal and e.sal<s.hisal;
  ```

  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20201117095038216.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1NDcyODEz,size_16,color_FFFFFF,t_70#pic_center)


  还有另外一种写法：

  ```sql
  select e.ename, s.grade,e.sal from salgrade as s join emp as e on e.sal between s.losal and s.hisal;
  ```

  `between a and b`表示在a与b之间的

  

  * 自连接

  > 不是多表连接，它是自己与自己连接，属于一张表查询

  查询emp中员工编号(empno)对应的领导编号（mgr）

  ```sql
  select a.ename,b.mgr from emp as a join emp as b on a.empno = b.mgr;
  ```

  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20201117095112717.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1NDcyODEz,size_16,color_FFFFFF,t_70#pic_center)


  可以有人认为可以用`where`实现，不然

  ```sql
  select ename,mgr from emp where mgr = empno;
  ```

  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20201117095126111.png#pic_center)


  一张表查询（`where`）,它是一行一行的判断，例如：第一行的empno与第一行的mgr比较，然后是第二行empno与第二行的mgr比较。

  因为给出的emp中每一行的mgr与empno都不相等，所以查询的结果为空。查询次数为表中数据的行数

  多表查询就不同了，它是用一张表的第一行中的empno或mgr，与另外表的所有行中的mgr或empno比较，然后到第二行再与另外表的所有行比较。查询次数为`行数*行数`

  

* 外连接

  * 右外连接或右连接

  查询员工对应的部门名称

  ```sql
  select emp.ename,dept.dname from emp left outer join dept on emp.deptno = dept.deptno;
  ```

  * 左外连接或左连接

  查询员工对应的部门名称

  ```sql
  select emp.ename,dept.dname from emp right outer join dept on emp.deptno = dept.deptno;
  ```

  其中`outer`可省略

  ```sql
  select emp.ename,dept.dname from emp left  join dept on emp.deptno = dept.deptno;
  ```

  ```sql
  select emp.ename,dept.dname from emp right join dept on emp.deptno = dept.deptno;
  ```

**外连接特点**

​			主表（最左的表）的数据是不会扔失

还有其他连接，暂不记录，外连接，内连接已经足够满足日常开发了



题：

1. 查询出员工的部门名称，员工的领导名称和薪水等级

```sql
select d.dname, b.ename,s.grade from emp e join dept  d on e.deptno = d.deptno join emp b  on e.mgr = b.empno  join salgrade s on e.sal between s.losal and s.hisal;
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201117095142461.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1NDcyODEz,size_16,color_FFFFFF,t_70#pic_center)


思路：首先查询员工的部门名称

```sql
select d.dname  from emp e join dept d on e.deptno = d.deptno;//内连接中的等值连接
```

员工的领导名称

```sql
select b.ename from emp e join emp b on e.deptno = b.mgr;//内连接中的自连接
```

薪水等级

```sql
select s.grade from emp e join salgrade s on e.sal between s.losal and s.hisal;//内连接中的非等值连接
```

每一个查询都使用到了`emp e`，即要将`emp p`放于最左的表，然后在将其他三个表整合到一起



2. 找出薪水比公司平均薪水高的员工，要求显示员工名和薪水

方法一：

```sql
select e.ename,e.sal from emp e where sal > (select avg(sal) as avgSal from emp);
```

方法二：

```sql
select e.ename,e.sal from emp e join (select avg(sal) as avgSal from emp) s on  s.avgSal < e.sal;
```

有人可能有问题，前面不是说分组函数要配合`group by`使用吗？

此处使用了`avg()`取平均值，如果使用了`group by`分组后，同样的薪水才会分成一组，员工的薪水都不同，有几个员工薪水`sal`就会被分成几组，取不到平均值 

**结束语：**
浏览到这了，希望各位小家伙们给我一个赞


