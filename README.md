# startLine-caricature-client

## 简介

> 这是一个基于最火之一的前沿技术-微服务开发的漫画网站，前后端采用阿里云的云服务技术一体化技术，包含了前端 vue+云后端 node（云数据库，云函数，云存储）

## 预览

> 请使用移动端浏览（空间托管|环境 已过期）
> 账号：startline_05@163.com
> 密码：123456

[本项目在线预览](https://static-3ea692f6-5a08-4910-a093-a4a8fab5ac7c.bspapp.com/)

[若想预览管理台请移步至](https://github.com/startLine-05/startline-caricature)

## 准备前序

#### 环境安装

你需要在本地安装 node 和 git。同时你需要阅读以下文档来帮助你快速上手，因为此项目是基于该框架或组件库开发而来。

#### 阅读文档

> 请至少阅读 Uni 文档，用于帮助你快速上手。

1.  [uView 多平台快速开发的 UI 框架](https://www.uviewui.com/)
2.  [uni-app 使用 Vue.js 开发所有前端应用的框架](https://uniapp.dcloud.io/)
3.  [uniCloud 是云端一体化的后端云服务](https://uniapp.dcloud.io/uniCloud/README)
4.  [vk-uniCloud 基于 uniCloud 封装的一体化框架](https://vkdoc.fsq.pub/)

#### 下载 Hbuilderx 编译器

1. [Hbuilderx 下载地址](https://www.dcloud.io/hbuilderx.html)
2. 此项目有 scss, 等预处理, 请先下载对应的插件后运行

### 云服务

1. 请先按照相关文档申请云空间服务。[uniCloud 控制台](https://unicloud.dcloud.net.cn/)
2. 请先将 admin 端 绑定云空间之后，在将此项目关联 admin 云空间（请移至 管理台修改后端配置参数）

#### 配置敏感文本，图片检测，短信验证

请移至 管理台修改后端配置参数

> 登录或注册的验证码 需要配置发送邮件的邮箱

1.  [内容安全检测文档](https://vkdoc.fsq.pub/client/uniCloud/plus/weixin.html#_1-2%E3%80%81%E5%86%85%E5%AE%B9%E5%AE%89%E5%85%A8)

> 登录或注册需要配置发送邮件的邮箱

2. [发送邮箱验证码文档](https://vkdoc.fsq.pub/client/uniCloud/plus/mail.html#_4%E3%80%81%E5%8F%91%E9%80%81%E9%82%AE%E7%AE%B1%E9%AA%8C%E8%AF%81%E7%A0%81)

如有问题请先看上述使用文档和文章，若不能满足，欢迎 issue 和 pr

## 功能

```
- 登录 / 注册

- 用户
  - 编辑信息
  - 稍后再看
  - 我的追漫

- 漫画
  - 漫画首页
  - 查看漫画
  - 阅读漫画

- 评论
```

## 目录

```bash
src
└─common 公共模块
├─components   // 组件
│   ├─card     // 漫画卡片
│   ├─comment  // 评论组件
│   ├─helang-compress    // 图片压缩
├─pages-a   // 一级页面目录
│   ├─index // 首页
│   ├─home  // 我的
│   ├─login // 登录
│   ├─stars // 追漫
│   ├─error // 404
│   └─other-file.cert  // plugin-a依赖的其他文件
└─pagesA    // 二级页面目录
│   ├─cartoonComment  //评论
│   ├─cartoonDetails  //漫画详情
│   ├─cartoonContent  //漫画内容页
│   ├─laterRead       //稍后再看
│   ├─userInfo        //用户信息编辑
└─static                    // 静态资源
└─store                     // vuex
└─uni_modules               // vuex
└─uniCloud-aliyun           // uni-cloud
└─App.vue                   // 入口vue
└─main                      // 入口文件
```

## 开发

> 后端内容在 admin 项目中， 在拉取本项目前请移至 [admin](https://github.com/startLine-05/startline-caricature) 项目

```bash
# 克隆项目
git clone https://github.com/startLine-05/startline-caricature-client.git

# 进入项目目录
cd startline-caricature-client

# 安装依赖
npm install

# 使用uni 编辑器打开项目

# 把 client端 的服务空间直接绑定 client端 项目

# 运行置浏览器
```

## Browsers support

Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Safari |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE10, IE11, Edge                                                                                                                                                                                                 | last 2 versions                                                                                                                                                                                                    | last 2 versions                                                                                                                                                                                                | last 2 versions                                                                                                                                                                                                |

## License

MIT

Copyright (c) 2022-present XianYu
