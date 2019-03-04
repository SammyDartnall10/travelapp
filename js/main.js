/*Using buttons as i will replace with words/images in the 
squares in final design. Form didnt offer flexibilty I wanted to 
make html element clickable bits... unless I didnt know how to achieve this*/


/*setting object templates to be used by button selection*/

var destinationSelection = {
    activity: "activity",
    temperature: "temperature",
    price: "price",
};

/*setting object templates for end destination city*/

var selection = {
    destinationCity: "destinationCity",
    geolocation: ["lat", "lng"],
};

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


/*set destinationSelection as a combo of the button selections*/

$(".inspire").on("click", function(cb) {
    var destinationString = destinationSelection.activity + destinationSelection.temperature + destinationSelection.price;

    var city = destinationString;

    switch (destinationString) {
        case 'activehothigh':
            city = "Sydney";
            break;

        case "activehotmedium":
            city = "Botswana";
            break;

        case "activehotlow":
            city = "Cuba";
            break;

        case "activemildhigh":
            city = "Queenstown";
            break;

        case 'activemildmedium':
            city = "Costa Rica";
            break;

        case "activemildlow":
            city = "Lake Titicaca";
            break;

        case "activecoldhigh ":
            city = "Courchevel";
            break;

        case "activecoldmedium":
            city = "Wanaka";
            break;

        case "activecoldlow ":
            city = "Vogel";
            break;

        case 'recreationalhothigh':
            city = "Monaco";
            break;

        case "recreationalhotmedium":
            city = "Greece";
            break;

        case "recreationalhotlow":
            city = "Thailand";
            break;

        case "recreationalmildhigh":
            city = "Venice";
            break;

        case 'recreationalmildmedium':
            city = "Cape Town";
            break;

        case "recreationalmildlow":
            city = "Puerto Rico";
            break;

        case "recreationalcoldhigh ":
            city = "Verbier";
            break;

        case "recreationalcoldmedium":
            city = "Colonge";
            break;

        case "recreationalcoldlow ":
            city = "Budapest";
            break;

        case 'relaxedhothigh':
            city = "Barbados";
            break;

        case "relaxedhotmedium":
            city = "Hawaii";
            break;

        case "relaxedhotlow":
            city = "French Polynesia";
            break;

        case "relaxedmildhigh":
            city = "Fiji";
            break;

        case 'relaxedmildmedium':
            city = "Valencia";
            break;

        case "relaxedmildlow":
            city = "Split";
            break;

        case "relaxedcoldhigh ":
            city = "Iceland";
            break;

        case "relaxedcoldmedium":
            city = "Norway";
            break;

        case "relaxedcoldlow ":
            city = "Talin";
            break;

        default:
            console.log("Please answer all three questions");
    }

    selection.destinationCity = city;
    cb = city;
    codeAddress(city);

});

/*Geocoder... centres map using city selected*/

function codeAddress(city) {
    var address = city;
    geocoder.geocode({ 'address': address }, function(results, status) {

        if (status == 'OK') {
            var location = {};

            location['lat'] = results[0].geometry.location.lat();
            location['lng'] = results[0].geometry.location.lng();

            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location

            });

            location['marker'] = marker;

            selection.geolocation = location;
            console.log(selection.geolocation);
            console.log(selection.geolocation.lat);
            console.log(selection.geolocation.lng);
            console.log(selection.destinationCity);
            return location;
        }
        else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

/*Places Search based on geocoding and type of search - for this - restaurants- when button clicked*/


$("#bars").on("click", function() {
    console.log('working');
    var request = {
        location: selection.geolocation,
        center: { lat: selection.geolocation.lat, lng: selection.geolocation.lng },
        radius: '500',
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
    console.log('making markers');
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}
});




/*Making initial map*/

var geocoder;
var map;


function initMap() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-41.28664, 174.77557);
    var mapOptions = {
        zoom: 14,
        center: latlng
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);

}


// selectHotel(location); --> make nearbySearch() requests to move forward with selecting hotels/restaurants/etc
// at end of selectHotel() function, call selecBarsAndRestaurants(location); (save to global object - iterate through)



/* 
    
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
