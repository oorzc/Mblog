var Admin = require('../controller/admin');
var user = require('./checkLogin');

module.exports = function(app) {
    //跳转到注册页面
    app.get('/register',Admin.showRegister);
    //提交注册信息，实现注册校验
    app.post('/register',Admin.doRegister);
    //跳转到登录页面
    app.get('/login',Admin.showLogin);
    //提交登录信息，实现登录信息校验
    app.post('/login',Admin.doLogin);
    //退出页面
    app.get('/out',Admin.showOut);
    // 后台首页
    app.get('/admin',user.isSuper,Admin.admin);

    //给新注册的用户授权
    app.post('/authorize',Admin.authorize);
    //分页获取管理员
    app.post('/admin/get_admin', Admin.get_admin);
    //删除管理员信息
    app.post('/admin/admin_del', Admin.admin_del);

    //分页获取文章
    app.post('/admin/get_articles', Admin.get_articles);
    //查看文章详情
    app.post('/admin/article_detail', Admin.get_articles_detail);
    //删除文章
    app.post('/admin/articles_del', Admin.del_one);

    //分页获取用户
    app.post('/admin/get_users_list', Admin.get_users_list);
    //删除用户
    app.post('/admin/del_user', Admin.del_user);

    //分页获取用户留言
    app.post('/admin/comment_list', Admin.comment_list);
    //查看留言详情
    app.post('/admin/comment_detail', Admin.comment_detail);
    //删除用户留言
    app.post('/admin/del_comment', Admin.del_comment);
};