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
              //alert(JSON.stringify(res.data));
              alert(res.data[0].Fname);
              alert(res.data[0].Paddress);
              alert(res.data[0].latitude);
              alert(res.data[0].longitude);
            } else {
              alert('fail');
            }

          }
        };
        httpRequest.open('POST', location.origin + '/search/search_location', true);
        httpRequest.setRequestHeader("Content-type", "application/json");
        httpRequest.send(JSON.stringify(result));
      }

      google_maps();
      /* ********************************************************** */

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

  var infoWindow = new google.maps.InfoWindow;

  // Change this depending on the name of your PHP or XML file
  downloadUrl('../javascripts/testForGoogleMap.xml', function (data) {
    //downloadUrl('https://storage.googleapis.com/mapsdevsite/json/mapmarkers2.xml', function (data) {
    var xml = data.responseXML;
    var markers = xml.documentElement.getElementsByTagName('marker');
    Array.prototype.forEach.call(markers, function (markerElem) {
      var name = markerElem.getAttribute('name');
      var address = markerElem.getAttribute('address');
      var type = markerElem.getAttribute('type');
      var point = new google.maps.LatLng(
        parseFloat(markerElem.getAttribute('lat')),
        parseFloat(markerElem.getAttribute('lng')));

      var infowincontent = document.createElement('div');
      var strong = document.createElement('strong');
      strong.textContent = name
      infowincontent.appendChild(strong);
      infowincontent.appendChild(document.createElement('br'));

      var text = document.createElement('text');
      text.textContent = address
      infowincontent.appendChild(text);
      var marker = new google.maps.Marker({
        map: map,
        position: point,
      });
      marker.addListener('click', function () {
        infoWindow.setContent(infowincontent);
        infoWindow.open(map, marker);
      });
    });
  });
}

function downloadUrl(url, callback) {
  var request = window.ActiveXObject ?
    new ActiveXObject('Microsoft.XMLHTTP') :
    new XMLHttpRequest;

  request.onreadystatechange = function () {
    if (request.readyState == 4) {
      request.onreadystatechange = doNothing;
      callback(request, request.status);
    }
  };

  request.open('GET', url, true);
  request.send(null);
}

function doNothing() { }