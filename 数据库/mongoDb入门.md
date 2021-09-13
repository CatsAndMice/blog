### 数据库操作

创建数据库

```shell
use database
```

查看当前数据库

```shell
db
```

查看所有数据库

```shell
show dbs
```

删除数据库

```shell
use database //切换至需要删除的数据库
db.dropDatabase()
```

查看数据库详情

```shell
db.stats()
```



### 集合操作

集合命名规则:

1. 集合名不能空串
2. 不能含有空字符\0
3. 不能以`system.`开头，这是系统集合保留的前缀 
4. 集合名不能含保留字符"$"

查看所有集合

```shell
show tables
//show collections
```

显式创建集合

```shell
db.createCollection(name,options)//options 可选项，指定内存和索引等
```

隐式创建集合

```shell
db.collection_name.insert({doc})
```

删除集合

```shell
db.collection.drop
```

