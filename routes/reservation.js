var express = require('express');
var router = express.Router();

var mysql = require('sync-mysql');
var dbconf = require('../configs/db_conf.js');
var connection = new mysql(dbconf);

router.get('/', function(req, res, next){
    //res.send('reservation page');
    res.render('reservation_details');
});



module.exports = router;