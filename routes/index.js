var express = require('express');
var router = express.Router();

var mysql = require('sync-mysql');
var dbconf = require('../configs/db_conf.js');
var connection = new mysql(dbconf);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/login', function(req, res, next) {
  var info = req.body;
  var rows = connection.query("SELECT * FROM user WHERE user_id =\'" + info.id + "\' AND user_password=password(\'" + info.passwd + "\')" );

  var result = new Object();
  if(rows.length == 1){
    result.result = 'true';
  } else{
    result.result = 'false';
  }
  res.setHeader('Content-Type', 'application/json');
  console.log(rows.length);
  res.send(result);
});

module.exports = router;
