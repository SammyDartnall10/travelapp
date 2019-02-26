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

$(".inspire").on("click", function() {
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
            console.log("This is the default value when none of the cases were true");
    }

    selection.destinationCity = city;
    console.log(selection.destinationCity);
});




/*Get code working to request Place ID based on text... then can pass it the text from above. Using Google example atm or just use 
lat/long options in case instead of place names? That way wouldnt have to get Place ID*/

var map;

var dummyCity = "Cape Town";

function initMap() {
  // Create a map centered in Pyrmont, Sydney (Australia).
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -33.8666, lng: 151.1958},
    zoom: 15
  });

  // Search for Google's office in Australia.
  var request = {
    location: map.getCenter(),
    radius: '500',
    query: dummyCity,
  };

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

google.maps.event.addDomListener(window, 'load', initialize);


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

$.getJSON("https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=id&key=AIzaSyBY0nEpb-qc6dxAR0UfKi1LnB0NU42uA70?callback=?", function(json) {
    JSON.parse(this.responseText);
    console.log(this.responseText);

});


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
