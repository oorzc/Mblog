var mongoose = require('mongoose');
var User = require('../models/user').User;
var Article = require('../models/article').Article;
var Comment = require('../models/comment').Comment;

var validator = require('validator');
var md5 = require('md5');
var moment = require('moment');

//初始化一个管理员
// var admin = new User({
//     name:'超级管理员',
//     username:'admin',
//     avatar : 'moren.jpg',
//     password:md5(md5(md5('admin')))+md5(md5(md5('admin'))),
//     create : moment(new Date()).format('YYYY-MM-DD HH:mm'),
//     status:'2',
// });
// //存入数据库
// admin.save(function(err,data){
//     console.log(data);
// })

// 首页首页
exports.admin = function (req, res) {
    var isSuper = '普通管理员'
    if (req.session.user.status === '2') {
        isSuper = '超级管理员'
    }
    res.render('admin/index', {isSuper: isSuper});
};


//登陆页面
exports.showLogin = function (req, res) {
    res.render('blog/login');
};
//注册页面
exports.showRegister = function (req, res) {
    res.render('blog/register');
};
//注册业务
exports.doRegister = function (req, res) {
    //得到用户填写的东西
    var username = req.body.username;
    var password = req.body.password;
    var repassword = req.body.repassword;

    // //在服务器端再次验证数据格式
    if (!validator.matches(username, /^[a-zA-Z][a-zA-Z0-9_]{6,16}$/)) {
        res.json({"status": "-1"});   // "用户名为6-16位，以字母开头，只能包含字母数字下划线";
        return;
    }
    if (!validator.matches(password, /^[?!a-zA-Z0-9_]{6,16}$/)) {
        res.json({"status": "-2"});//密码6-16位，只能包含字母数字下划线
        return;
    }
    if (password != repassword) {
        res.json({"status": "-3"}); //密码不匹配
        return;
    }
    //用户名必须唯一
    User.findOne({username: username}, function (err, user) {
        if (user) {
            res.json({"status": "-4"}); //用户已存在！
            return;
        } else {
            var user = new User(
                {
                    username: username,
                    password: md5(md5(md5(password))) + md5(md5(md5(password))),
                    create: moment(new Date()).format('YYYY-MM-DD HH:mm'),
                    avatar: "moren.jpg",
                    status: '0'
                }
            );
            User.create(user, function (err) {
                if (err) {
                    res.json({"status": "-5"}); //系统错误！
                    return;
                }
                res.json({'status': '1'});//注册成功
                return;
            });
        }
    });
};

//登陆页面的执行
exports.doLogin = function (req, res) {
    //得到用户表单
    var username = req.body.username;
    var password = req.body.password;
    var yonghu = md5(md5(md5(password))) + md5(md5(md5(password)));
    //查询数据库，看看有没有个这个人
    User.findOne({"username": username}, function (err, user) {
        if (err) {
            res.json({'status': '-2'});
            return;
        }
        else if (user == null) {
            res.json({'status': '-3'});
            return;
        } else if (user.password != yonghu) {
            res.json({'status': '-4'});
            return;
        } else {
            //登录成功，将user保存到session中
            req.session.user = user;//成功，写入session
            req.session.username = username;
            res.json({'status': '1'});
            return;
        }
    });
};

//退出
exports.showOut = function (req, res) {
    req.session.destroy();
    res.redirect('/')
};

//确定授权
exports.authorize = function (req, res) {
    if (req.session.user.status != '2') {
        //0表示普通用户，1表示已授权普通用户，2表示高级用户
        res.json({"status": "noRight"});
        return;
    } else {
        var id = req.body.id;
        User.findOne({_id: id}, function (err, doc) {
            if (err) {
                res.json({"status": "error"});
                return;
            } else {
                doc.status = '1';
                //修改后必须的保存
                doc.save(function (err) {
                    if (err) {
                        res.json({"status": "error"});
                        return;
                    } else {
                        res.json({"status": "success"});
                        return;
                    }
                })
            }
        });
    }
};

// 分页获取管理员
exports.get_admin = function (req, res) {
    var curr = req.body.curr;
    //每页大小为10
    var query = User.find({});
    query.skip((curr - 1) * 10);
    query.limit(10);
    //按照id添加的顺序倒序排列
    query.sort({'_id': -1});
    //计算分页数据
    query.exec(function (err, rs) {
        if (err) {
            res.send(err);
        } else {
            //计算数据总数
            User.find(function (err, result) {
                if (result.length % 10 > 0) {
                    pages = result.length / 10 + 1;
                } else {
                    pages = result.length / 10;
                }
                jsonArray = {data: rs, pages: pages};
                res.json(jsonArray);
            });
        }
    });
};

//删除一个管理员
exports.admin_del = function (req, res) {
    if (req.session.user.status != '2') {
        //0表示普通用户，1表示已授权普通用户，2表示高级用户
        res.json({"status": "noRight"});
        return;
    }
    var id = req.body.id;
    User.update({_id: id}, {$set: {status: 0}}, function (err, doc) {
        if (err) {
            res.json({"status": "error"});
        } else {
            res.json({"status": "success"})
        }
    });
};

