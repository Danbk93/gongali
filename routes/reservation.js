var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    //res.send('reservation page');
    res.render('reservation_details');
});



module.exports = router;