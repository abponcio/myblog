var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET Hellow World Page. */
router.get('/helloworld', function(req, res) {
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({},{}, function(e,docs) {
  		res.render('helloworld', { title: 'YEHEY', users: docs });
  	});
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

/*  when it submits to add user. */
router.post('/adduser', function(req, res) {
	var db = req.db;
	var userName = req.body.username;
	var userEmail = req.body.useremail;

	var collection = db.get('usercollection');
	
	collection.insert({
		"username" : userName,
		"email" : userEmail
	}, function(err, doc) {
		if(err) {
			res.send("Something's wrong");
		} else {
			res.location("helloworld");
			res.redirect('helloworld');
		}
	});
});


module.exports = router;
