/*when a button is clicked, set the variable as the button value*/

function setTypes(cb) {
    $(".adventure").on("click", function() {
        var adventureLevel = $(this).attr("id");
        cb(adventureLevel);
    });

    $(".temperature").on("click", function() {
        var temperatureLevel = $(this).attr("id");
        cb(temperatureLevel);
    });

    $(".price").on("click", function() {
        var price = $(this).attr("id");
        cb(price);
    });
}

/*set destinationSelection as a combo of the button selections*/
function setGeoString(data) {
    $(".inspire").on("click", function() {
        var destinationSelection = data;
        console.log(destinationSelection);
        if (destinationSelection === "active") {
            console.log("yay")
        }
        else {
            console.log("nope :(")
        }
    });
}

/*call the function to set the types and pass to destinationSelection when inspire button clicked*/
setTypes(setGeoString);






/*below: other bits for cb function for selections*/





/*need to make a callback function so that you can get the results of the button clicks from the function*/


/*based on what the variables are set as, set the location as one of the following:
active  hot high                Sydney
active  hot medium              Botswana
active  hot low                 Cuba
active  mild high               Queenstown
active  mild medium             Costa Rica
active  mild low                Lake Titicaca
active  cold high               Whistler
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


eg if "quizOutput = recreational hot low, location = Thailand"

then pass the location to maps to centre on that point. 

Then do a nearby search to show restaurants etc - switch using buttons
*/


/*
function initMap() {
    // The location of Uluru
    var uluru = { lat: -25.344, lng: 131.036 };
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), { zoom: 4, center: uluru });
    // The marker, positioned at Uluru

    var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    var locations = [
        { lat: 40.785091, lng: -73.968285 },
        { lat: 41.084045, lng: -73.874245 },
        { lat: 40.754932, lng: -73.984016 }
    ];

    var markers = locations.map(function(location, i) {
        return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
        });
    });

    var markerCluster = new MarkerClusterer(map, markers, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
};
*/
