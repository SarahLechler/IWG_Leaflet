/* 
*
 */

var AudioContext = window.AudioContext || window.webkitAudioContext;
var audiocontext = new AudioContext();
var dimension = audiocontext.createStereoPanner();



function createSound(pianoKey, startTime, endTime, direction) { startTime is always audiocontext.currentTime and endTime audiocontext.currentTime + how long it should be played
    var g = audiocontext.createGain();
    g.gain.exponentialRampToValueAtTime(1.0/*0.00001*/, audiocontext.currentTime + 0.04);
    createDimension(direction);
    var sound = audiocontext.createOscillator();
    sound.channelInterpretation = "speakers";
    sound.type = "sine"; // sine wave — other values are 'square', 'sawtooth', 'triangle' and 'custom'
    sound.connect(audiocontext.destination);
    sound.frequency.value = calculateFrequency(pianoKey);
    console.log(sound);
    sound.connect(g);
    sound.connect(dimension);
    sound.connect(audiocontext.destination);


    sound.start(startTime);
    sound.stop(endTime);
}
;

function calculateFrequency(n) {
    var frequency = 440 * Math.pow(Math.pow(2, 1 / 12), n - 49); //n is the nth key on the piano --> 12 key equals one octave
    console.log (frequency);
    return frequency;
}
;


function createDimension (direction) { // expects either l for left and right for r 

    /*dimension.panningModel = 'HRTF';
     dimension.distanceModel = 'inverse';
     dimension.refDistance = 1;
     dimension.maxDistance = 10000;
     dimension.rolloffFactor = 1;
     dimension.coneInnerAngle = 360;
     dimension.coneOuterAngle = 0;
     dimension.coneOuterGain = 0;
     
     var listener = audiocontext.listener;
     listener.setOrientation(0, 0, -1, 0, 1, 0);
     listener.setPosition(Math.floor(window.innerWidth / 2), Math.floor(window.innerHeight / 2), 300);
     
     */
    if (direction === "l") {
        dimension.pan = -1;
    } else if (direction === "r") {
        dimension.pan = 1;
    } else
        throw new Error("no such direction");
    console.log(dimension);
    return dimension;
}
;