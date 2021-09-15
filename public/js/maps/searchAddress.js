function initMap() {
    let map = new google.maps.Map(document.getElementById("map-canvas"), {
        zoom: 16,
        center: { lat: 40.712784, lng: -74.005941 },
    });

    let marker = new google.maps.Marker({
        position: new google.maps.LatLng(40.712784, -74.005941),
        map: map,
    });
    let geocoder = new google.maps.Geocoder();

    document.getElementById("submit").addEventListener("click", function () {
        geocodeAddress(geocoder, map);
    });
}

function geocodeAddress(geocoder, resultsMap) {
    let address = document.getElementById("address").value;

    geocoder.geocode({ address: address }, function (results, status) {
        document.querySelector("#located-address").value =
            results[0].formatted_address;

        document.querySelector("#located-latitude").value =
            results[0].geometry.location.lat();

        document.querySelector("#located-longitude").value =
            results[0].geometry.location.lng();

        if (status === google.maps.GeocoderStatus.OK) {
            resultsMap.setCenter(results[0].geometry.location);
            let marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location,
            });
        } else {
            let error = document.getElementById("error-msg");
            let errorText =
                "Address lookup was not successful for the following reason: " +
                status;
            error.insertAdjacentHTML("afterBegin", errorText);
        }
    });
}
