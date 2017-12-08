var express = require('express');
var router = express.Router();

var db = require('./db_handler.js');

router.get('/', function (req, res, next) {
    if (!req.session.uid) {
        res.send('<script>alert("로그인 세션이 만료되었습니다. 로그인 화면으로 이동합니다."); location.replace(location.origin);</script>');
        return;
    }
    var rows = db.query("SELECT user_id, email, phone_number FROM user WHERE user_id =\'" + req.session.uid + "\'");
    res.render('personal_information', {
        "user_info": JSON.stringify(rows[0])
    });
});

router.post('/',function(req,res,next){
    var email = req.body.email;
    var phone_number = req.body.phone_number.split('-');
    phone_number = phone_number[0] + phone_number[1] + phone_number[2];
    
    if (typeof req.session.uid == 'undefined') {
        result.result = 'false';
        result.error = new Object();
        result.error.code = 1;
        result.error.content = '유효하지 않은 접근입니다.';
        res.json(result);
        return;
    }
    db.query("UPDATE user SET email=\'" + email + "\', phone_number=\'" + phone_number + "\' WHERE user_id =\'" + req.session.uid + "\'");
});

router.get('/change_password', function (req, res, next) {
    if (!req.session.uid) {
        res.send('<script>alert("로그인 세션이 만료되었습니다. 로그인 화면으로 이동합니다."); location.replace(location.origin);</script>');
        return;
    }
    res.render('change_passwd');
});

router.post('/change_password', function (req, res, next) {
    var b_passwd = req.body.beforePassword;
    var a_passwd = req.body.afterPassword;
    var result = new Object();

    if (typeof req.session.uid == 'undefined') {
        result.result = 'false';
        result.error = new Object();
        result.error.code = 1;
        result.error.content = '유효하지 않은 접근입니다.';
        res.json(result);
        return;
    }
    var rows = db.query("SELECT * FROM user WHERE user_id =\'" + req.session.uid + "\' AND user_password=password(\'" + b_passwd + "\')");
    if (rows.length == 0) {
        result.result = 'false';
        result.error = new Object();
        result.error.code = 2;
        result.error.content = '이전 비밀번호가 일치하지 않습니다.';
        res.json(result);
        return;
    }

    db.query("UPDATE user SET user_password=password(\'" + a_passwd + "\') WHERE user_id =\'" + req.session.uid + "\' AND user_password=password(\'" + b_passwd + "\')");

    result.result = 'true';
    res.json(result);
});

module.exports = router;