var login = function(){
    var result = new Object();
    result.id = document.getElementById('id').value;
    result.passwd = document.getElementById('passwd').value;

    var httpRequest;
    if (window.XMLHttpRequest) { // 모질라, 사파리등 그외 브라우저, ...
        httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE 8 이상
        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }
    httpRequest.onreadystatechange = function(){
        if (httpRequest.readyState == 4 && httpRequest.status == 200){
            var res = JSON.parse(httpRequest.responseText);
            if(res.result == 'true'){
                alert('로그인 성공');
                location.replace(location.origin); // main page로 가야만 함
            } else{
                alert('일치하는 아이디와 패스워드가 없습니다.');
            }
            
        }
    };
    httpRequest.open('POST', location.origin + '/login', true);
    httpRequest.setRequestHeader("Content-type", "application/json");
    httpRequest.send(JSON.stringify(result));
}