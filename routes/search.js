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

  var rows =  db.query("SELECT Fname , P.Pname , Paddress FROM PUBLIC_PLACES as P, PUBLIC_FACILITIES as F WHERE P.Pname = F.Pname AND Paddress LIKE \"%" + zone + "%\" AND Paddress LIKE \"%" + district + "%\" AND facility_type = \""+ keyword_input + "\"");
  var body = new Object();
  body.result = true;
  body.data = rows;



  res.send(body);
});

module.exports = router;
