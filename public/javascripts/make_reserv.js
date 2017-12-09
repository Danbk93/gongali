var data = JSON.parse(sessionStorage.getItem('data'));

function setTimerange(daytype) {
    var open = "<option>시작시간 선택</option>";
    var close = "<option>종료시간 선택</option>";
    var time = new Object();
    if (daytype == '평일') {
        time.start = timeParsing(data.opentime_weekday);
        time.end = timeParsing(data.closetime_weekday);
    } else if (daytype == '주말') {
        time.start = timeParsing(data.opentime_weekend);
        time.end = timeParsing(data.closetime_weekend);
    } 
    for (i = time.start; i <= time.end; i++) {
        open += "<option>" + i + "</option>";
        close += "<option>" + i + "</option>";
    } //각각 시설마다의 오픈시간과 클로즈시간 사이만 표시
    document.getElementById("starttime").innerHTML = open;
    document.getElementById("endtime").innerHTML = close;
}

function cancel() {
    if (confirm('취소하시겠습니까?') == true)
        window.close();
}

var reservation = function () {
    var result = new Object();
    result.FID = data.FID;      //내가 지정한 공공 장소에
    result.date = sessionStorage.getItem('selectedDate');       //내가 선택한 날짜에

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
                if (isPossible(res.data)) {
                    save_reservation(res.reservation_number, result.FID); // 그 시간대에 예약이 없으면 예약 쿼리를 요청
                } else {
                    alert('예약할 수 없습니다'); //그 시간대에 예약이 있음
                }
            } else {
                alert('실패');
            }
        }
    };
    httpRequest.open('POST', location.origin + '/reservation/available_reservation', true);
    httpRequest.setRequestHeader("Content-type", "application/json");
    httpRequest.send(JSON.stringify(result));
}

var save_reservation = function (res_no, fid) {
    var result = new Object();
    result.user_id = 'test'; //id 어떻게 가져옴?
    result.reservation_number = res_no; //서버로부터 예약 가능한 번호 받아옴
    result.FID = data.FID; //해당 공공시설의 FID
    result.reservation_date = sessionStorage.getItem('selectedDate');
    result.start_reservation_time = sessionStorage.getItem('selectedStartTime'); //내가 예약하고자 하는 시간
    result.end_reservation_time = sessionStorage.getItem('selectedEndTime'); //내가 예약끝내고자 하는 시간

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
                alert('성공적으로 예약했습니다');
                goReservStep4();
            } else {
                alert('실패');
            }
        }
    };
    httpRequest.open('POST', location.origin + '/search/search_more_info', true);
    httpRequest.setRequestHeader("Content-type", "application/json");
    httpRequest.send(JSON.stringify(result));
}

var isPossible = function (res) {
    length = res.length;
    var myTime = new Object();
    myTime.start = sessionStorage.getItem('selectedStartTime');
    myTime.end = sessionStorage.getItem('selectedEndTime');
    for (i = 0; i < length; i++) {
        if (res[i].start_reservation_time < myTime.start && res[i].end_reservation_time > myTime.end) return false;
        if (res[i].start_reservation_time > myTime.start && res[i].end_reservation_time < myTime.end) return false;
    } //예약이 차있는지 확인, 시간비교 필요
    return true;
}

function timeParsing(time) {
    var temp = "";
    for (i = 0; i <= 1; i++) temp += time[i]; //시 부분만 파싱. 분, 초는 버림
    return parseInt(temp, 10);
}

function goReservStep2(){
        var selectedDate = document.getElementById("datepicker").value;
        var selectedDay = selectedDate % 100;
        var selectedMonth = parseInt( selectedDate / 100 ) % 100;
        sessionStorage.setItem('selectedDate', selectedDate);
        var date = new Date();
        var temp_day = date.getDate();
        if((date.getMonth()+1) != selectedMonth) selectedDay += temp_day;//월이 넘어가면
        if(selectedDay- temp_day >= 3)
        {
                alert("최대 3일 이내에만 예약 할 수 있습니다");
                return;
        }
        if(selectedDay- temp_day <= 0)
        {
                alert("다음일부터 예약할 수 있습니다");
                return;
        }
        //날짜 최대 3일 조건
        location.href=location.origin + '/reservation?page=2';
}

function goReservStep3(){
        var select = new Object();
        select.startTime = document.getElementById('starttime').value;
        select.endTime = document.getElementById('endtime').value;
        if(select.endTime - select.startTime > 3)
        {
                alert("최대 3시간 이상 예약할 수 없습니다");
                return;
        }  //최대 3시간 조건
        if(select.endTime < select.startTime)
        {
                alert("종료 시간 선택 오류");
                return;
        }
        sessionStorage.setItem('selectedStartTime', select.startTime);
        sessionStorage.setItem('selectedEndTime', select.endTime);
        location.href=location.origin + '/reservation?page=3';
}

function goReservStep4(){
        location.href=location.origin + '/reservation?page=4';
}