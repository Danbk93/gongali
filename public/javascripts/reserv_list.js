window.onload = function () {
    writeTable(data);
}

function each_review(k){
    sessionStorage.setItem('fac_id', data[k].FID);
    sessionStorage.setItem('fac_name', data[k].Fname);
<<<<<<< HEAD
    sessionStorage.setItem('rev_write',data[k].review_written);
    sessionStorage.setItem('res_num',data[k].reservation_number);

    var rev_write = parseInt(sessionStorage.getItem('rev_write'));

    if(rev_write==0){
        location.href= location.origin + '/reservation/write_review';
    }
    else{
        alert("이미 리뷰가 작성되어 있습니다.");
    }

=======

    location.href= location.origin + '/reservation/write_review';
>>>>>>> 041caef15ac733bc5d607d7ead1caac7ef86c80b
}

function writeTable(data) {
    var table = "<table class='reservation_list_table'>\n"
    table += "<tr>\n\
                <th>예약번호</th>\n\
                <th>공공시설명</th>\n\
                <th>대관일</th>\n\
                <th>대관<br>시작</th>\n\
                <th>대관<br>종료</th>\n\
                <th>리뷰<br>작성</th>\n\
              </tr>\n"
    for (var i = 0; i < data.length; i++) {
        table += "<tr>\n"
        table += "<td>" + data[i].reservation_number +"</td>\n"
        table += "<td>" + data[i].Fname + "</td>\n"
        table += "<td>" + data[i].reservation_date + "일</td>\n"
        table += "<td>" + data[i].start_reservation_time + "시</td>\n"
        table += "<td>" + data[i].end_reservation_time + "시</td>\n"
        table += "<td class='review_td'><input type='button' value='작성' onclick=\"each_review(" + i + ");\"></input></td>"
        table += "</tr>\n"
    }
    table += "</table>"
    document.getElementById('reservation_list').innerHTML = table;
}

