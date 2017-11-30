var express = require('express');
var router = express.Router();

var mysql = require('sync-mysql');
var dbconf = require('../configs/db_conf.js');
var connection = new mysql(dbconf);

<<<<<<< HEAD
=======
router.get('/', function(req, res, next){
    //res.send('reservation page');
    res.render('reservation_details');
});
>>>>>>> ace15c62a89ee53b7c83a05d5d38176eb989a9ab



module.exports = router;