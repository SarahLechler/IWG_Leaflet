var AudioContext = window.AudioContext || window.webkitAudioContext;
var audiocontext = new AudioContext();
var sound = audiocontext.createOscillator();
var pos = audiocontext.createPanner();
var sourceBuffer = AudioContext.createBufferSource();
//sound.start();
const standardFrequency = 440.0;
const fristFrequency = 	261.6;
const secFrequency = 	293.7;
const thirdFrequency = 329.6;
const fourthFrequency = 349.2;
const fifthFrequency = 392.0;
const sixthFrequency = standardFrequency;
const sevFrequency = 493.9;
const eighthFrequency = 523.3;

// Stereo
var channels = 2;
// Create an empty two-second stereo buffer at the
// sample rate of the AudioContext
var frameCount = audioCtx.sampleRate * 2.0;

var myArrayBuffer = audioCtx.createBuffer(2, frameCount, audioCtx.sampleRate);

function setUpSound(event){
const topBottomProperties = getPropertiesOfBothFeatures(event);
console.log(event);
const topValue = topBottomProperties.top;//topBottomProperties.top.value;
console.console.log(topValue);
const bottomValue = topBottomProperties.bottom;//topBottomProperties.bottom.value;

/*add different colourvalues here -->
if (color.value<= blablabla&>=blabliblub){
document.onmousemove = createSound(certainType, certainFrequency);
}
 */
defineSound (topValue);
defineSound (bottomValue);
}

function calculateFrequenz(n) {
  var frequency = 440 * Math.pow(Math.pow(2, 1 / 12), n - 49); //n is the nth key on the piano
return frequency;
}

function defineSound (value){
if (value <=10) {
  createSound(firstFrequency).stop(audiocontext.currentTime)
} else if (value <= 20){
  createSound(secFrequency).play()
} else if (value<=50){
  createSound(thirdFrequency).play()
} else if (value <=100){
  createSound(fourthFrequency).play()
} else if (value <=200){
  createSound(fifthFrequency).play()
} else if (value <=500){
  createSound(sixthFrequency).play()
} else if (value <=1000){
  createSound(sevFrequency).play()
} else if (value >=1000){
  createSound(eighthFrequency).play()
}

this.audiocontext.close();
this.audiocontext = null;
 };

function createSound (frequency, position){
//creating position
  var position = audiocontext.createPanner();
  position.panningModel = 'HRTF';
  posistion.setOrientation(1, 0, 0);
  postition.coneInnerAngle = 360;
  //setting sound
  sound.channelInterpretation = "speakers";
  sound.type= "sine"; // sine wave — other values are 'square', 'sawtooth', 'triangle' and 'custom'
  sound.connect (audiocontext.destination)
  sound.frequency.value = frequency


  //set Buffer
  sourceBuffer.buffer= myArrayBuffer;
  sourceBuffer.connect(audiocontext.connect);
  sourceBuffer.stop(audiocontext.currentTime +0.25);


};
