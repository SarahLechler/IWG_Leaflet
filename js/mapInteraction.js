var info = L.control(); // Used to display on mouseover property name and density
var searchesTest = false;
var isSearching = false;

var pressedKeys = {
    difference: false,
    equal: false,
    greater: false,
    smaller: false,
    add: false,
    quotient: false,
    navigate: false,
    searchNavi: false,
    output: false,
    compare: false
};

var dragging = false;


var nearestFeatureToMouseOnMap = null;

var mapsToBeCompared = {// stores the leaflet-GeoJson and the raw GeoJson. Want to use both because it is easier to get bottom values with raw GeoJSON
    top: ""
};

var searches = function () {
    isSearching = true;
};

var notSearching = function () {
    isSearching = false;
};

$(document).on("keypress", function (e) {
    console.log("key pressed");
    var code = e.keyCode || e.which;
    console.log(code);

    //if (isSearching == true) {
    //  return;
    //}
    if (code === 105 && !searchNavi) { //73 stands for 'i' like informaion
        responsiveVoice.speak("First Map, countries of the united states. Property, people per squarekilometer. Secound Map, countries of the united states");
    }
    if (code === 109) { //68 stands for 'm'
        if (dragging) {
            map.dragging.disable();
            map.setView([37.8, -96], 4);
            dragging = false;
        } else {
            map.dragging.enable();
            dragging = true;
        }
    }
    if (code === 113) { // q
        document.getElementById("myInput").value = '';

        $("#myInput").focus();

    } else

    if (code === 13) {
        if (document.getElementById("myInput").focus === true) {
            console.log("hallo");
            console.log(document.getElementById(myTable));

            //responsiveVoice.speak();
        }
    } else
    if (code === 100) { //100 stands for 'd', like difference
        pressedKeys.difference = !pressedKeys.difference;
        let storePress = pressedKeys.difference;
        setAllKeysFalse(); // Make sure that only one calculation is enabled.
        pressedKeys.difference = storePress;
    } else if (code === 101) { // 101 stands for e like 'equal'
    console.log("EQUAL KEY");
        pressedKeys.equal = !pressedKeys.equal;
        let storePress = pressedKeys.equal;
        setAllKeysFalse(); // Make sure that only one calculation is enabled.
        pressedKeys.equal = storePress;
    } else if (code === 103) { // 103 stands for g like 'greater'
        pressedKeys.greater = !pressedKeys.greater;
        let storePress = pressedKeys.greater;
        setAllKeysFalse(); // Make sure that only one calculation is enabled.
        pressedKeys.greater = storePress;
    } else if (code === 115) { // 115 stands for s like smaller
        pressedKeys.smaller = !pressedKeys.smaller;
        let storePress = pressedKeys.smaller;
        setAllKeysFalse(); // Make sure that only one calculation is enabled.
        pressedKeys.smaller = storePress;
    } else if (code === 97) { // 115 stands for s like smaller
        pressedKeys.add = !pressedKeys.add;
        let storePress = pressedKeys.add;
        setAllKeysFalse(); // Make sure that only one calculation is enabled.
        pressedKeys.add = storePress;
    } else if (code === 113) { // 113 stands for q like quotient
        pressedKeys.quotient = !pressedKeys.quotient;
        let storePress = pressedKeys.quotient;
        setAllKeysFalse(); // Make sure that only one calculation is enabled.
        pressedKeys.quotient = storePress;
    } else if (code === 110) { //110 stands for 'n', like navigate

        let storePress = pressedKeys.navigate;
        setAllKeysFalse(); // Make sure that only one calculation is enabled.
        pressedKeys.navigate = storePress;
        nearestFeatureToMouseOnMap = null; // Delete it so it is calculated agin after a new press of null
        pressedKeys.navigate = !pressedKeys.navigate;

        if (!pressedKeys.navigate) { // If nafigatoin stops, stop sound
            navigationSound.stop();
        } else { // If navigation starts
            navigationSound.play();
            navigationSound.frequency = 0;
        }
    } else if (code === 122) { //110 stands for 'z', like zearch
//deleteEventsFromFeature();
        searchesTest = true;
        //#################################################################################################################
        //#################################################################################################################
        //#################################################################################################################
        //#################################################################################################################

        let storePress = pressedKeys.searchNavi; // storePress = false

        setAllKeysFalse(); // Make sure that only one calculation is enabled.

        pressedKeys.navigate = storePress;

        nearestFeatureToMouseOnMap = null; // Delete it so it is calculated agin after a new press of null

        pressedKeys.searchNavi = !pressedKeys.searchNavi;
        console.log(pressedKeys.searchNavi);


        if (!pressedKeys.searchNavi) { // If nafigatoin stops, stop sound
            console.log("stopps now");
            navigationSound.stop();

        } else { // If navigation starts

            navigationSound.play();

            navigationSound.frequency = 0;
        }
        //#################################################################################################################
        //#################################################################################################################
        //#################################################################################################################
        //#################################################################################################################

    } else if (code===111){ //o for output

      pressedKeys.output = !pressedKeys.output;
      let storePress = pressedKeys.output;
      setAllKeysFalse(); // Make sure that only one calculation is enabled.
      pressedKeys.output = storePress;
            console.log("Voice output on");
    } else if (code ===99){
      pressedKeys.compare = !pressedKeys.compare;
      let storePress = pressedKeys.compare;
      setAllKeysFalse(); // Make sure that only one calculation is enabled.
      pressedKeys.compare = storePress;

        console.log("pressedKeys.compare = " + pressedKeys.compare);
        console.log(pressedKeys);
    }
    ;
});


function setAllKeysFalse() {
    for (let key in pressedKeys) {
        if (pressedKeys.hasOwnProperty(key)) {
            pressedKeys[key] = false;
        }
    }
}
;



function getPropertiesOfBothFeatures(event) {
    console.log(event.target.feature.properties);
    return event.target.feature.properties;
}
;




function setActionOnEachGeoJSONAndAddThemToMapsToBeCompared(map) {

    geojson = L.geoJson(comparisonFeature, {
        style: setFeatureStyle,
        onEachFeature: addEventsToFeatures
    });

    addMapsToMapsToBeCompared(geojson);
}
;


function addEventsToFeatures(feature, layer) {
    layer.on({
        mouseover: visualAndSoundHighlightFeature, // Could be sound for new Feature
        mouseout: resetHighlight,
        click: compareFeatures
    });
}
;



function addMapsToMapsToBeCompared(topMap) {
    mapsToBeCompared.top = topMap;
}
;

var mouseOut = function () {
    responsiveVoice.speak("You left the map ");
}

var mouseIn = function () {
    responsiveVoice.speak("You entered the map ");
}
