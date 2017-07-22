function visualAndSoundHighlightFeature(event) {
  var layer = event.target;
  if (!searchesTest) {
    navigationSound.stop();
  }
  highlightFeature(layer);
  playBorderSound();
  console.log(pressedKeys);
  let topValue = layer.feature.properties.value;
  let bottomValue = layer.feature.properties.bottomValue
  if (!topValue) {
    throw new Error("Property value is undefined");
  }
  if (!bottomValue) {
    throw new Error("Property bottomValue is undefined");
  }
  // if (pressedKeys.output) {
  //   sayPropertyName(layer);
  //   sayPropertyValueAndUnit(layer);
  // } //else  (pressedKeys.compare){
  //create2Sounds(topValue, bottomValue, audiocntxt.currentTime, audiocntxt.currentTime + 0.5, 1, -1);
  //}
  // else {
  //     createSound(topValue, audiocntxt.currentTime, audiocntxt.currentTime + 0.5, 0)
  //
  // }
};

function compareFeatures(event) {
  var layer = event.target;
  pressedKeys.navigate = false;

  if (pressedKeys.difference) {
    try {
      checkScaleForCalculation(event, "difference");
      singleValueToSound(differenceTopBottomFratureValues(event));
    } catch (error) {
      console.log(error);
    }
  } else if (pressedKeys.equal) {
     checkScaleForCalculation(event, "equal");
     if(equalityTopBottomFratureValues(event)){
        responsiveVoice.speak("equal");
     }
       responsiveVoice.speak("not equal");
  }  else if (pressedKeys.output) {
    sayPropertyName(layer);
    sayPropertyValueAndUnit(layer);
  }
  else {
    let topValue = layer.feature.properties.value;
    let bottomValue = layer.feature.properties.bottomValue;
    create2Sounds(topValue, bottomValue, audiocntxt.currentTime, audiocntxt.currentTime + 0.5, 1, -1);
  }


};


function highlightFeature(layer) {
  layer.setStyle({
    weight: 5,
    color: '#666',
    dashArray: '',
    fillOpacity: 0.7
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  };

  info.update(layer.feature.properties);
}


function resetHighlight(event) {
  geojson.resetStyle(event.target);
  info.update();
};


function addTopMapToMap() {
  mapsToBeCompared.top.addTo(map);
};


// USE LATER FOR LAYER SIWITCHING
// function switchTopBottomMapAndUpdateView(){
//   map.removeLayer(mapsToBeCompared.top.leaflet);
//   let newTop = mapsToBeCompared.bottom;
//   mapsToBeCompared.bottom = mapsToBeCompared.top;
//   mapsToBeCompared.top = newTop;
//   // addTopMapToMap?
// };
//
//
// function removeLayer(layer){
//   console.log("map = " + map);
//   map.removeLayer(layer);
// };



function setActionOnInfoControl(map) {
  info.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
  };

  // method that we will use to update the control based on feature properties passed
  info.update = function(props) {
    this._div.innerHTML = '<h4>US Population Density</h4>' + (props ?
      '<b>' + props.name + '</b><br />' + props.value + ' ' + props.unit :
      'Hover over a state');
  };

  info.addTo(map);
};
