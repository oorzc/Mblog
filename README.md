##前言：

这是我的第一个项目作品,在学习了html,css,javascript制作一些简单的页面之后,不想满足于单纯的页面制作,开始探索整站开发之旅;

初次使用nodejs开发个人网站,由于没有后端开发经验,从一开始整个人都是懵逼的,

在制作完我需要的页面之后,开始安装项目所需要的工具,怎么运行node,怎么配路由,怎么完成登录注册,怎么去保存数据,前后端结合是怎样进行的,全是一个个坑......每一个坑都耗费了自己大量时间,然而付出总会有收获,虽然作品还不太完美,也算是为自己以后的工作打下一个基础吧


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


![移动端1.png](http://imglf0.nosdn.127.net/img/dXN2dkFWak5GQ0pHWUx2M1J1cS9GK2ZESkx6d2VoOWxqYzBHUDgxZVJ0cUdEeUhoaUg1MjJnPT0.png?imageView&thumbnail=1680x0&quality=96&stripmeta=0&type=jpg =300x500)


![移动端2.png](http://imglf.nosdn.127.net/img/dXN2dkFWak5GQ0pHWUx2M1J1cS9GNUJQaEFxUVBMendSOFhobG15MHNKbkNTc29zSHVCZEF3PT0.png?imageView&thumbnail=1680x0&quality=96&stripmeta=0&type=jpg =300x500)

**3、后台管理系统：**
![网站后台展示.png](http://imglf1.nosdn.127.net/img/dXN2dkFWak5GQ0pHWUx2M1J1cS9GMTNhU01WWTBnZ3FoQkF2SjhqSWFDNkZ3eld0MkVNRHVBPT0.jpg?imageView&thumbnail=1680x0&quality=96&stripmeta=0&type=jpg)


##一：网站整体结构（express+mongoose+ejs+layui）：

**1.1、服务端**
- express:一个node.js快速开发web应用的框架。
- mongoose：一个在node.js异步环境下对mongodb进行便捷操作的对象模型工具。
- moment.js:一个极好用的node.js时间模块。
-  express-session：用户登录登录session管理。
- validator : 进行表单验证处理的模块.
- formidable : 图片上传工具.
- EventProxy.js : 解决nodejs深度嵌套.
- gm : 头像裁剪工具.
- MD5 : 加密工具.

**1.2、网站**
-  参照layui官网网站制作。[官网地址在这儿](http://fly.layui.com/)

**1.3、后台管理系统**
-  使用Layui后台模板，一个很好用的前端框架，相对于bootstrap有各种实现好的功能直接用，如弹窗，时间选择器以及拥有活跃的社区。

##二：主要功能：
-  多用户注册登录。
-  用户可以发表文章,评论,进行文章点赞,删除自己的文章。
-  用户主页可以设置个人信息,进行头像修改,密码修改等操作。
-  后台管理用户对用户授权,授权后可以删除指定文章和评论。
-  超级管理员实现删除用户,指定文章和评论。

##三、开发流程：
-  3.1、前台静态页面设计。
-  3.2、express项目搭建、数据库设计、路由设计等。
-  3.3、后台设计。


##四、网站相关说明：
-  4.1、网站使用的是ejs模板引擎, 我在后端使用的是数据渲染到前端模板上, 这样做虽然方便, 但却没有完成前后端分离, ,造成代码不易维护 ,在以后的工作中应多考虑使用 json 来处理前后端数据, 使前后端更好的分离
-  4.2、网站优化做得不够完善, 对nodejs不够深入了解, 有可能造成访问出错
-  4.3、网站功能做得不够完善, 图片上传未完成, 影响用户体验
-  4.4、服务端采用的是阿里云windows系统部署, 作者比较low,目前只会这个, 以后准备学一些计算机操作系统原理, 再来使用其他系统部署吧
-  4.5、上线当然是使用pm2, 解决nodejs断线, 快速重启
