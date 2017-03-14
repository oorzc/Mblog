
var mongoose=require('mongoose');
var config=require('./db_url.js');

module.exports=function(){
    mongoose.Promise = global.Promise;
    var db=mongoose.connect(config.mongodb);
    require('../models/user.js');
    require('../models/article.js');
    require('../models/comment.js');
    return db;
}