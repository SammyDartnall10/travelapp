/*Declaring global variables*/

var geocoder;
var map;
var infowindow;
var marker;
var cityInfo = [];

/*setting object template to be used by button selection*/

var destinationSelection = {
    activity: "activity",
    temperature: "temperature",
    price: "price",
};

/*setting object templates for end destination city - lat and lng globally 
available */

var selection = {
    destinationCity: "destinationCity",
    geolocation: ["lat", "lng"],
};

var cityData;

/*Pulling in JSON data*/

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        cityData = JSON.parse(this.responseText);
    }
};

xmlhttp.open("GET", "assets/data/convertcsv.json", true);
xmlhttp.send();

/*Making initial map*/

function initMap() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-41.28664, 174.77557);
    var mapOptions = {
        zoom: 1,
        center: latlng
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

/*when a button is clicked, set the variable as the button value*/

$(".adventure").on("click", function() {
    var adventureLevel = $(this).attr("id");
    destinationSelection.activity = adventureLevel;
});

$(".temperature").on("click", function() {
    var temperatureLevel = $(this).attr("id");
    destinationSelection.temperature = temperatureLevel;
});

$(".price").on("click", function() {
    var price = $(this).attr("id");
    destinationSelection.price = price;
});

/*First step of selection - filter objects by adventure level*/

function getAdventure(obj, key, val) {
    var adventureSelections = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            adventureSelections = adventureSelections.concat(getAdventure(obj[i], key, val));
        }
        else
            //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
            if (i == key && obj[i] == val || i == key && val == '') { //
                adventureSelections.push(obj);
            }
        else if (obj[i] == val && key == '') {
            //only add if the object is not already in the array
            if (adventureSelections.lastIndexOf(obj) == -1) {
                adventureSelections.push(obj);
            }
        }
    }
    return getTemperature(adventureSelections, '', destinationSelection.temperature);
}

/*Second step of selection - filter objects by temperature*/

function getTemperature(obj, key, val) {
    var tempSelections = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            tempSelections = tempSelections.concat(getTemperature(obj[i], key, val));
        }
        else
            //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
            if (i == key && obj[i] == val || i == key && val == '') { //
                tempSelections.push(obj);
            }
        else if (obj[i] == val && key == '') {
            //only add if the object is not already in the array
            if (tempSelections.lastIndexOf(obj) == -1) {
                tempSelections.push(obj);
            }
        }
    }

    return getCost(tempSelections, '', destinationSelection.price);
}

/*Third step of selection - filter objects by price -  to be passed back to #inspire onclick event*/

function getCost(obj, key, val) {
    var costSelections = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            costSelections = costSelections.concat(getCost(obj[i], key, val));
        }
        else
            //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
            if (i == key && obj[i] == val || i == key && val == '') { //
                costSelections.push(obj);
            }
        else if (obj[i] == val && key == '') {
            //only add if the object is not already in the array
            if (costSelections.lastIndexOf(obj) == -1) {
                costSelections.push(obj);
            }
        }
    }
    return costSelections;
}


/*set intialCities based on button selections. Will pass city values to geolocaiton, mark all on map*/


$(".inspire").on("click", function(cb) {

    var initialCities = getAdventure(cityData, '', destinationSelection.activity);
    initialCities = initialCities.slice(0, 10);
    codeAddress(initialCities);

    //scroll to map section
    document.querySelector('.map-section').scrollIntoView({
        behavior: 'smooth'
    });

});


/*Geocoder Google API*/
var endLocation;
var city;

function codeAddress(cities) {

    for (var i = 0; i < cities.length; i++) {

        city = cities[i]['city'];

        /*geocoding API from Google */

        geocoder.geocode({ 'address': city }, function(results, status) {

            if (status == 'OK') {
                var location = {};

                location['lat'] = results[0].geometry.location.lat();
                location['lng'] = results[0].geometry.location.lng();

                map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location

                });
                markers.push(marker);

                marker.addListener('click', function() {
                    map.setZoom(13);
                    map.setCenter(marker.getPosition());
                    document.getElementById("reveal-buttons").style.visibility = "visible";
                    document.getElementById("book").style.visibility = "visible";
                    endLocation = marker.getPosition();
                    var infowindow = new google.maps.InfoWindow({
                        content: '<p>Marker Location:' + marker.getPosition() + '</p>'
                    });

                    google.maps.event.addListener(marker, 'click', function() {
                        infowindow.open(map, marker);
                    });
                });

                location['marker'] = marker;

                /*selection.geolocation global variable - pass the lat and lng to the object declared at beginning of code*/

                selection.geolocation = location;

                var cityInfoObject = {};
                cityInfoObject['cityName'] = city;
                cityInfoObject['locationInfo'] = location;
                cityInfo.push(cityInfoObject);

                return location;
                //console logging to make sure code is running.. 
            }
            else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }
}



/*Places Search based on geocoding and type of search - for this - bars- when button clicked*/
var markers = [];
var bookURL;

$("#bars").on("click", function() {

    deleteMarkers();

    var request = {
        location: endLocation,
        center: { lat: endLocation.lat, lng: endLocation.lng },
        radius: '2000',
        type: ['bar']
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);


    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                place = results[i];
                createMarker(results[i]);
            }
        }
    }

    function createMarker(place) {

        console.log(place);
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });
        var infowindow = new google.maps.InfoWindow({
            content: place.name
        });

        google.maps.event.addListener(marker, 'click', function() {

            //function to pull URL and photos from place id (place.name)
            var request = {
                placeId: place.place_id,
                fields: ['website']
            };

            service = new google.maps.places.PlacesService(map);
            service.getDetails(request, infoCallback);

            function infoCallback(placeResult, infoStatus) {
                if (infoStatus == google.maps.places.PlacesServiceStatus.OK) {
                    bookURL = placeResult.website;
                }
                else {
                    alert("eeek - thats awkward - something went wrong. Please try again!");
                }
            }

            //infowindow.open(map, marker)
            var placePhotoUrl = place.photos[0].getUrl({ maxWidth: 100 });

            infowindow.setContent('<div  ><strong><img src= "' + placePhotoUrl + '" > </div> <div>' + place.name + '</strong><br>' +
                'Rating: ' + place.rating + '<br>' +
                place.vicinity + '</div>');

            infowindow.open(map, this);
        });
        markers.push(marker);
    }

});


