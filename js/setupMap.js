let map = L.map('showMap').setView([37.8, -96], 4);



L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
  id: 'mapbox.light'
}).addTo(map);


map.addEventListener('mousemove', function(ev) {
map.scrollWheelZoom.disable();
    map.zoomControl.disable();
    map.doubleClickZoom .disable();
    map.dragging.disable();


  if (pressedKeys.navigate)  { // To disable sound as soon feature is reached, set pressedKeys.navigate = false
    let lat = ev.latlng.lat;
    let lng = ev.latlng.lng;

    if (!nearestFeatureToMouseOnMap) { // Calculate only onthe for eath press of n. After each press of n, nearestFeatureToMouseOnMap will be set to null
      nearestFeatureToMouseOnMap = getNearestFeature(lat, lng);
        console.log(nearestFeatureToMouseOnMap.nearestDistance + "             " + nearestFeatureToMouseOnMap.nearestFeature);
    };
    //console.log(nearestFeatureToMouseOnMap);

    let currentDistance = getCurrentDistanceToNearestFeature(nearestFeatureToMouseOnMap, lat, lng);
    //console.log(currentDistance);

    getFrequenzeForValue(currentDistance);
    navigationSound.frequency = getFrequenzeForValue(currentDistance);

  }else{

      //#################################################################################################################
      //#################################################################################################################
      //#################################################################################################################
      //#################################################################################################################

      if(pressedKeys.searchNavi){
          var country;
          var curName = document.getElementById("myInput").value;


    $.each(statesData.features, function(i, v) {
        if (v.properties.name == curName) {
            country = v;
            return;
        }
    });


          let lat = ev.latlng.lat; // koordinaten von der maus?nnnn
          let lng = ev.latlng.lng;

          //console.log("lets Go ");
          nearestFeatureToMouseOnMap=country;

            if (!nearestFeatureToMouseOnMap) { // Calculate only onthe for eath press of n. After each press of n, nearestFeatureToMouseOnMap will be set to null
                //nearestFeatureToMouseOnMap = getNearestFeature(lat, lng);
                nearestFeatureToMouseOnMap = country;
                //console.log(nearestFeatureToMouseOnMap.nearestDistance + "             " + nearestFeatureToMouseOnMap.nearestFeature);
            };
          let currentDistance = getMinimalDistanceToFeature(country.geometry.coordinates, lat, lng);
          //console.log(currentDistance);
          if(currentDistance<=100){
              searchesTest=false;

          }
    //let currentDistance = getCurrentDistanceToNearestFeature(nearestFeatureToMouseOnMap, lat, lng);

    getFrequenzeForValue(currentDistance);
    navigationSound.frequency = getFrequenzeForValue(currentDistance);
    }


      //#################################################################################################################
      //#################################################################################################################
      //#################################################################################################################
      //#################################################################################################################
      //#################################################################################################################
      //#################################################################################################################
  }


});

setActionOnEachGeoJSONAndAddThemToMapsToBeCompared(map);
addTopMapToMap();
setActionOnInfoControl(map);
addLegend();










var Nebraska = {
            "coordinates": [
          [
            [-103.324578, 43.002989],
            [-101.626726, 42.997512],
            [-98.499393, 42.997512],
            [-98.466531, 42.94822],
            [-97.951699, 42.767481],
            [-97.831206, 42.866066],
            [-97.688806, 42.844158],
            [-97.217789, 42.844158],
            [-96.692003, 42.657942],
            [-96.626279, 42.515542],
            [-96.44554, 42.488157],
            [-96.264801, 42.039048],
            [-96.127878, 41.973325],
            [-96.062155, 41.798063],
            [-96.122401, 41.67757],
            [-96.095016, 41.540646],
            [-95.919754, 41.453015],
            [-95.925231, 41.201076],
            [-95.826646, 40.976521],
            [-95.881416, 40.719105],
            [-95.7664, 40.587659],
            [-95.552799, 40.264519],
            [-95.306337, 40.001626],
            [-101.90605, 40.001626],
            [-102.053927, 40.001626],
            [-102.053927, 41.003906],
            [-104.053011, 41.003906],
            [-104.053011, 43.002989],
            [-103.324578, 43.002989]
          ]
        ]
};
