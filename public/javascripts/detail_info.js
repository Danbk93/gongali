window.onload = function() {
    get_info();
};

var get_info = function(){
    var result = new Object();
    result.Fname = sessionStorage.getItem('Fname');
    result.Pname = sessionStorage.getItem('Pname');

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
                print_result(res.data[0]);
            } else{
                alert('실패');
            }
        }
    };
    httpRequest.open('POST', location.origin + '/search/search_more_info', true);
    httpRequest.setRequestHeader("Content-type", "application/json");
    httpRequest.send(JSON.stringify(result));
}

var print_result = function(res){
    console.log(res);
    var districts = "<table class='info_table'>";
    districts += "<tr><td>공공장소명: </td>" + "<td>"+ res.Pname +"</td></tr>";
    districts += "<tr><td>공공시설명: </td>" + "<td>"+ res.Fname +"</td></tr>";
    districts += "<tr><td>시설 유형: </td>" + "<td>"+ res.facility_type +"</td></tr>";  
    districts += "<tr><td>위치: </td>" + "<td>"+ res.Paddress +"</td></tr>";    
    districts += "<tr><td>휴관일: </td>" + "<td>"+ parseInt(res.closed_date, 16).toString(2) +"</td></tr>";
    districts += "<tr><td>평일 운영 시간: </td>" + "<td>"+ res.opentime_weekday +" ~ "+res.closetime_weekday+ "</td></tr>"; 
    districts += "<tr><td>주말 운영 시간: </td>" + "<td>"+ res.opentime_weekend +" ~ "+res.closetime_weekend+ "</td></tr>";
    if(res.charged == 'Y') districts += "<tr><td>시간당 요금: </td>" + "<td>"+ res.base_charge_fee/res.base_usage_time + "</td></tr>"
    if(res.over_usage_time) districts += "<tr><td>시간당 초과요금: </td>" + "<td>"+ res.over_charge_fee + "</td></tr>"
    //if(res.available_number.indexOf("없음") != -1) districts += "<tr><td>수용 가능 인원: </td>" + "<td>"+ res.available_number + "</td></tr>"
    //if(res.other_info.indexOf("없음") != -1) districts += "<tr><td>시간당 초과요금: </td>" + "<td>"+ res.other_info + "</td></tr>"
    districts += "<tr><td>관리 기관명: </td>" + "<td>"+ res.manage_agency + "</td></tr>"
    districts += "<tr><td>관리 부서: </td>" + "<td>"+ res.department + "</td></tr>"
    districts += "<tr><td>전화 번호: </td>" + "<td>"+ res.phone_number + "</td></tr>"
    districts += "<tr><td>홈페이지: </td>" + "<td>"+ res.homepage + "</td></tr>"
    districts += "</table>"; 
    document.getElementById("info_detail").innerHTML = districts;
}