//登录
layui.use(['layer', 'form'], function() {
var layer = layui.layer,
$ = layui.jquery,
form = layui.form();

//点击添加分类
$('#login').on('click', function() {
var username=$("#username").val();
var password=$("#password").val();
//测试用户是否录入信息
if(username==""||password==""){
	layer.alert('请填入相关信息', {icon: 2});
	return false;
}
$.post("/login",{username:username,password:password},function(result){
	if(result.status==="-2"){
		layer.alert('系统错误', {icon: 2});
	}else if(result.status==="-3") {
		layer.alert('用户不存在', {icon: 2});
	}else if(result.status==="-4"){
		layer.alert('密码错误', {icon: 2});
	}else{
    //jquery实现页面跳转
    location.href ="/"
  }
});return false; //这句话的意思不会刷新当前页面。避免清空内容
});
});

//注册
layui.use(['layer'], function() {
var layer = layui.layer,
$ = layui.jquery;

//点击添加分类
$('#register').on('click', function() {
var username=$("#username").val();
var password=$("#password").val();
var repassword=$("#repassword").val();

//测试用户是否录入信息
if(username==""||password==""||repassword==""){
layer.alert('请将信息填写完整', {icon: 2});
return false;
}

$.post("/register",{
"username" : $("#username").val(),
"password" : $("#password").val(),
"repassword" : $("#repassword").val()
},function(result){
if(result.status==="-1"){
layer.alert('用户格式不正确', {icon: 2});
}else if(result.status==="-2"){
layer.alert('密码格式不正确', {icon: 2});
}else  if(result.status==="-3"){
layer.alert('两次密码不一致', {icon: 2});
}else if(result.status==="-4"){
layer.alert('用户已存在', {icon: 2});
}else if(result.status==="-5"){
layer.alert('系统错误,请刷新', {icon: 2});
}else{
layer.alert('注册成功,请登录', {icon: 1});
}
});
return false;
//这句话的意思不会刷新当前页面。避免清空内容
});
});

//设置
layui.use(['layer'], function () {
var layer = layui.layer,
$ = layui.jquery;

//获取input图片宽高和大小
function getImage(id, callback) {
var _URL = window.URL || window.webkitURL;
$("#" + id).change(function (e) {
	var file, img;
	if ((file = this.files[0])) {
		img = new Image();
		img.onload = function () {
			callback && callback({"width": this.width, "height": this.height, "filesize": file.size});
			console.log(this.width);console.log(this.height);console.log(file.size);
		};
		img.src = _URL.createObjectURL(file);
	}
});
}
getImage('touxiang', function (obj) {           
if ( obj.filesize > 102400 && obj.width >= 300 && obj.height >= 300) {
	layer.alert("请上传图片宽高小于300x300,不大于100k的图片", {icon: 2});
	$('#touxiang').val('');
}
});

$('#photo').on('click', function () {
var filepath = $("#touxiang").val();
var extStart = filepath.lastIndexOf(".");
var ext = filepath.substring(extStart, filepath.length).toUpperCase();
  //测试用户是否录入信息
  if (filepath == "") {
  	layer.alert('请选择你要上传的头像', {icon: 2});
  	return false;
  } else if (ext != ".BMP" && ext != ".PNG" && ext != ".GIF" && ext != ".JPG" && ext != ".JPEG") {
  	layer.alert("图片限于bmp,png,gif,jpeg,jpg格式", {icon: 2});
  	return false;
  }
});


$('#set').on('click', function () {
var name = $("#name").val();
var sex = $("input[type='radio']:checked").val();
var qq = $("#qq").val();
var email = $("#email").val();
var city = $("#city").val();
var motto = $("#motto").val();

  //测试用户是否录入信息
  if (name == "") {
  	layer.alert('请填入你的昵称', {icon: 2});
  	return false;
  }
  $.post("/set", {name: name, sex: sex, qq: qq, email: email, city: city, motto: motto}, function (result) {
  	if (result.status === "-1") {
  		layer.alert('系统错误', {icon: 2});
  	} else if (result.status === "-2") {
  		layer.alert('请输入正确的邮箱地址', {icon: 2});
  	} else if (result.status === "-3") {
  		layer.alert('获取用户数据失败！', {icon: 2});
  	} else if (result.status === "-5") {
  		layer.alert('请填写正确的城市名称', {icon: 2});
  	} else if (result.status === "-6") {
  		layer.alert('请输入正确的QQ号', {icon: 2});
  	} else if (result.status === "-7") {
  		layer.alert('用户名长度为2-6', {icon: 2});
  	} else if (result.status === "-8") {
  		layer.alert('签名名长度为2-16', {icon: 2});
  	} else {
  		layer.alert('修改成功');
          //jquery实现页面跳转
          location.href = "/home"
        }
      });
  //这句话的意思不会刷新当前页面。避免清空内容
  return false;
});


$('#change').on('click', function () {
var nowpass = $("#L_nowpass").val();
var pass = $("#L_pass").val();
var repass = $("#L_repass").val();
  //测试用户是否录入信息
  if (nowpass == "" || pass == "" || repass == "") {
  	layer.alert('请填入完整信息', {icon: 2});
  	return false;
  }
  $.post("/change", {nowpass: nowpass, pass: pass, repass: repass}, function (result) {
  	if (result.status === "-1") {
  		layer.alert('系统错误!', {icon: 2});
  	} else if (result.status === "-2") {
  		layer.alert('两次新密码不匹配!', {icon: 2});
  	} else if (result.status === "-3") {
  		layer.alert('获取用户数据失败!', {icon: 2});
  	} else if (result.status === "-4") {
  		layer.alert('原密码错误！', {icon: 2});
  	} else if (result.status === "-5") {
  		layer.alert('密码6-20位，只能包含字母数字下划线！', {icon: 2});
  	} else {
  		layer.alert('修改成功');
  	}
  });
  //这句话的意思不会刷新当前页面。避免清空内容
  return false;
});

});

