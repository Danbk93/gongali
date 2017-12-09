 function setTimerange(daytype){
        var item = "";
        var time = new Object();
        if(daytype == '평일')
        {
                time.start = timeParsing(sessionStorage.getItem('opentime_weekday'));
                time.end = timeParsing(sessionStorage.getItem('closetime_weekday'));
        }
        else if(daytype == '주말')
        {
                time.start = timeParsing(sessionStorage.getItem('opentime_weekend'));
                time.end = timeParsing(sessionStorage.getItem('closetime_weekend'));
        }
        else
        {
                item += "<option>" + "유형 선택 필요" + "</option>";
                document.getElementById("starttime").innerHTML = item;
                document.getElementById("endtime").innerHTML = item;
                return;
        }
        for (i = time.start; i <= time.end; i++) {
                item += "<option>" + i + "시</option>";
        }       //각각 시설마다의 오픈시간과 클로즈시간 사이만 표시
        document.getElementById("starttime").innerHTML = item;
        document.getElementById("endtime").innerHTML = item;
}

function cancel() {
    if (confirm('취소하시겠습니까?') == true)
        window.close();
}

var reservation= function(){
        var result = new Object();
        result.FID = sessionStorage.getItem('FID');
    
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
                    if(isPossible(res.data))
                    {
                            save_reservation(res.reservation_number, result.FID);       // 그 시간대에 예약이 없으면 예약 쿼리를 요청
                            window.close();
                    }else{
                            alert('예약할 수 없습니다');        //그 시간대에 예약이 있음
                    } 

                } else{
                    alert('실패');
                }
            }
        };
        httpRequest.open('POST', location.origin + '/search/search_more_info', true);
        httpRequest.setRequestHeader("Content-type", "application/json");
        httpRequest.send(JSON.stringify(result));
    }

var save_reservation = function(res_no, fid){
        var result = new Object();
        result.user_id = 'id'; //id 어떻게 가져옴?
        result.reservation_number = 1; //서버로부터 예약 가능한 번호 받아옴
        result.FID = 1; //해당 공공시설의 FID
        result.start_reservation_time = document.getElementById('starttime').value;     //내가 예약하고자 하는 시간
        result.end_reservation_time = document.getElementById('endtime').value;         //내가 예약끝내고자 하는 시간
    
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
                    alert('성공적으로 예약했습니다');
                } else{
                    alert('실패');
                }
            }
        };
        httpRequest.open('POST', location.origin + '/search/search_more_info', true);
        httpRequest.setRequestHeader("Content-type", "application/json");
        httpRequest.send(JSON.stringify(result));
    }

var isPossible = function(res) {
        length = res.length;
        var temp = new Object;
        var myTime = new Object();
        myTime.start = document.getElementById('starttime').value;
        myTime.end = document.getElementById('endtime').value; 
        for(i = 0 ; i < length; i++)
        {
                if( res[i].start_reservation_time < myTime.start && res[i].end_reservation_time > myTime.end) return false;
                if( res[i].start_reservation_time > myTime.start && res[i].end_reservation_time < myTime.end) return false;
        }       //예약이 차있는지 확인, 시간비교 필요
        return true;
}

function timeParsing(time)
{
        var temp = "";
        for(i = 0; i <=1 ; i++) temp[i] = time[i]; //시 부분만 파싱. 분, 초는 버림
        return parseInt(temp, 10);
}
