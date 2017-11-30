var express = require('express');
var router = express.Router();

var mysql = require('sync-mysql');
var dbconf = require('../configs/db_conf.js');
var connection = new mysql(dbconf);

router.get('/', function(req, res, next){
    //res.send('search select page');
    res.render('facility_search');
});

router.get('/location', function(req, res, next){
    res.send('search location page');
    //res.render('html file name');
});

router.get('/keyword', function(req, res, next){
    res.send('search keyword page');
    //res.render('html file name');
});



module.exports = router;