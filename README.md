# 前言：

第一个个人项目

相关工具：
- node v6.10.1
- mongodb3.2.6(64bit)
- Robomongo0.9.0-RC8
- webstrom11.0.1

———————————————————————————————————————
先上效果图吧

**1、网站效果图：**
![网站首页.png](http://imglf2.nosdn.127.net/img/dXN2dkFWak5GQ0pHWUx2M1J1cS9GK3hHODU5MHhLQ28reFFFQ0tBMlFDOTh3bTVVZzFMcXlRPT0.jpg?imageView&thumbnail=1680x0&quality=96&stripmeta=0&type=jpg)

![文章详情页.png](http://imglf2.nosdn.127.net/img/dXN2dkFWak5GQ0pHWUx2M1J1cS9GNUhFdnBYekFsZ2pDT3U1L01xYXZQRnFkaWpSM2FHQVpnPT0.jpg?imageView&thumbnail=1680x0&quality=96&stripmeta=0&type=jpg)

**2、移动端显示：**


![移动端1.png](http://imglf0.nosdn.127.net/img/dXN2dkFWak5GQ0pHWUx2M1J1cS9GK2ZESkx6d2VoOWxqYzBHUDgxZVJ0cUdEeUhoaUg1MjJnPT0.png?imageView&thumbnail=300x0&quality=96&stripmeta=0&type=jpg)


![移动端2.png](http://imglf.nosdn.127.net/img/dXN2dkFWak5GQ0lvV2YvOW5oWjN2SU93RG9xTm0yaHJqa2NsSDF5Z3FZYWNBU1gzZUw2a3BRPT0.png?imageView&thumbnail=300x0&quality=96&stripmeta=0&type=jpg)

**3、后台管理系统：**
![网站后台展示.png](http://imglf1.nosdn.127.net/img/dXN2dkFWak5GQ0pHWUx2M1J1cS9GMTNhU01WWTBnZ3FoQkF2SjhqSWFDNkZ3eld0MkVNRHVBPT0.jpg?imageView&thumbnail=1680x0&quality=96&stripmeta=0&type=jpg)


## 一：网站整体结构（express+mongoose+ejs+layui）：

**1.1、服务端**
- express:一个node.js快速开发web应用的框架。
- mongoose：一个在node.js异步环境下对mongodb进行便捷操作的对象模型工具。
- moment.js:一个极好用的node.js时间模块。
-  express-session：用户登录session管理。
- validator : 进行表单验证处理的模块.
- formidable : 图片上传工具.
- EventProxy.js : 解决nodejs深度嵌套.
- gm : 头像裁剪工具.
- MD5 : 加密工具.

**1.2、网站**
-  使用layui框架制作。[官网地址在这儿](https://www.layui.com/)

**1.3、后台管理系统**
-  使用Layui后台模板，一个很好用的前端框架，相对于bootstrap有各种实现好的功能直接用，如弹窗，时间选择器以及拥有活跃的社区。

## 二：主要功能：

-  多用户注册登录。
-  用户可以发表文章,评论,进行文章点赞,删除自己的文章。
-  用户主页可以设置个人信息,进行头像修改,密码修改等操作。
-  超级管理员可以对对用户授权,授权后可以删除指定文章和评论。
-  超级管理员实现删除用户,指定文章和评论。

## 三、开发流程：

-  3.1、前台静态页面设计。
-  3.2、express项目搭建、数据库设计、路由设计等。
-  3.3、后台设计。


## 四、项目总结：

-  4.1、初次上手收获多多，学会了ajax前后端数据交互
-  4.2、表单验证，用户数据处理
-  4.3、对HTTP请求有了进一步了解
-  4.4、学到了服务器部署，服务端采用的是阿里云linux系统部署
-  4.5、上线使用pm2, 解决nodejs系统错误断线, 快速重启
