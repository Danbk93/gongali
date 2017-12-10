var keyword_searching = function(){
    var result = new Object();
    result.zone = document.getElementById('zone').value;
    result.district = document.getElementById('district').value; 
    result.keyword_input = document.getElementById('keyword_input').value;

    if(result.zone.indexOf("선택") != -1){
        alert("시/도 선택을 해주세요");
        return;
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
            if(res.result == true){
                print_result(res.data);
            } else{
                alert('일치하는 키워드가 없습니다.');
            }
        }
    };
    httpRequest.open('POST', location.origin + '/search/search_keyword', true);
    httpRequest.setRequestHeader("Content-type", "application/json");
    httpRequest.send(JSON.stringify(result));
}

var call_detail = function(tab){
    sessionStorage.setItem('Pname',tab.getElementsByClassName('Pname')[0].childNodes[0].nodeValue);
    sessionStorage.setItem('Fname',tab.getElementsByClassName('Fname')[0].childNodes[0].nodeValue);
    location.href = location.origin + '/search/detail_info';
}

var print_result = function(res){
    var districts ='';
    var length = res.length;
    if(!length) districts = "<table class='result_list_table'><tr><th>찾는 결과가 없습니다</th></tr></table>";
    for(i = 0 ; i < length ; i++)
    {
        districts += "<div onclick='call_detail(this);'>";
        districts += "<table class='result_list_table'>" + "<tr><th style=\'width:80px;\'>Type</th><th>내용</th></tr>";
        districts += "<tr><td>공공장소명</td>" + "<td class='Pname'>"+ res[i].Pname +"</td></tr>";
        districts += "<tr><td>공공시설명</td>" + "<td class='Fname'>"+ res[i].Fname +"</td></tr>";
        districts += "<tr><td>위치</td>" + "<td class='Paddress'>"+ res[i].Paddress +"</td></tr>";    
        districts += "</table></div>";
    }
    document.getElementById("KeyResult").innerHTML = districts;
}