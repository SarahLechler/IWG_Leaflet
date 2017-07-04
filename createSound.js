/* 
 * 
 */

var AudioContext = window.AudioContext || window.webkitAudioContext;
var audiocontext = new AudioContext();
var sound = audiocontext.createOscillator();
var dimension = audiocontext.createPanner();


function initiateSound(pianoKey, startTime, endTime, direction) {

    var g = audiocontext.createGain();
    g.gain.exponentialRampToValueAtTime(1.0/*0.00001*/, audiocontext.currentTime + 0.04);


    sound.channelInterpretation = "speakers";
    sound.type = "sine"; // sine wave — other values are 'square', 'sawtooth', 'triangle' and 'custom'
    sound.connect(audiocontext.destination);
    sound.frequency.value = calculateFrequenz(pianoKey);
    console.log(sound);

    createDimension(direction);
    // sound.connect(g);
    sound.connect(dimension);
    dimension.connect(audiocontext.destination);

    sound.start(startTime);
    sound.stop(endTime);

}
;




function calculateFrequenz(n) {
    var frequency = 440 * Math.pow(Math.pow(2, 1 / 12), n - 49); //n is the nth key on the piano --> 12 key equals one octave
    console.log(frequency);
    return frequency;
}
;

//dimension to set where the sound is played in a 3D room

/*The pan property takes a unitless value between -1 (full left pan) and 1 (full right pan).
 *  This interface was introduced as a much simpler way to apply a simple 
 *  panning effect than having to use a full PannerNode.*/

function createDimension(direction) { // expects either l for left and right for r 

    dimension.panningModel = 'HRTF';
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


    if (direction === "l") {
        dimension.setPosition = (-1, 0, 0);
    } else if (direction === "r") {
        dimension.setPosition = (1, 0, 0);
    } else
        throw new Error("no such direction");
    console.log(dimension);
    return dimension;
}
;