layui.cache.page = 'user';
layui.cache.user = {
username: 'username'
, uid: -1
, experience: 83
, sex: '男'
};
layui.config({
version: "1.0.0"
, base: '../res/mods/'
}).extend({
fly: 'index'
}).use('fly');

//文章
layui.use(['layer', 'form', 'layedit'], function () {
var layer = layui.layer,
$ = layui.jquery,
layedit = layui.layedit,
form = layui.form();

var layeditIndex = layedit.build('content', {
height: 200,
tool: ['strong', 'italic', 'underline', 'del', 'link', 'face', 'left', 'center', 'right']
});

//点击添加评论
$('#comment').on('click', function () {
layedit.sync(layeditIndex);
var id = '<%- article.id %>';
  var content = layedit.getContent(layeditIndex);// 获取Html 内容

  if (content == "") {
  	layer.alert('输入评论内容', {icon: 2});
  	return false;
  }

  $.post("/comment", {articleId: id, content: content}, function (result) {
  	if (result.status === "-1") {
  		layer.alert('发布失败', {icon: 2});
  	} else if (result.status === "-2") {
  		layer.alert('留言长度为5-3000', {icon: 2});
  	} else {
          // layer.alert('发布成功');
          //jquery实现页面跳转
          location.href = "/article/?id=<%- article.id %>";
        }
      });
  return false;     //这句话的意思不会刷新当前页面。避免清空内容
});

//删除文章
$('#del').on('click', function () {
var id = '<%- article.id %>';
layer.confirm('确认要删除吗？', {
	icon: 0,
	title: '警告',
	shade: false
}, function () {
	$.post("/del", {id: id}, function (result) {
		if (result.status === "-1") {
			layer.alert('系统错误', {icon: 2});
		} else {
			location.href = "/";
		}
		;
	});
});
});

//点赞
$('.zan').one('click', function () {
var id = this.getAttribute('data-id');          
var obj = $(this);         
$.post("/like", {id: id}, function (result) {
	if (result.status === "-1") {
		layer.alert('系统错误', {icon: 2});
	} else {                   
		var n = obj.text();
		n++;
		obj.html('<i class="iconfont icon-zan" style="color:#C00">' + '</i>'+'<a href="javascript:;" style="color:#C00">'+ n+'</a>');
	}
});
return false;
});

//点踩
$('.cai').one('click', function () {
var id = this.getAttribute('data-id');              
var obj = $(this);
$.post("/dislike", {id: id}, function (result) {
	if (result.status === "-1") {
		layer.alert('系统错误', {icon: 2});
	} else {
		var n = obj.text();
		n++;
		obj.addClass('cai_v').html('<a href="javascript:;" style="color:#C00">'+ n+'</a>');
	}
});
return false;
});
});

//添加文章
layui.use(['layer','layedit','form'], function() {
var layer = layui.layer,
$ = layui.jquery,
layedit = layui.layedit,
form = layui.form();


var layeditIndex = layedit.build('edit',{
height: 200,
tool: ['strong','italic','underline','del','link','face','left','center','right']
});

//点击发布
$('#fabu').on('click', function() {
layedit.sync(layeditIndex);

var title=$("#title").val();
var tag=  $("input[type='radio']:checked").val();
  var content = layedit.getContent(layeditIndex);// 获取Html 内容

  if(title==""){
  	layer.alert('输入文章标题', {icon: 2});
  	return false;
  }
  if(content==""){
  	layer.alert('输入文章内容', {icon: 2});
  	return false;
  }

  $.post("/add",{title:title,tag:tag,content:content},function(result){
  	if(result.status==="-1"){
  		layer.alert('发布失败', {icon: 2});
  	}else if(result.status==="-2"){
  		layer.alert('文章标题长度为5-30', {icon: 2});
  	}else if(result.status==="-3"){
  		layer.alert('文章内容长度为10-8000', {icon: 2});
  	}else{
  		layer.alert('发布成功');
              //jquery实现页面跳转
              location.href ="/"
            }
      });  return false;     //这句话的意思不会刷新当前页面。避免清空内容
});
});