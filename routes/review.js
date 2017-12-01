var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    //res.send('review page');
    res.render('facility_review');
});


module.exports = router;