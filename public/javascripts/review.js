function save_review(){
    var contents = document.getElementById('textArea').value;
    if(contents.length < 10){
        alert('리뷰를 10자 이상 입력해주세요.');
        return;
    }

    var result = new Object();

    result.FID = sessionStorage.getItem('fac_id');
    result.contents = contents;
    result.grade = parseInt(document.getElementById('grade').value);
    result.res_num = parseInt(sessionStorage.getItem('res_num'));

    var httpRequest;
    if (window.XMLHttpRequest) { // 모질라, 사파리등 그외 브라우저, ...
        httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE 8 이상
        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }
    httpRequest.onreadystatechange = function(){
        if (httpRequest.readyState == 4 && httpRequest.status == 200){
            var res = JSON.parse(httpRequest.responseText);
            if(res.result == true){
                alert("작성되었습니다.");
                location.href= location.origin + '/reservation/list';
            } else{
                alert('작성 실패하였습니다.');
            }
        }
    };
    httpRequest.open('POST', location.origin + '/review/add_review', true);
    httpRequest.setRequestHeader("Content-type", "application/json");
    httpRequest.send(JSON.stringify(result));
}

function cancel(){
    if(confirm('리뷰 작성을 취소하시겠습니까?') == true){
        location.href = location.origin + '/reservation/list';
    } 
}

function checkLength(){
    var contents = document.getElementById('textArea');
    if(contents.value.length > 600){
        alert('리뷰는 최대 600자까지 작성가능합니다.');
        contents.value = contents.value.substring(0, 600);
    }
}