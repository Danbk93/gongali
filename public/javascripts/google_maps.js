function initMap() {
    var uluru = { lat: -25.363, lng: 131.044 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: uluru
    });

    var marker = new google.maps.Marker({ map: map });

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            marker.setPosition(pos);
            map.setCenter(pos);
            map.Mark
        }, function () {
            handleLocationError(true, marker, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, marker, map.getCenter());
    }

    function handleLocationError(browserHasGeolocation, marker, pos) {
        marker.setPosition(pos);
        marker.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
    }
}