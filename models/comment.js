// Comment model
var mongoose=require('mongoose'),
    Schema = mongoose.Schema;

var  CommentSchema=new Schema({
    articleId:{ type: Schema.Types.ObjectId, ref: 'Article' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String},
    content: { type: String, required: true},
    create: { type: String },
    like : {type: Number,default: 0},
    dislike : {type: Number,default: 0}
});

exports.Comment = mongoose.model('Comment', CommentSchema);