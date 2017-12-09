function initMap() {
  var init_pos = { lat: 37.250943, lng: 127.028344 };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: init_pos
  });

  var my_position_marker = new google.maps.Marker({
    map: map,
    animation: google.maps.Animation.BOUNCE,
    icon: "../images/blue_MarkerM.png"
  });

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      my_position_marker.setPosition(pos);
      map.setCenter(pos);

      /* 현재위치정보를 서버로 보내서 주변에 위치한 공공시설 정보를 받아오고 지도에 표시 */
      var google_maps = function () {
        var result = new Object();
        result.latitude = pos.lat;
        result.longitude = pos.lng;

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
              var infoWindow = new google.maps.InfoWindow();
              for (var i = 0; i < res.data.length; i++) {

                var name = res.data[i].Fname;
                var address = res.data[i].Paddress;
                var point = {
                  lat: res.data[i].latitude,
                  lng: res.data[i].longitude
                }
                
                var marker = new google.maps.Marker({
                  map: map,
                  position: point,
                });
                
                var infowincontent = document.createElement('div');
                var strong = document.createElement('strong');
                strong.textContent = name
                infowincontent.appendChild(strong);
                infowincontent.appendChild(document.createElement('br'));
                var text = document.createElement('text');
                text.textContent = address
                infowincontent.appendChild(text);

                google.maps.event.addListener(marker, 'click', (function (marker, infowincontent) {
                  return function () {
                    infoWindow.setContent(infowincontent);
                    infoWindow.open(map, marker);
                  }
                })(marker, infowincontent));
                
              }
            } else {
              alert('error');
            }

          }
        };
        httpRequest.open('POST', location.origin + '/search/search_location', true);
        httpRequest.setRequestHeader("Content-type", "application/json");
        httpRequest.send(JSON.stringify(result));
      }

      google_maps();
      /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    }, function () {
      handleLocationError(true, my_position_marker, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, my_position_marker, map.getCenter());
  }

  function handleLocationError(browserHasGeolocation, my_position_marker, pos) {
    my_position_marker.setPosition(pos);
    my_position_marker.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
  }
}