// 分页获取文章
exports.get_articles = function (req, res) {
    var curr = req.body.curr;
    //每页大小为10
    var query = Article.find({}).sort({'_id': -1}).populate('author');
    query.skip((curr - 1) * 10);
    query.limit(10);
    //按照id添加的顺序倒序排列
    query.sort({'_id': -1});
    //计算分页数据
    query.exec(function (err, rs) {
        if (err) {
            res.send(err);
        } else {
            //计算数据总数
            Article.find(function (err, result) {
                if (result.length % 10 > 0) {
                    pages = result.length / 10 + 1;
                } else {
                    pages = result.length / 10;
                }
                rs.forEach(function (doc) {
                    // item 对应每条记录修改时间
                    doc.create = moment(doc.create).format('YYYY-MM-DD HH:mm');
                });
                jsonArray = {data: rs, pages: pages};
                res.json(jsonArray);
            });
        }
    });
};

//获取文章详情
exports.get_articles_detail = function (req, res) {
    var id = req.body.id;
    Article.findOne({_id: id}, function (err, doc) {
        if (err) {
            res.json({"status": "error"});
            return;
        } else {
            res.json({"status": "success", "data": doc.content});
            return;
        }
    });
};

//删除一篇文章
exports.del_one = function (req, res) {
    var id = req.body.id;
    if (req.session.user.status == '0') {
        //0表示普通用户，1表示已授权普通用户，2表示高级用户
        res.json({"status": "noRight"});
        return;
    } else {
        Article.remove({_id: id}, function (err, doc) {
            if (err) {
                res.json({"status": "error"});
                return;
            } else {
                res.json({"status": "success"});
                return;
            }
        });
    }
};

// 分页获取用户
exports.get_users_list = function (req, res) {
    var curr = req.body.curr;
    //每页大小为10
    var query = User.find({});
    query.skip((curr - 1) * 10);
    query.limit(10);
    //按照id添加的顺序倒序排列
    query.sort({'_id': -1});
    //计算分页数据
    query.exec(function (err, rs) {
        if (err) {
            res.send(err);
        } else {
            //计算数据总数
            User.find(function (err, result) {
                if (result.length % 10 > 0) {
                    pages = result.length / 10 + 1;
                } else {
                    pages = result.length / 10;
                }
                rs.forEach(function (doc) {
                    // item 对应每条记录修改时间
                    doc.create = moment(doc.create).format('YYYY-MM-DD HH:mm');
                });
                jsonArray = {data: rs, pages: pages};
                res.json(jsonArray);
                return;
            });
        }
    });
};

//删除用户
exports.del_user = function (req, res) {
    if (req.session.user.status == '0' || req.session.user.status == '1') {
        //0表示普通用户，1表示已授权普通用户，2表示高级用户
        res.json({"status": "noRight"});
        return;
    }
    var id = req.body.id;
    Comment.remove({user: id}, function (err, c) {
        Article.remove({author: id}, function (err, doc) {
            User.remove({_id: id}, function (err, user) {
                if (err) {
                    res.json({"status": "error"});
                    return;
                } else {
                    res.json({"status": "success"});
                    return;
                }
            });
        });
    });
};

// 分页获取用户留言
exports.comment_list = function (req, res) {
    var curr = req.body.curr;
    //每页大小为10
    var query = Comment.find({}).sort({'_id': -1});
    query.skip((curr - 1) * 10);
    query.limit(10);
    //按照id添加的顺序倒序排列
    query.sort({'_id': -1});
    //计算分页数据
    query.exec(function (err, rs) {
        if (err) {
            res.send(err);
        } else {
            //计算数据总数
                Comment.find(function (err, result) {
                if (result.length % 10 > 0) {
                    pages = result.length / 10 + 1;
                } else {
                    pages = result.length / 10;
                }
                rs.forEach(function (doc) {
                    // item 对应每条记录修改时间
                    doc.create = moment(doc.create).format('YYYY-MM-DD HH:mm');
                });
                jsonArray = {data: rs, pages: pages};
                res.json(jsonArray);
                return;

            });
        }
    });
};

//获取留言详情
exports.comment_detail = function (req, res) {
    var id = req.body.id;
    Comment.findOne({_id: id}, function (err, doc) {
        if (err) {
            res.json({"status": "error"});
            return;
        } else {
            res.json({"status": "success", "data": doc.content});
            return;
        }
    });
};

//删除用户留言
exports.del_comment = function (req, res) {
    if (req.session.user.status == '0') {
        //0表示普通用户
        res.json({"status": "noRight"});
        return;
    }
    var id = req.body.id;
    Comment.remove({_id: id}, function (err, c) {
            if (err) {
                res.json({"status": "error"});
                return;
            } else {
                res.json({"status": "success"});
                return;
            }
        });
};
