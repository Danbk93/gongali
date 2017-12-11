window.onload = function () {
    writeTable(data);
}

function each_review(k){
    sessionStorage.setItem('fac_id', data[k].FID);
    sessionStorage.setItem('fac_name', data[k].Fname);

    location.href= location.origin + '/reservation/write_review';
}

function writeTable(data) {
    var table = "<table class='reservation_list_table'>\n"
    table += "<tr>\n\
                <th>예약<br>번호</th>\n\
                <th>공공시설명</th>\n\
                <th>대관일</th>\n\
                <th>대관<br>시작</th>\n\
                <th>대관<br>종료</th>\n\
                <th>리뷰<br>작성</th>\n\
              </tr>\n"
    for (var i = 0; i < data.length; i++) {
        var reserv_date = data[i].reservation_date.toString(10);
        reserv_date = reserv_date.substring(0, 4) + '&#45;' + reserv_date.substring(4,6) + '&#45;' + reserv_date.substring(6);

        table += "<tr>\n"
        table += "<td>" + data[i].reservation_number +"</td>\n"
        table += "<td>" + data[i].Fname + "</td>\n"
        table += "<td>" + reserv_date + "</td>\n"
        table += "<td>" + data[i].start_reservation_time + "시</td>\n"
        table += "<td>" + data[i].end_reservation_time + "시</td>\n"
        table += "<td class='review_td'><input type='button' value='작성' onclick=\"each_review(" + i + ");\"></input></td>"
        table += "</tr>\n"
    }
    table += "</table>"
    document.getElementById('reservation_list').innerHTML = table;
}

