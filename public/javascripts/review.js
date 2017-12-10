function save_review(){

  
    date = new Date(); 
  
    var result = new Object();

    result.FID = sessionStorage.getItem('fac_id');
    result.contents = document.getElementById('textArea').value;
    result.grade = parseInt(document.getElementById('grade').value);
    result.registration_date = date;

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
                alert('작성 실패하였습니다.');
            }
        }
    };
    httpRequest.open('POST', location.origin + '/review/add_review', true);
    httpRequest.setRequestHeader("Content-type", "application/json");
    httpRequest.send(JSON.stringify(result));

    location.href= location.origin + '/reservation/list';
}
