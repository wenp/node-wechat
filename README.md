# index

> 这是我的一个个人项目集合（因为使用的是 express 路由匹配，服务器又是 1 核的 所以不想启动太多 node 程序了，就很多功能写在一个程序里了）

## 项目介绍
```javascript
// 目录介绍
-wechat
    -config         // 主配置
        config.json     // 项目配置文件 主要配置了 wechat 公众号及其相关 API、主机相关、图灵机器人、mysql等
    -dist           // 前端静态资源构建目录
    -e2e            // 前端 angular e2e 配置目录
    -logs           // pm2 生成的 logs 文件目录
    -node_modules   // npm 依赖模块
    -service        // 服务器相关文件存放目录
        -billData       // 账单静态资源存放路径
        -db             // 数据库相关
        -logs           // logs 相关
        -wechat         // wechat 相关
        -WenpengApi     // 自己写的一些 API 接口
    -src            // 前端 angular 项目目录
    .angular-cli.json// angular-cli 配置文件
    .editorconfig   // 编码规范配置文件
    .gitignore      // git 提交忽略文件
    karma.conf.js   // karma 测试配置文件
    package.json    // 服务器 npm 包
        // 由于 angular 项目依赖太多 在服务器上完全没必要存在 并且还会引起其他的 BUG 所以单独分开
    package2.json   // 前端 npm 包
    protractor.conf.js  // angular-cli 开发环境配置文件
    README.md       // README 文档
    service.js      // node 主 服务器入口
    tsconfig.json   //typescript 配置文件
    tslint.json     // tslint 配置文件
    wenpeng.json    // pm2 配置文件
```

## 启动项目
1. INSTALL package

   ```shell
   npm i
   ```

   **备注：**

2. 启动服务器

    ```shell
    pm2 start wenpeng.json
    #或者 node service.js
    ```

    ​