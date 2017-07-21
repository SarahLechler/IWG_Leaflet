//calculate valueSteps with help of the legend to set the right sound output



function comparingTopBottom(bottomValue, topValue, bbox, curserPosition) {
  try {
      if(curserPosition) {
          
    create2Sounds(bottomValue, topValue, audiocontext.currentTime, audiocontext.currentTime+0.5, 1, -1)
      }
      else { // No 2.5 sound output

      }
  }
  catch (error) {

  }
};


function singleValueToSound(value) {
  var pianokey = value; //calculate valueSteps with help of the legend to set the right sound output
  createSound(value, audiocontext.currentTime, audiocontext.currentTime+0.5, 0);

};
