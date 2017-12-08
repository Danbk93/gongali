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
                //alert('로그인 성공');
                location.replace(location.origin + '/main');
            } else{
                alert('일치하는 아이디와 패스워드가 없습니다.');
                document.getElementById('passwd').value = '';
                document.getElementById('passwd').focus();
            }
            
        }
    };
    httpRequest.open('POST', location.origin + '/login', true);
    httpRequest.setRequestHeader("Content-type", "application/json");
    httpRequest.send(JSON.stringify(result));
}

var signUp = function(){
    var result = new Object();
    result.id = document.getElementById('id').value;
    result.passwd = document.getElementById('passwd').value;
    result.email = document.getElementById('email').value;
    var p_number = document.getElementById('p_number').value;
    if( p_number.indexOf('-') != -1 ){
        var temp = p_number.split('-');
        p_number = '';
        for(var i = 0 ; i < temp.length ; i++){
            p_number = p_number + temp[i];
        }
    }

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
                alert('가입 성공! 로그인 화면으로 돌아갑니다.');
                location.replace(location.origin);
            } else{
                alert('일시적으로 가입이 중단되었습니다\n다음에 시도해주세요.');
                location.replace(location.origin);
            }
            
        }
    };
    httpRequest.open('POST', location.origin + '/sign_up', true);
    httpRequest.setRequestHeader("Content-type", "application/json");
    httpRequest.send(JSON.stringify(result));
}

var checkPasswd = function(){
    var c_passwd = document.getElementById('confirm_passwd');
    if(c_passwd.value == ''){
        return;
    } else {
        c_passwd.value = '';
        c_passwd.focus();
    }
}

var checkConfirmPassword = function(){
    var passwd = document.getElementById('passwd');
    var c_passwd = document.getElementById('confirm_passwd');
    if(passwd.value != c_passwd.value){
        alert('확인 비밀번호가 일치하지 않습니다.');
        c_passwd.value = '';
        c_passwd.focus();
    }
}

var checkPhoneNumber = function(){
    var regExp_1 = /^\d{3}-\d{3,4}-\d{4}$/;
    var regExp_2 = /^[0-9]+$/;
    var p_number = document.getElementById('p_number').value;

    if (!regExp_1.test( p_number )){
        if(!regExp_2.test( p_number )) {
            alert('잘못된 전화번호입니다. 다시 입력해주세요.');
            document.getElementById('p_number').value = '';
            document.getElementById('p_number').focus();
        }
  }
  
}

var checkId = function(){
    var result = new Object();
    result.id = document.getElementById('id').value;

    var httpRequest;
    if (window.XMLHttpRequest) { // 모질라, 사파리등 그외 브라우저, ...
        httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE 8 이상
        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }
    httpRequest.onreadystatechange = function(){
        if (httpRequest.readyState == 4 && httpRequest.status == 200){
            var res = JSON.parse(httpRequest.responseText);
            if(res.result == 'false'){ // 가입 가능 
                alert('입력하신 아이디가 이미 사용 중입니다.');
                document.getElementById('id').value = '';
                document.getElementById('id').focus();                
            }
        }
    };
    httpRequest.open('POST', location.origin + '/check_id', true);
    httpRequest.setRequestHeader("Content-type", "application/json");
    httpRequest.send(JSON.stringify(result));
}

var goSignUp = function(){
    location.replace(location.origin + '/sign_up');
}

var goStartPage = function(){
    if(confirm('취소하시겠습니까?') == true){
        location.replace(location.origin);
    }
}