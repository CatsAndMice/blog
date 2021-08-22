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



**subject**

简短描述，不超过50个字符



```shel
git commit -m "feat:新增git校验规范功能

采用了git规范

bug链接
"
```



#### 自动化提交验证 

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
        请查看 git commit 提交规范：https://github.com/woai3c/Front-end-articles/blob/master/git%20commit%20style.md
    `)

    process.exit(1)
}
```



1. `"pre-commit": "npm run lint"`，在 `git commit` 前执行 `npm run lint` 检查代码格式。
2. `"commit-msg": "node script/verify-commit.js"`，在 `git commit` 时执行脚本 `verify-commit.js` 验证 commit 消息。如果不符合脚本中定义的格式，将会报错。
3. `"pre-push": "npm test"`，在你执行 `git push` 将代码推送到远程仓库前，执行 `npm test` 进行测试。如果测试失败，将不会执行这次推送。

