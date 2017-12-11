window.onload = function () {
    get_info();
};

var get_info = function () {
    var result = new Object();
    result.Fname = sessionStorage.getItem('Fname');
    result.Pname = sessionStorage.getItem('Pname');

    var httpRequest;
    if (window.XMLHttpRequest) { // 모질라, 사파리등 그외 브라우저, ...
        httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE 8 이상
        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            var res = JSON.parse(httpRequest.responseText);
            if (res.result == true) {
                print_result(res.data[0]);
                get_review(res.data[0].FID);
            } else {
                alert('실패');
            }
        }
    };
    httpRequest.open('POST', location.origin + '/search/search_more_info', true);
    httpRequest.setRequestHeader("Content-type", "application/json");
    httpRequest.send(JSON.stringify(result));
}

var get_review = function(fid) {
    var result = new Object();
    result.FID = fid;

    var httpRequest;
    if (window.XMLHttpRequest) { // 모질라, 사파리등 그외 브라우저, ...
        httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE 8 이상
        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            var res = JSON.parse(httpRequest.responseText);
            if (res.result == true) {
                print_review(res.data);
            } else {
                alert('리뷰 불러오기 실패');
            }
        }
    };
    httpRequest.open('POST', location.origin + '/review/show_review', true);
    httpRequest.setRequestHeader("Content-type", "application/json");
    httpRequest.send(JSON.stringify(result));
}

var print_result = function (res) {
    sessionStorage.setItem('data', JSON.stringify(res));

    var close_day = print_closedDate(parseInt(res.closed_date, 16).toString(2));
    var districts = "<table class='info_table'>";
    districts += "<tr><td>공공장소명 </td>" + "<td>" + res.Pname + "</td></tr>";
    districts += "<tr><td>공공시설명 </td>" + "<td>" + res.Fname + "</td></tr>";
    districts += "<tr><td>시설 유형 </td>" + "<td>" + res.facility_type + "</td></tr>";
    districts += "<tr><td>위치 </td>" + "<td>" + res.Paddress + "</td></tr>";
    districts += "<tr><td>휴관일 </td>" + "<td>" + close_day + "</td></tr>";
    districts += "<tr><td>평일 운영 시간 </td>" + "<td>" + res.opentime_weekday.substring(0,5) + " ~ " + res.closetime_weekday.substring(0,5) + "</td></tr>";
    districts += "<tr><td>주말 운영 시간 </td>" + "<td>" + res.opentime_weekend.substring(0,5) + " ~ " + res.closetime_weekend.substring(0,5) + "</td></tr>";
    if (res.charged == 'Y'){ districts += "<tr><td>시간당 요금 </td>" + "<td>" + res.base_charge_fee / res.base_usage_time + "원</td></tr>"}
    if (res.over_usage_time){ districts += "<tr><td>시간당 초과요금 </td>" + "<td>" + res.over_charge_fee + "원</td></tr>"}
    if (res.available_number != "정보 없음"){ districts += "<tr><td>수용 가능 인원 </td>" + "<td>" + res.available_number + "</td></tr>"}
    if (res.other_info != "정보 없음"){ districts += "<tr><td>기타 시설 정보 </td>" + "<td>" + res.other_info + "</td></tr>"}
    districts += "<tr><td>관리 기관명 </td>" + "<td>" + res.manage_agency + "</td></tr>"
    districts += "<tr><td>관리 부서 </td>" + "<td>" + res.department + "</td></tr>"
    districts += "<tr><td>전화 번호 </td>" + "<td>" + res.phone_number + "</td></tr>"
    districts += "<tr><td>홈페이지 </td>" + "<td><a href=javascript:goHomepage(`" + res.homepage + "`);>" + res.homepage + "</a></td></tr>"
    districts += "</table>";
    document.getElementById("info_detail").innerHTML = districts;
}

var print_review = function (res) {
    var length = res.length;
    var temp = "";
    var districts = "<table class='info_table'>";
    districts += "<tr><th style='width:85px;'>아이디</th><th>평점</th><th>작성일</th><th>내용<br>보기</th></tr>"
    for(i = 0 ; i < length; i++)
    {
        temp = res[i].registration_date;
        temp = temp.substring(0,10) + ' ' + temp.substring(11,16);
        districts += "<tr><td>" + res[i].user_id + "</td><td>"+ res[i].grade +"</td><td>"+ temp +
         "</td><td class='review_td'><input type='button' value='보기' onclick='show_review(this);'></input></td></tr>";
        districts += "<tr class='collapse'><td colspan='4' class='contents'>" + res[i].contents + 
        "</td></tr>";
    }
    districts += "</table>";
    document.getElementById("review").innerHTML = districts;
}

var show_review = function(cur){
    var node = cur.parentNode.parentNode.nextSibling;
    if(node.getAttribute("class") == "collapse.in") 
    {
        node.setAttribute("class", "collapse");
        return;
    }
    node.setAttribute("class", "collapse.in");
}

var goHomepage = function (homepage_url) {
    if (homepage_url.indexOf('http') != 0) {
        homepage_url = 'http://' + homepage_url;
    }
    window.open(homepage_url, 'homepage', null);
}

var print_closedDate = function (bn) {
    var result = "";
    var day = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var isclose = [0, 0, 0, 0, 0, 0, 0];
    var isNoClose = 1;
    
    for (i = 0; i < 7; i++) {
        if (bn[i] == 1) {
            isclose[i] = 1;
            isNoClose = 0;
        }
    }

    if (isNoClose) {
        result += "없음";
    } else {
        for (j = 0; j <  7; j++) {
            if (isclose[j])
                result += day[j] + " ";
        }
    }
    return result;
}

function make_reservation() {
    window.open('/reservation?page=1', '예약',
        'width=450, height=350, menubar=no, status=no, toolbar=no, location=no, scrollbars=no, resizable=no, fullscreen=no, left=550, top=150'
    );
}