### 关于Git提交规范

提交结构:

1. 标题行:#header  必填  描述主要修改类型和内容

2. 主题内容:#body 描述为什么修改，做了什么修改，以及开发思路
3. 页脚注释: #footer 可以写注释，Bug号链接

```html
<type>(<scope>):<subject> #header
//空一行 
<body> #body
//空一行
<footer> #footer
```

**type类别**

* `feat：`新功能
* `fix:`修补bug
* `docs:`文档
* `style:`格式(不影响代码运行变动)
* `refactor:`重构(即不是新增功能,也不是修改bug代码变动)
* `test:`增加测试
* `chore:`构建过程或辅助工具
* `release:`发布新版本
* `ci:`集成相关文件修改
* `build:`影响项目构建或依赖项修改



**subject**

简短描述，不超过50个字符


##### 示例
###### feat
```shel
git commit -m "feat:新增git校验规范功能

采用了git规范

bug链接
"
```
###### fix
如果修复的这个BUG只影响当前修改的文件，可不加范围。如果影响的范围比较大，要加上范围描述。

例如这次 BUG 修复影响到全局，可以加个 global。如果影响的是某个目录或某个功能，可以加上该目录的路径，或者对应的功能名称。
```shell
// 示例1
fix(global): 修复checkbox不能复选的问题
// 示例2 下面圆括号里的 common 为通用管理的名称
fix(common): 修复字体过小的BUG，将通用管理下所有页面的默认字体大小修改为 14px
// 示例3
fix: value.length -> values.length
```




#### 自动化提交验证 
**`husky6.0.0+`钩子函数使用发生变化,与前面版本钩子函数使用不兼容**

以下代码演示,`husky`为`4.3.8`

添加git钩子函数`pre-commit`

```shell
npm i -D husky
```

在`package.js`加上代码

```js
"husky": {
  "hooks": {
    "pre-commit": "npm run lint",
    "commit-msg": "node script/verify-commit.js",
    "pre-push": "npm test"
  }
}
```

新建`script`文件夹，创建`verify-commit.js`文件, 校验`git commit`，不规范报错

```js
const msgPath = process.env.HUSKY_GIT_PARAMS
const msg = require('fs')
.readFileSync(msgPath, 'utf-8')
.trim()

const commitRE = /^(feat|fix|docs|style|refactor|perf|test|workflow|build|ci|chore|release|workflow)(\(.+\))?: .{1,50}/

if (!commitRE.test(msg)) {
    console.log()
    console.error(`
        不合法的 commit 消息格式。
        请查看 git commit 提交规范：https://github.com/lihai-boop/Blog/edit/main/%E8%A7%84%E8%8C%83/git%20commit%E8%A7%84%E8%8C%83.md
    `)

    process.exit(1)
}
```



1. `"pre-commit": "npm run lint"`，在 `git commit` 前执行 `npm run lint` 检查代码格式。
2. `"commit-msg": "node script/verify-commit.js"`，在 `git commit` 时执行脚本 `verify-commit.js` 验证 commit 消息。如果不符合脚本中定义的格式，将会报错。
3. `"pre-push": "npm test"`，在你执行 `git push` 将代码推送到远程仓库前，执行 `npm test` 进行测试。如果测试失败，将不会执行这次推送。
