var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    //res.send('user information page');
    res.render('personal_information');
});



module.exports = router;