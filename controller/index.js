var mongoose = require('mongoose');
var validator = require('validator');//验证模块
var url = require('url');
var eventproxy = require('eventproxy');

var User = require('../models/user').User;
var Article = require('../models/article').Article;
var Comment = require('../models/comment').Comment;

var formidable = require("formidable");//上传头像
var gm = require("gm");//修改头像
var path = require("path");
var fs = require("fs");

var md5 = require('md5');

//首页
exports.showIndex = function (req, res, next) {
    var ep = new eventproxy();
    //所有文章
    Article.find("articles", {}).sort({'_id': -1}).populate('author').exec(function (err, articles) {
        ep.emit('article_data_ok', articles);
    });
    // 热门文章
    Article.find("articles", {}).sort({'visit': -1}).limit(10).exec(function (err, remen) {
        ep.emit('remen_data_ok', remen);
    });
    // 所有用户
    User.find("users", {}).sort({'comments': -1}).limit(9).exec(function (err, users) {
        ep.emit('user_data_ok', users);
    });
    // 近期热议
    Article.find("articles", {}).sort({'comments': -1}).limit(10).exec(function (err, reyi) {
        ep.emit('reyi_data_ok', reyi);
    });
    ep.all('article_data_ok', 'remen_data_ok', 'user_data_ok', 'reyi_data_ok', function (articles, remen, users, reyi) {
        var pageNum = Math.abs(parseInt(req.query.page || 1, 9));
        var pageSize = 9;
        var totalCount = articles.length;
        var pageCount = Math.ceil(totalCount / pageSize);
        if (pageNum > pageCount) {
            pageNum = pageCount;
        }
        res.render('blog/index', {
           
        });
    });
};

//个人主页
exports.showHome = function (req, res) {
    var params = url.parse(req.url, true);
    var id = params.query.id;
    User.findOne({_id: id}, function (err, author) {
        var name = author.username;
        Article.find({username: name})
        .sort({'_id': -1})
        .exec(function (err, articles) {
            var pageNum = Math.abs(parseInt(req.query.page || 1, 8));
            var pageSize = 8;//每页文章数
            var totalCount = articles.length;//文章总数
            var pageCount = Math.ceil(totalCount / pageSize);

            if (pageNum > pageCount) {
                pageNum = pageCount;
            }
            res.render("blog/home", {          
                author: author,
                pageNum: pageNum,
                pageCount: pageCount,
                articles: articles.slice((pageNum - 1) * pageSize, pageNum * pageSize)
            });
        }); 
    }); 
};

//设置页面
exports.showSet = function (req, res) {
    res.render('blog/set');
};

//修改个人信息
exports.showAddSet = function (req, res, next) {
    var username = req.session.username;
    var name = req.body.name;
    var sex = req.body.sex;
    var email = req.body.email;
    var qq = req.body.qq;
    var city = req.body.city;
    var motto = req.body.motto;
    var logMsg = {name: name, sex: sex, email: email, qq: qq, city: city, motto: motto};

    if (!validator.isEmail(email)) {
        //"请输入正确的邮箱地址";
        res.json({"status": "-2"});
        return;
    }
    if (!validator.isLength(city, 2, 6)) {
        //"请填写正确的城市名称";
        res.json({"status": "-5"});
        return;
    }
    if (!validator.matches(qq, /^\d{5,13}$/)) {
        //"请输入正确的QQ号";
        res.json({"status": "-6"});
        return;
    }
    if (!validator.isLength(name, 2, 6)) {
        //"请输入正确的用户名";
        res.json({"status": "-7"});
        return;
    }
    if (!validator.isLength(motto, 2, 20)) {
        //"请输入正确的签名";
        res.json({"status": "-8"});
        return;
    }
    //用户名必须唯一
    User.findOne({name: name}, function (err, user) {
        if (err) {
            res.json({"status": "-3"}); //获取用户数据失败！
            return;
        }
        User.update({username: username}, {$set: logMsg}, function (err, user) {
            if (user) {
                res.json({"status": "1"});
                return;
            } else {
                res.json({"status": "-1"});
                return;
            }
        });
    });
};

