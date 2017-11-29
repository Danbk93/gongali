var express = require('express');
var router = express.Router();

var mysql = require('sync-mysql');
var dbconf = require('../configs/db_conf.js');
var connection = new mysql(dbconf);


router.get('/main', function(req, res, next){
    res.render('page6');
});



module.exports = router;