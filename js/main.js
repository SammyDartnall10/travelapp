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
    console.log(adventureLevel);
});

$(".temperature").on("click", function() {
    var temperatureLevel = $(this).attr("id");
    destinationSelection.temperature = temperatureLevel;
    console.log(temperatureLevel);
});

$(".price").on("click", function() {
    var price = $(this).attr("id");
    destinationSelection.price = price;
    console.log(price);
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
    codeAddress(initialCities);

    //scroll to map section
    document.querySelector('.map-section').scrollIntoView({
        behavior: 'smooth'
    });

});


/*Geocoder Google API*/
var endLocation;
var city;

//let timerId;

/*function staller (){
    console.log("stalling");
    city = cities[i]['city'];
    
    //geocoding needs to be put into a function - not recommended to put string code into setInterval..
        
        //function timedGeocode() {

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

                    //selection.geolocation global variable - pass the lat and lng to the object on line 19


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
        }*/
// after 5 seconds stop
//setTimeout(() => (timerId, 5000));

function codeAddress(cities) {

    for (var i = 0; i < cities.length; i++) {
        //setTimeout(staller, 800);
        //clearTimeout(staller);
        city = cities[i]['city'];

        //timerId = setInterval(timedGeocode(), 800);

        /*geocoding needs to be put into a function - not recommended to put string code into setInterval..*/

        //function timedGeocode() {

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

                /*selection.geolocation global variable - pass the lat and lng to the object on line 19*/


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
    // after 5 seconds stop
    //setTimeout(() => (timerId, 5000));
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

            console.log(request);

            service = new google.maps.places.PlacesService(map);
            service.getDetails(request, infoCallback);

            function infoCallback(placeResult, infoStatus) {
                if (infoStatus == google.maps.places.PlacesServiceStatus.OK) {
                    console.log("PlaceServiceStatus==OK");
                    console.log(placeResult);
                    console.log(placeResult.website);
                    bookURL = placeResult.website;
                }
                else {
                    console.log("Error loading");
                }
            }

            //infowindow.open(map, marker)

            infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                'Rating: ' + place.rating  +  '<br>' +
                place.vicinity + '<br>' + place.photos + '</div>');
            infowindow.open(map, this);
            console.log(place);

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

            console.log(request);

            service = new google.maps.places.PlacesService(map);
            service.getDetails(request, infoCallback);

            function infoCallback(placeResult, infoStatus) {
                if (infoStatus == google.maps.places.PlacesServiceStatus.OK) {
                    console.log("PlaceServiceStatus==OK");
                    console.log(placeResult);
                    console.log(placeResult.website);
                    bookURL = placeResult.website;
                }
                else {
                    console.log("Error loading");
                }
            }

            infowindow.open(map, marker);
            console.log(place);

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

            console.log(request);

            service = new google.maps.places.PlacesService(map);
            service.getDetails(request, infoCallback);

            function infoCallback(placeResult, infoStatus) {
                if (infoStatus == google.maps.places.PlacesServiceStatus.OK) {
                    console.log("PlaceServiceStatus==OK");
                    console.log(placeResult);
                    console.log(placeResult.website);
                    bookURL = placeResult.website;
                }
                else {
                    console.log("Error loading");
                }
            }

            infowindow.open(map, marker);
            console.log(place);

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
                    console.log("PlaceServiceStatus==OK");
                    console.log(placeResult);
                    console.log(placeResult.website);
                    bookURL = placeResult.website;
                }
                else {
                    console.log("Error loading");
                }
            }

            infowindow.open(map, marker);
            console.log(place);

        });
        markers.push(marker);

    }
});

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
                alert("Sorry, please pick another location, we haven't got the webiste for this place yet!");
                }
                else {
                    document.getElementById("book").href = bookURL;
                }
            });




        //document.getElementById('bars-results').innerHTML = barName.toString();
        //var child = document.createElement('value');
        //child.innerHTML = value;
        //child = child.firstChild;
        //document.getElementById('bar-results').appendChild(child);


        /* 
                
         function httpGetAsync(url, callback) {
                                var xmlHttp = new XMLHttpRequest();
                                xmlHttp.onreadystatechange = function() {
                                    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                                        callback(xmlHttp.responseText);
                                };
                                xmlHttp.open("GET", url, true); // true for asynchronous 
                                xmlHttp.send(null);
                            });
                            
                            
                            
            
            var service;
            var infowindow;

            function initialize() {
                var pyrmont = new google.maps.LatLng(-33.8665433, 151.1956316);

                map = new google.maps.Map(document.getElementById('map'), {
                    center: pyrmont,
                    zoom: 15
                });

                var request = {
                    location: pyrmont,
                    radius: '500',
                    type: ['restaurant', 'bar' ...etc]
                };

                service = new google.maps.places.PlacesService(map);
                service.textSearch(request, callback);
            }

            function callback(results, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {
                        var place = results[i];
                        createMarker(results[i]);
                    }
                }
            }
            
            initialize();

        });*/




        /*Option number two..

            var map;

            function initialize() {
                // Create a map centered in Pyrmont, Sydney (Australia)- cant figure out how to get lat/lng ahead of places search- Geocoding..
                map = new google.maps.Map(document.getElementById('map'), {
                    center: { lat: -33.8666, lng: 151.1958 },
                    zoom: 3
                });

                // Search for string - query from city/case switch above.
                var request = {
                    location: map.getCenter(),
                    radius: '500',
                    query: city,

                };

                console.log(request);

                var service = new google.maps.places.PlacesService(map);
                service.textSearch(request, callback);
            }

            // Checks that the PlacesServiceStatus is OK, and adds a marker
            // using the place ID and location from the PlacesService.
            function callback(results, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    var marker = new google.maps.Marker({
                        map: map,
                        place: {
                            placeId: results[0].place_id,
                            location: results[0].geometry.location
                        }
                    });
                }
            }

            initialize();

        });

        */





        /* Temp maps comment


        // The location of Uluru
        var uluru = { lat: -25.344, lng: 131.036 };


        var location = "latlong";

        function initMap() {
            // The map, centered at Uluru
            var map = new google.maps.Map(
                document.getElementById('map'), { zoom: 4, center: location });
            // The marker, positioned at Uluru
            var marker = new google.maps.Marker({ position: location, map: map });
        }

        end of temop maps comment/*



        /* Ajax get request with help from fellow students on Slack.. keeps failing. 

        $.ajax({
          type: 'GET',
          url: "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=id&key=AIzaSyBY0nEpb-qc6dxAR0UfKi1LnB0NU42uA70",
          crossDoamin: true,
          dataType:'json',
          headers: {
            'Access-Control-Allow-Credentials' : true,
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods':'GET',
            'Access-Control-Allow-Headers':'application/json',
          },
          success: function(data) {
            console.log(data);
          },
          error: function(error) {
            console.log("FAIL....=================");
          }
        });

        */


        /* Using example from course notes - works with SWAPI URL, but not googlemaps one 
        function getData(cb) {
            var xhr = new XMLHttpRequest();

            xhr.open("GET", "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=id&key=AIzaSyBY0nEpb-qc6dxAR0UfKi1LnB0NU42uA70");
            xhr.send();

            xhr.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    cb(JSON.parse(this.responseText));
                }
            };
        }


        function printDataToConsole(data) {
            console.log(data);
        }

        getData(printDataToConsole);

        */

        /* My attempt at ajax request... get a CORB error 

        $.ajax({
            crossOrigin: true,
            url: "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=id&key=AIzaSyBY0nEpb-qc6dxAR0UfKi1LnB0NU42uA70",
            type: "GET",
            dataType: 'jsonp',
            cache: false,
            success: function setData(response) {
                console.log(response);
            },
        });

        */
        /*
        $.getJSON("https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=id&key=AIzaSyBY0nEpb-qc6dxAR0UfKi1LnB0NU42uA70?callback=?", function(json) {
            JSON.parse(this.responseText);
            console.log(this.responseText);

        });
        */


        /*then pass the location to maps to centre on that point. 


        $.ajax({
            crossOrigin: true,
            url: "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=id&key=AIzaSyBY0nEpb-qc6dxAR0UfKi1LnB0NU42uA70",
            type: "GET",
            dataType: 'jsonp',
            cache: false,
            success: function setData(response) {
                console.log(response);
            },
        });


        $.ajax({
            crossOrigin: true,
            url: "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=id&key=AIzaSyBY0nEpb-qc6dxAR0UfKi1LnB0NU42uA70",
            type: "GET",
            dataType: 'jsonp',
            cache: false,
            success: function setData(response) {
                console.log(response);
            },
        });

        var xhr = new XMLHttpRequest();
        var data;

        xhr.open("GET", "https://swapi.co/api/");
        xhr.send();

        function setData(jsonData) {
            data = jsonData;
        }

        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                setData(JSON.parse(this.responseText));
            };
        }

        console.log(data);

        $.getJSON("https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=id&key=AIzaSyBY0nEpb-qc6dxAR0UfKi1LnB0NU42uA70?callback=?",function(json){
          JSON.parse(this.responseText);
          console.log(this.responseText);
          
        });

        */

        /*var lat = selection.geolocation.lat;
        var lng = selection.geolocation.lng;
        var keyword = 'Bar';
        var output = 'json';
        var radius = 2000;
        var key = 'AIzaSyBY0nEpb-qc6dxAR0UfKi1LnB0NU42uA70';
        var type = 'bar';
        var parameters = 'keyword=' + keyword + '&radius=' + radius + '&location=' + lat + ',' + lng + '&key=' + key + '&type=' + type;
        var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/' + output + '?' + parameters;

        console.log(url);

        $.getJSON(url, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            var json = JSON.parse(body);
            var results = json.results;

            for (var i = 0; i < results.length; i++) {
              console.log(results[i].place_id + ' - ' + results[i].name);
            }
          }
        });*/



        /*------------------------------------end of commemting  out ------------------------------------------------------------*/


        /*below: other bits for cb function for selections*/





        /*based on what the variables are set as, set the location as one of the following:
        active  hot high                Sydney
        active  hot medium              Botswana
        active  hot low                 Cuba
        active  mild high               Queenstown
        active  mild medium             Costa Rica
        active  mild low                Lake Titicaca
        active  cold high               Courchevel
        active  cold medium             Wanaka
        active  cold low                Vogel

        recreational  hot high          Monaco
        recreational  hot medium        Greece
        recreational  hot low           Thailand
        recreational  mild high         Venice
        recreational  mild medium       Cape Town
        recreational  mild low          Puerto Rico
        recreational  cold high         Verbier
        recreational  cold medium       Colonge
        recreational  cold low          Budapest

        relaxed  hot high               Barbados
        relaxed  hot medium             Hawaii
        relaxed  hot low                French Polynesia
        relaxed  mild high              Fiji
        relaxed  mild medium            Valencia
        relaxed  mild low               Split    
        relaxed  cold high              Iceland
        relaxed  cold medium            Norway 
        relaxed  cold low               Talin
        */

        /* Assuming you have a JSON file with city name, population, cost of living, and lat/lng  (or avg temp)
        1. User clicks baking
        2. Iterate through JSON and eliminate all items outside a specific temp
        3. user clicks active
        4. Iterate through remaining items and eliminate all items outside specific population range
        5. user clicks going all out
        6. Iterate through remaining and eliminat all items below a certain cost of living
        7. plot all those marker on a map and provide user with 5-10 options
        8. User clicks on a city out of a dropdown/list of buttons or on the marker if you're feeling dangerous
        9. Buttons for bars/hotels/accomodations are displayed
        10. User clicks on select a hotel button and is provided with a list of hotels in radio buttons, they select one and move to the next step
        11. User clicks on select bars/restaurants button and is provided with a list as checkboxes, they select one and move to the next step
        */

        /*
                    INVALID_REQUEST: "INVALID_REQUEST"
                    NOT_FOUND: "NOT_FOUND"
                    OK: "OK"
                    OVER_QUERY_LIMIT: "OVER_QUERY_LIMIT"
                    REQUEST_DENIED: "REQUEST_DENIED"
                    UNKNOWN_ERROR: "UNKNOWN_ERROR"
                    ZERO_RESULTS: "ZERO_RESULTS"
                    */

        //document.getElementById('bars-results').insertAdjacentHTML(get fromURL?)
        /*need to make this call a function instead*/
        /*function here to do some kind of google search?*/


        /* verbose version of error finder
                    
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
                console.log("PlaceServiceStatus==OK");
                console.log(placeResult);
                console.log(placeResult.website);
                bookURL = placeResult.website;
            }
            else if (infoStatus == google.maps.places.PlacesServiceStatus.INVALID_REQUEST) {
                console.log("INVALID_REQUEST");
            }
            else if (infoStatus == google.maps.places.PlacesServiceStatus.NOT_FOUND) {
                console.log("NOT_FOUND");
            }
            else if (infoStatus == google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT) {
                console.log("OVER_QUERY_LIMIT");
            }
            else if (infoStatus == google.maps.places.PlacesServiceStatus.REQUEST_DENIED) {
                console.log("REQUEST_DENIED");
            }
            else if (infoStatus == google.maps.places.PlacesServiceStatus.UNKNOWN_ERROR) {
                console.log("UNKNOWN_ERROR");
            }
            else if (infoStatus == google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
                console.log("ZERO_RESULTS");
            }
            else {
                console.log("Fuck knows");
            }
        }

        infowindow.open(map, marker);
        console.log(place);

        var url = place.id;
        console.log(url);

        /*
        INVALID_REQUEST: "INVALID_REQUEST"
        NOT_FOUND: "NOT_FOUND"
        OK: "OK"
        OVER_QUERY_LIMIT: "OVER_QUERY_LIMIT"
        REQUEST_DENIED: "REQUEST_DENIED"
        UNKNOWN_ERROR: "UNKNOWN_ERROR"
        ZERO_RESULTS: "ZERO_RESULTS"
        */

        //document.getElementById('bars-results').insertAdjacentHTML(get fromURL?)
        /*need to make this call a function instead*/
        /*function here to do some kind of google search?*/
