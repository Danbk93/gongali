var express = require('express');
var router = express.Router();

var db = require('./db_handler.js');

router.get('/', function(req, res, next){
    if (!req.session.uid) {
        res.send('<script>alert("로그인 세션이 만료되었습니다. 로그인 화면으로 이동합니다."); location.replace(location.origin);</script>');
        return;
    }
    res.render('facility_review');
});

router.post('/add_review', function (req, res) {
    var result = req.body;


   var uid = req.session.uid;
   var fid = result.FID 
   var con = result.contents
   var gra = result.grade 
   var reg_date = result.registration_date

    var rows = db.query("INSERT INTO REVIEW ( user_id, FID, contents, grade, registration_date )VALUES(\"" + uid + " \", " + fid + ", \"" + con + "\", " + gra + ", \"" + reg_date + "\")");

    var body = new Object();
    body.result = true;
    body.data = rows;

    res.json(body);
});



module.exports = router;