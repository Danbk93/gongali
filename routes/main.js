var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    res.render('main_menu', {"username" : req.session.uid});
});



module.exports = router;