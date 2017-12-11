
window.onload = function () {
    writeTable(data);
}

function each_review(k){
    
    sessionStorage.setItem('fac_id', data[k].FID);
    sessionStorage.setItem('fac_name', data[k].Fname);
    sessionStorage.setItem('rev_write',data[k].review_written);
    sessionStorage.setItem('res_num',data[k].reservation_number);

    var rev_write = parseInt(sessionStorage.getItem('rev_write'));

    if(rev_write==0){
        location.href= location.origin + '/reservation/write_review';
    }
    else{
        alert("이미 리뷰가 작성되어 있습니다.");
    }

}

function writeTable(data) {
    var table = "<table class='reservation_list_table'>\n"
    table += "<tr>\n\
                <th>예약번호</th>\n\
                <th>공공시설명</th>\n\
                <th>대관일</th>\n\
                <th>대관시작</th>\n\
                <th>대관종료</th>\n\
                <th>리뷰</th>\n\
              </tr>\n"
    for (var i = 0; i < data.length; i++) {
        table += "<tr>\n"
        table += "<td>" + data[i].reservation_number +"</td>\n"
        table += "<td>" + data[i].Fname + "</td>\n"
        table += "<td>" + data[i].reservation_date + "일</td>\n"
        table += "<td>" + data[i].start_reservation_time + "시</td>\n"
        table += "<td>" + data[i].end_reservation_time + "시</td>\n"
        table += "<td><img src=\"/images/review.png\" onclick=\"each_review(" + i + ");\"></td>"
        table += "</tr>\n"
    }
    table += "</table>"
    document.getElementById('reservation_list').innerHTML = table;
}

