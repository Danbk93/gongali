
window.onload = function () {
    writeTable(data);
}

function each_review(k){
    
    sessionStorage.setItem('fac_id', data[k].FID);
    sessionStorage.setItem('fac_name', data[k].Fname);
    
    console.log("sdaf");

    location.href= location.origin + '/reservation/write_review';

}

function writeTable(data) {
    var table = "<table class='reservation_list_table'>\n"
    table += "<tr>\n\
                <th>예약<br>번호</th>\n\
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
        table += "<td>" + data[i].reservation_date + "</td>\n"
        table += "<td>" + data[i].start_reservation_time + "시</td>\n"
        table += "<td>" + data[i].end_reservation_time + "시</td>\n"
        table += "<td><img src=\"/images/review.png\" onclick=\"each_review(" + i + ");\"></td>"
        table += "</tr>\n"
    }
    table += "</table>"
    document.getElementById('reservation_list').innerHTML = table;
}

