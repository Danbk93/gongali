var express = require('express');
var router = express.Router();

var db = require('./db_handler.js');

router.get('/', function(req, res, next){
    if (!req.session.uid) {
        res.send('<script>alert("로그인 세션이 만료되었습니다. 로그인 화면으로 이동합니다."); location.replace(location.origin);</script>');
        return;
    }
    res.render('facility_search');
});

router.get('/location', function(req, res, next){
    if (!req.session.uid) {
        res.send('<script>alert("로그인 세션이 만료되었습니다. 로그인 화면으로 이동합니다."); location.replace(location.origin);</script>');
        return;
    }
    res.render('location_based_search');
});

router.get('/keyword', function(req, res, next){
    if (!req.session.uid) {
        res.send('<script>alert("로그인 세션이 만료되었습니다. 로그인 화면으로 이동합니다."); location.replace(location.origin);</script>');
        return;
    }
    res.render('keyword_search');

});

router.post('/search_keyword', function (req, res) {
  var result = req.body;

  var zone = result.zone
  var district = result.district
  var keyword_input = result.keyword_input

  var rows =  db.query("SELECT Fname , P.Pname , Paddress FROM PUBLIC_PLACES as P, PUBLIC_FACILITIES as F WHERE P.Pname = F.Pname AND Paddress LIKE \"%" + zone + "%\" AND Paddress LIKE \"%" + district + "%\" AND facility_type LIKE \"%"+ keyword_input + "%\"");

  var body = new Object();
  body.result = true;
  body.data = rows;

  res.send(body);
});

router.post('/search_location', function (req, res) {
  var result = req.body;

  var place_latitude = result.latitude;
  var place_longitude = result.longitude;

  var rows =  db.query("SELECT Fname, Paddress, latitude, longitude FROM PUBLIC_PLACES as P, PUBLIC_FACILITIES as F WHERE P.Pname = F.Pname AND ( 6371 * acos( cos( radians(" + place_latitude + ") ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(" + place_longitude + ") ) + sin( radians(" + place_latitude + ") ) * sin( radians( latitude ) ) ) ) < 10")

  var body = new Object();
  body.result = true;
  body.data = rows;

  res.send(body);
});

router.post('/search_more_info', function (req, res) {
  var result = req.body;

  var facility = result.Fname;
  var place = result.Pname;

  var rows =  db.query("SELECT P.Pname, Fname, facility_type, closed_date, opentime_weekday, closetime_weekday, opentime_weekend, closetime_weekend,charged,base_usage_time,base_charge_fee,over_usage_time, over_charge_fee, available_number, other_info, Paddress, manage_agency , department, phone_number, homepage FROM PUBLIC_PLACES as P, PUBLIC_FACILITIES as F WHERE P.Pname = F.Pname AND F.Pname = \"" + place + "\" AND Fname = \"" + facility+"\"")

  var body = new Object();
  body.result = true;
  body.data = rows;

  res.send(body);
});

module.exports = router;
