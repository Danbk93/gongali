var express = require('express');
var router = express.Router();

var db = require('./db_handler.js');

router.get('/list', function (req, res, next) {
    if (!req.session.uid) {
        res.send('<script>alert("로그인 세션이 만료되었습니다. 로그인 화면으로 이동합니다."); location.replace(location.origin);</script>');
        return;
    }
    var rows = db.query('SELECT reservation_number, Fname, start_reservation_time, end_reservation_time, reservation_date FROM RESERVATION, PUBLIC_FACILITIES WHERE RESERVATION.FID = PUBLIC_FACILITIES.FID AND user_id = \'' + req.session.uid + '\' ORDER BY reservation_date, start_reservation_time asc')
    res.render('reservation_list', {
        "username": req.session.uid,
        "data":JSON.stringify(rows)
    });
});

router.get('/', function (req, res, next) {
    if (!req.session.uid) {
        res.send('<script>alert("로그인 세션이 만료되었습니다. 로그인 화면으로 이동합니다."); opener.location.href = location.origin; window.close();</script>');
        return;
    }
    var page = req.query.page;
    res.render('reservation_' + page);
});

router.post('/available_reservation', function (req, res) {
    var result = req.body;

    var facilityID = result.FID
    var reserve_date = result.date
    //reserve_date = reserve_date.substring(0,4) + "-" + reserve_date.substring(4,6) + "-" + reserve_date.substring(6)
    var rows = db.query("SELECT reservation_number, start_reservation_time, end_reservation_time FROM RESERVATION WHERE FID = " + facilityID + " AND reservation_date = " + reserve_date);

    var body = new Object();
    body.result = true;
    body.data = rows;

    res.json(body);
});

router.post('/add_reservation', function (req, res) {
    var result = req.body;

    var id = req.session.uid;
    var res_num = result.reservation_number;
    var FID = result.FID;
    var res_date = result.reservation_date;
    var res_start = result.start_reservation_time;
    var res_end = result.end_reservation_time;

    var rows = db.query("INSERT INTO RESERVATION VALUES(\"" + id + " \", " + res_num + ", " + FID + ", " + res_start + ", " + res_end + ", " + res_date + ")");

    var body = new Object();
    body.result = true;
    body.data = rows;

    res.json(body.result);
});




router.get('/write_review', function (req, res, next) {
    if (!req.session.uid) {
        res.send('<script>alert("로그인 세션이 만료되었습니다. 로그인 화면으로 이동합니다."); location.replace(location.origin);</script>');
        return;
    }
    res.render('write_review', {
        "username": req.session.uid
    });
});

module.exports = router;