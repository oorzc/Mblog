// User model
var mongoose=require('mongoose'),
    Schema = mongoose.Schema;

var  UserSchema=new Schema({
    name:{type:String,default:'虾米'},
    username:{type:String,default:''},
    password:{type:String,default:''},
    sex:{type:String,default:''},
    email:{type:String,default:''},
    qq:{type:Number,default:''},
    motto:{type:String,default:'这个人很懒，什么个性签名都没有留下...'},
    avatar:{type:String},
    city:{type:String,default:''},
    comments: {type: Number,default: 0},  //评论量
    articles: {type: Number,default: 0},  //发帖量
    zan: {type: Number,default: 0}, 
    status:{type: String}, 
    create:{type: String}
});

exports.User = mongoose.model('User', UserSchema);
