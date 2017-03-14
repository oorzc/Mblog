var Index = require('../controller/index');
var user = require('./checkLogin');

module.exports = function(app) {
    //首页
    app.get('/', Index.showIndex);
    //个人主页
    app.get('/home', Index.showHome);
    //设置页面
    app.get('/set',user.checkLogin, Index.showSet);
    //保存设置
    app.post('/set', Index.showAddSet);
    //修改密码
    app.post('/change', Index.showChange);
    //上传头像
    app.post('/up', Index.showAvatar);
    //切图页面
    app.get('/cut',user.checkLogin, Index.showCut);
    //剪切头像
    app.get('/docut', Index.showDocut);
    //文章详情页
    app.get('/article', Index.showArticle);
    //添加文章
    app.get('/add',user.checkLogin, Index.showAdd);
    //删除文章
    app.post('/del',user.checkLogin, Index.showDel);
    //发表文章
    app.post('/add', Index.showPost);
    //添加评论
    app.post('/comment', Index.showAddComment);
    //点赞
    app.post('/like', Index.showZan);
    //点踩
    app.post('/dislike', Index.showCai);
};