//修改密码
exports.showChange = function (req, res, next) {
    var username = req.session.username;
    var nowpass = req.body.nowpass;
    var pass = req.body.pass;
    var repass = req.body.repass;

    //在服务器端再次验证数据格式
    if (!validator.matches(pass, /^[?!a-zA-Z0-9_]{6,16}$/)) {
        res.json({"status": "-5"});//密码6-16位，只能包含字母数字下划线
        return;
    }
    if (pass != repass) {
        res.json({"status": "-2"}); //密码不匹配
        return;
    }
    //用户名必须唯一
    User.findOne({username: username}, function (err, user) {
        if (err) {
            res.json({"status": "-3"}); //获取用户数据失败！
            return;
        }
        var yuan = md5(md5(md5(nowpass))) + md5(md5(md5(nowpass)));
        if (yuan != user.password) {
            res.json({"status": "-4"}); //当前密码错误！
            return;
        } else {
            var newpass = md5(md5(md5(pass))) + md5(md5(md5(pass)));
            User.update({"username": username}, {
                $set: {"password": newpass}
            }, function (err) {
                if (err) {
                    res.json({"status": "-1"});
                    return;
                } else {
                    res.json({"status": "1"});
                    return;
                }
            });
        }
    });
}

//上传头像
exports.showAvatar = function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.uploadDir = path.normalize(__dirname + "/../public/avatar");
    form.parse(req, function (err, fields, files) {
        var oldpath = files.touxiang.path;
        var newpath = path.normalize(__dirname + "/../public/avatar") + "/" + req.session.username + ".jpg";
        fs.rename(oldpath, newpath, function (err) {
            if (err) {
                return next(err);
            }
            //跳转前,存头像
            req.session.avatar = req.session.username + ".jpg";
            //跳转到切的业务
            res.redirect("/cut");
        });
    });
}

//切图页面
exports.showCut = function (req, res) {
    res.render("blog/cut", {
        avatar: req.session.avatar,
    });
}

//裁剪头像
exports.showDocut = function (req, res, next) {
    var username = req.session.username;
    //这个页面接收几个GET请求参数
    //w、h、x、y
    var filename = req.session.avatar;
    var w = req.query.w;
    var h = req.query.h;
    var x = req.query.x;
    var y = req.query.y;
    gm(path.normalize(__dirname + "/../public/avatar/" + filename))
    .crop(w, h, x, y)
    .resize(100, 100, "!")
    .write(path.normalize(__dirname + "/../public/avatar/" + filename), function (err, c) {
            //更改数据库当前用户的avatar这个值
            User.update({username: username}, {$set: {"avatar": req.session.avatar}}, function (err) {
                if (err) {
                    res.json({"status": "-1"});
                    return;
                } else {
                    res.json({"status": "1"});
                    return;
                }
            });
        });
}

//文章详情页
exports.showArticle = function (req, res, next) {
    var params = url.parse(req.url, true);
    var articleId = params.query.id;
    var ep = new eventproxy();

    Article.findOne({"_id": articleId}).populate('author').exec(function (err, article) {
        ep.emit('article_data_ok', article);
    });
    Comment.find({articleId: articleId}).sort({'like': -1}).populate('user').exec(function (err, comments) {
        ep.emit('comments_data_ok', comments)
    });

    ep.all('article_data_ok', 'comments_data_ok', function (article, comments) {
        var pageNum = Math.abs(parseInt(req.query.page || 1, 10));
        var pageSize = 10;

        var totalCount = comments.length;
        var pageCount = Math.ceil(totalCount / pageSize);

        if (pageNum > pageCount) {
            pageNum = pageCount;
        }
        if (article.visit) {
            article.visit++;
        } else {
            article.visit = 1;
        }
        // 访问量 + 1
        article.save(function (err, article) {
            if (err) return console.error(err);
        });
        res.render("blog/article", {
            pageNum: pageNum,
            pageCount: pageCount,
            comments: comments.slice((pageNum - 1) * pageSize, pageNum * pageSize),
            article: article,
        });
    });
};

