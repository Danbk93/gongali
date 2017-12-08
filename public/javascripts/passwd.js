function cancel() {
    if (confirm('취소하시겠습니까?') == true)
        window.close();
}

function save() {
    var b_passwd = document.getElementById('b_passwd').value;
    var a_passwd = document.getElementById('a_passwd').value;
    var ca_passwd = document.getElementById('ca_passwd').value;

    if (b_passwd == '') {
        alert("현재 비밀번호를 입력해주세요.");
        return;
    } else if (a_passwd == '') {
        alert('변경하실 비밀번호를 입력해주세요.');
        return;
    } else if (ca_passwd == '') {
        alert('비밀번호 확인을 위해 한 번 더 입력해주세요.');
        return;
    } else if (a_passwd != ca_passwd) {
        alert('비밀번호와 확인비밀번호가 일치하지 않습니다.\n다시 입력해주세요.');
        document.getElementById('ca_passwd').value = '';
        document.getElementById('ca_passwd').focus();
        return;
    }

    var body = new Object();
    body.beforePassword = b_passwd;
    body.afterPassword = a_passwd;

    var httpRequest;
    if (window.XMLHttpRequest) { // 모질라, 사파리등 그외 브라우저, ...
        httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE 8 이상
        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            var json = JSON.parse(httpRequest.responseText);
            if (json.result == 'true') {
                alert('비밀번호 변경 완료!');
                window.close();
            } else if (json.result == 'false') {
                if (json.error.code == 1){
                    alert('유효하지 않은 접근입니다. 로그인 화면으로 돌아갑니다.');
                    opener.location.href = location.origin;
                    window.close();
                }
                else if (json.error.code == 2){
                    alert('비밀번호 변경 실패...\n현재 비밀번호가 일치하지 않습니다. 다시 시도해주세요.');
                }
            }
        } else if (httpRequest.readyState == 4 && httpRequest.status != 200) {
            alert('비밀번호 변경 실패...\n서버가 불안정합니다. 잠시후 시도해주시기 바랍니다.');
            window.close();
        }
    };
    httpRequest.open('POST', location.origin + '/info/change_password', true);
    httpRequest.setRequestHeader("Content-type", "application/json");
    httpRequest.send(JSON.stringify(body));
}