var express = require('express');
var router = express.Router();

var db = require('./db_handler.js');

router.get('/', function(req, res, next){
    //res.send('search select page');
    res.render('facility_search');
});

router.get('/location', function(req, res, next){
    //res.send('search location page');
    res.render('location_based_search');
});

router.get('/keyword', function(req, res, next){
    //res.send('search keyword page');
    res.render('keyword_search');

});

router.post('/search_keyword', function (req, res) {

  var body = new Object();
  body.result =
  var rows =  db.query("SELECT Fname , P.Pname , Paddress FROM PUBLIC_PLACES as P, PUBLIC_FACILITIES as F WHERE P.Pname = F.Pname AND Paddress LIKE "%%" AND Paddress LIKE "%%" AND facility_type = '' ");



  res.send(result);
});

module.exports = router;
