// Article model
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    username:{ type: String, required: true },
    title: { type: String, required: true },
    tag: {type:Array,default:[]},
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    like: {type: Number,default: 0 }, //点赞
    visit: {type: Number,default: 0},  //浏览量
    comments: {type: Number,default: 0},  //评论量
    create:{type: String}
});


exports.Article = mongoose.model('Article', ArticleSchema);