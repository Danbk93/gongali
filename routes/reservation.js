var express = require('express');
var router = express.Router();

router.get('/list', function(req, res, next){
    if (!req.session.uid) {
        res.send('<script>alert("로그인 세션이 만료되었습니다. 로그인 화면으로 이동합니다."); location.replace(location.origin);</script>');
        return;
    }
    res.render('reservation_list', {"username" : req.session.uid});
});

router.get('/', function(req, res, next){
    if (!req.session.uid) {
        res.send('<script>alert("로그인 세션이 만료되었습니다. 로그인 화면으로 이동합니다."); location.replace(location.origin);</script>');
        return;
    }
    var page = req.query.page;
    res.render('reservation_' + page);
});


router.get('/write_review', function(req, res, next){
    if (!req.session.uid) {
        res.send('<script>alert("로그인 세션이 만료되었습니다. 로그인 화면으로 이동합니다."); location.replace(location.origin);</script>');
        return;
    }
    res.render('write_review', {"username" : req.session.uid});
});

module.exports = router;