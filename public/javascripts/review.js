function save_review(){

    var date = new Date();
    var temp_day = date.getDate();

    var result = new Object();
    result.user_id = document.getElementById('user_id').value;
    result.FID = document.getElementById('FID').value; 
    result.contents = document.getElementById('textArea').value;
    result.grade = document.getElementById('grade').value;
    result.registration_date = document.getElementById('temp_day').value;

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
            } else{
                alert('일치하는 키워드가 없습니다.');
            }
        }
    };
    httpRequest.open('POST', location.origin + '/search/search_keyword', true);
    httpRequest.setRequestHeader("Content-type", "application/json");
    httpRequest.send(JSON.stringify(result));
}