/*Places Search based on geocoding and type of search - for this - restaurants- when button clicked*/


$("#restaurants").on("click", function() {

    deleteMarkers();

    var request = {
        location: endLocation,
        center: { lat: endLocation.lat, lng: endLocation.lng },
        radius: '2000',
        type: ['restaurant']
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);


    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                place = results[i];
                createMarker(results[i]);
            }
        }
    }

    function createMarker(place) {

        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });
        var infowindow = new google.maps.InfoWindow({
            content: place.name
        });

        google.maps.event.addListener(marker, 'click', function() {

            //function to pull URL and photos from place id (place.name)
            var request = {
                placeId: place.place_id,
                fields: ['website']
            };

            service = new google.maps.places.PlacesService(map);
            service.getDetails(request, infoCallback);

            function infoCallback(placeResult, infoStatus) {
                if (infoStatus == google.maps.places.PlacesServiceStatus.OK) {
                    bookURL = placeResult.website;
                }
                else {
                    alert("eeek - thats awkward - something went wrong. Please try again!");
                }
            }

            //infowindow.open(map, marker)
            var placePhotoUrl = place.photos[0].getUrl({ maxWidth: 100 });

            infowindow.setContent('<div  ><strong><img src= "' + placePhotoUrl + '" > </div> <div>' + place.name + '</strong><br>' +
                'Rating: ' + place.rating + '<br>' +
                place.vicinity + '</div>');

            infowindow.open(map, this);
        });
        markers.push(marker);

    }
});

/*Places Search based on geocoding and type of search - for this - hotels- when button clicked*/


$("#hotels").on("click", function() {

    deleteMarkers();

    var request = {
        location: endLocation,
        center: { lat: endLocation.lat, lng: endLocation.lng },
        radius: '2000',
        type: ['lodging']
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);


    function callback(results, status) {

        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                place = results[i];
                createMarker(results[i]);
            }
        }
    }

    function createMarker(place) {

        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });
        var infowindow = new google.maps.InfoWindow({
            content: place.name
        });

        google.maps.event.addListener(marker, 'click', function() {

            //function to pull URL and photos from place id (place.name)
            var request = {
                placeId: place.place_id,
                fields: ['website']
            };

            service = new google.maps.places.PlacesService(map);
            service.getDetails(request, infoCallback);

            function infoCallback(placeResult, infoStatus) {
                if (infoStatus == google.maps.places.PlacesServiceStatus.OK) {
                    bookURL = placeResult.website;
                }
                else {
                    alert("eeek - thats awkward - something went wrong. Please try again!");
                }
            }

            //infowindow.open(map, marker)
            var placePhotoUrl = place.photos[0].getUrl({ maxWidth: 100 });
            
            infowindow.setContent('<div  ><strong><img src= "' + placePhotoUrl + '" > </div> <div>' + place.name + '</strong><br>' +
                'Rating: ' + place.rating + '<br>' +
                place.vicinity + '</div>');

            infowindow.open(map, this);
        });
        markers.push(marker);

    }
});


/*Places Search based on geocoding and type of search - for this - interesting things- when button clicked*/


$("#pointOfInterest").on("click", function() {

    deleteMarkers();

    var request = {
        location: endLocation,
        center: { lat: endLocation.lat, lng: endLocation.lng },
        radius: '2000',
        type: ['art_gallery']
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);


    function callback(results, status) {

        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                place = results[i];
                createMarker(results[i]);
            }
        }
    }

    function createMarker(place) {

        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });
        var infowindow = new google.maps.InfoWindow({
            content: place.name
        });

        google.maps.event.addListener(marker, 'click', function() {

            //function to pull URL and photos from place id (place.name)
            var request = {
                placeId: place.place_id,
                fields: ['website']
            };

            console.log(request);

            service = new google.maps.places.PlacesService(map);
            service.getDetails(request, infoCallback);

            function infoCallback(placeResult, infoStatus) {
                if (infoStatus == google.maps.places.PlacesServiceStatus.OK) {
                    bookURL = placeResult.website;
                }
                else {
                    alert("eeek - thats awkward - something went wrong. Please try again!");
                }
            }

            //infowindow.open(map, marker)
            var placePhotoUrl = place.photos[0].getUrl({ maxWidth: 100 });
            console.log(placePhotoUrl);

            infowindow.setContent('<div  ><strong><img src= "' + placePhotoUrl + '" > </div> <div>' + place.name + '</strong><br>' +
                'Rating: ' + place.rating + '<br>' +
                place.vicinity + '</div>');

            infowindow.open(map, this);

        });
        markers.push(marker);

    }
});

/*delete markers from map each time button clicked*/

function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

function clearMarkers() {
    setMapOnAll(null);
}

function deleteMarkers() {
    clearMarkers();
    markers = [];
}

$(".lets-go").on("click", function() {
    document.querySelector('.quiz').scrollIntoView({
        behavior: 'smooth'
    });
});

$("#book").on("click", function() {
    if (bookURL == undefined) {
        alert("Sorry, please pick another location, we haven't got the website for this place yet!");
    }
    else {
        document.getElementById("book").href = bookURL;
    }
});
