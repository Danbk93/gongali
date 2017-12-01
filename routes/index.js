var express = require('express');
var router = express.Router();

var db = require('./db_handler.js');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.post('/login', function (req, res, next) {
  var id = req.body.id;
  var passwd = req.body.passwd;
  var rows = db.query("SELECT * FROM user WHERE user_id =\'" + id + "\' AND user_password=password(\'" + passwd + "\')");

  var result = new Object();
  if (rows.length == 1) {
    result.result = 'true';
    // 로그인 세션 만들기
    req.session.uid = id;
    req.session.upasswd = passwd;
  } else {
    result.result = 'false';
  }
  if (req.session.uid) {
    console.log('\n\t[LOGIN] user_id: ' + req.session.uid + '\n');
  }
  res.setHeader('Content-Type', 'application/json');
  res.send(result);
});

router.get('/logout', function (req, res, next) {
  var session = req.session;
  if (session.uid) {
    req.session.destroy(function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('\n\t[LOGUT] user_id: ' + session.uid + '\n');
        res.send('<script>alert("' + session.uid + '님 안녕히가세요."); location.replace(location.origin);</script>');
      }
    });
  } else {
    res.send('<script>alert("잘못된 접근입니다. 메인화면으로 갑니다."); location.replace(location.origin);</script>');
  }
});

router.get('/sign_up', function (req, res, next) {
  res.render('sign_up');
});

module.exports = router;