//添加文章页面
exports.showAdd = function (req, res) {
    res.render('blog/add');
};

//删除文章
exports.showDel = function (req, res, next) {
    var id = req.body.id;
    Article.remove({_id: id}, function (err) {
        if (err) {
            res.json({"status": "-1"});
            return;
        }
        res.redirect("/");
    });
};

//发表文章
exports.showPost = function (req, res, next) {
    var username = req.session.username;
    var title = req.body.title;
    var tag = req.body.tag;
    var content = req.body.content;

    if (!validator.isLength(title, 5, 30)) {
        //"标题长度为2-16";
        res.json({"status": "-2"});
        return;
    }
    if (!validator.isLength(content, 10, 8000)) {
        //"内容长度为10-3000";
        res.json({"status": "-3"});
        return;
    }

    User.findOne({username: username}, function (err, user) {
        var data = new Article({
            title: title,
            tag: tag,
            content: content,
            author: user.id,
            username: username,
            create: new Date(),
            published: true
        })
        if (user.articles) {
            user.articles++;
        } else {
            user.articles = 1;
        }
        // 发帖量 + 1
        user.save(function (err, articles) {
            if (err) return console.error(err);
        });
        data.save(function (err) {
            if (err) {
                res.json({"status": "-1"});
                return;
            } else {
                res.json({"status": "1"});
                return;
            }
        });
    });
};

//发表评论
exports.showAddComment = function (req, res, next) {
    var username = req.session.username;
    var id = req.body.articleId;
    var content = req.body.content;
    if (!validator.isLength(content, 5, 3000)) {
        //"内容长度为5-3000";
        res.json({"status": "-2"});
        return;
    }
    Article.findOne({_id: id}, function (err, article) {
        var pinglun1 = article.comments;
        User.findOne({username: username}, function (err, user) {
            Article.update({_id: id}, {$set: {comments: pinglun1 + 1}}, function (err, doc) {
                if (user.comments) {
                    user.comments++;
                } else {
                    user.comments = 1;
                }
                // 评论 + 1
                user.save(function (err, comments) {
                    if (err) return console.error(err);
                });
                var comment = new Comment({
                    articleId: id,
                    user: user.id,
                    name: user.name,
                    content: content,
                    create: new Date(),
                    like: 0
                });
                comment.save(function (err) {
                    if (err) {
                        res.json({"status": "-1"});
                        return;
                    } else {
                        res.json({"status": "1"});
                        return;
                    }
                });
            });
        });
    });
};

//点赞
exports.showZan = function (req, res) {
    var id = req.body.id;
    Comment.findOne({_id: id}, function (err, comment) {    
        var user = comment.user;
        var like = comment.like;       
        User.findOne({_id: user}, function (err, user) {
          User.update({_id: user.id}, {$set: {zan: user.zan + 1}}, function (err,b) {
              console.log(b)
              Comment.update({_id: id}, {$set: {like: like + 1}}, function (err, c) {
                  console.log(c)
                  if (err) {
                    res.json({"status": "-1"});
                    return;
                } else {            
                    res.json({"status": "1"});
                    return;
                }     
            }); 
          }); 
      });
    }); 
};

//点踩
exports.showCai = function (req, res) {
    var id = req.body.id; 
    Comment.findOne({_id: id}, function (err, comment) { 
        var dislike = comment.dislike;        
        Comment.update({_id:id}, {$set: {dislike: dislike + 1}}, function (err, doc) {
            console.log(doc)
            if (err) {
                res.json({"status": "-1"});
                return;
            } else {
                res.json({"status": "1"});
                return;
            }
        });   
    });        
};
