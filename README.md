# pangoo-starter  

基于 umijs + koa + typascrcipt 集成的一套ssr、csr的前端架构，支持服务端渲染和客户端渲染两种方式，只需要一个配置就可以轻松选择页面渲染模式。更多配置，请参考umi官方配置：https://umijs.org/zh/guide/#%E7%89%B9%E6%80%A7

## 使用技术栈:

* typescript 3.x
* koa
* postcss、less
* umijs
* react16.x
* mobx

## Usage

先安装依赖，

```js
$ npm i --verbose
```


### 开发

```sh
$ npm run dev
$ npm run build:server:watch   // 另外开一个命令窗口，开启后端代码的热更新
```

在浏览器打开，

* http://localhost:3001


## 目录介绍

```txt
├── tslint.json                 // ts 代码规范
├── README.md                   // 项目介绍
├── pm2.json                    // pm2 启动配置
├── package.json 
├── .stylelintrc                // css 代码规范
├── .prettierrc                 // 代码格式化配置
├── .prettierignore             // 代码格式化忽略项配置
├── .npmrc                      // npm 配置文件
├── .gitignore                  // git 提交忽略项配置
├── .env                        // 环境配置，暂时没启用
├── bin                         // 脚本目录
|  ├── deploy.sh                // 项目发布上线脚本
├── config                      // 项目相关配置文件夹
|  ├── config.ts                // umi 需要的配置文件出口
|  ├── plugin.config.ts         // umi 插件配置
|  ├── touter.config.ts         // umi 路由规则配置
|  ├── theme.config.ts          // umi 全局主题配置
|  ├── webpack.config.ts        // webpack 配置
|  ├── env                      // 环境配置文件夹
|  |  ├── index.ts              // 环境配置出口文件
|  |  ├── base.ts               // 公共基础配置
|  |  ├── development.ts        // dev 环境配置
|  |  ├── test.ts               // test 环境配置
|  |  └── prod.ts               // 线上环境配置
|── src
|  ├── @types                   // ts 第三方库 .d.ts 声明
|  ├── assets                   // 项目静态资源目录
|  ├── exception                // 项目异常页面目录
|  ├── interfaces               // ts 自定义类型声明
|  ├── layout                   // 项目全局公共页面目录
|  ├── pages                    // 项目页面模块目录
|  ├── server                   // node 服务端代码目录
|  ├── utils                    // 工具库
|  └── global.css               // 全局css控制
└── tsconfig.json               // 全局typescript编译配置
```
