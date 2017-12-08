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
  var result = req.body;

  var zone = result.zone
  var district = result.district
  var keyword_input = result.keyword_input

  var rows =  db.query("SELECT Fname , P.Pname , Paddress FROM PUBLIC_PLACES as P, PUBLIC_FACILITIES as F WHERE P.Pname = F.Pname AND Paddress LIKE \"%" + zone + "%\" AND Paddress LIKE \"%" + district + "%\" AND facility_type = \"%"+ keyword_input + "%\"");

  var body = new Object();
  body.result = true;
  body.data = rows;

  res.send(body);
});

router.post('/search_location', function (req, res) {
  var result = req.body;

  var place_latitude = result.latitude;
  var place_longitude = result.longitude;

  var rows =  db.query("SELECT Fname, Paddress, latitude, longitude FROM PUBLIC_PLACES as P, PUBLIC_FACILITIES as F WHERE P.Pname = F.Pname AND ( 6371 * acos( cos( radians(" + place_latitude + ") ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(" + place_longitude + ") ) + sin( radians(" + place_latitude + ") ) * sin( radians( latitude ) ) ) ) < 100")

  var body = new Object();
  body.result = true;
  body.data = rows;

  res.send(body);
});

module.exports = router;
