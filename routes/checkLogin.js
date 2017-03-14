exports.checkLogin = function(req, res, next){
	if(req.session.user){
		return next();
	}
	res.redirect('/');
}
exports.isSuper = function(req, res, next){
	if(req.session.user.status=='1'||req.session.user.status=='2'){
		return next();
	}
	res.redirect('/');
}