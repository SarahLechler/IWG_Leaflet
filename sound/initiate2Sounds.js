
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audiocontext = new AudioContext();
var dimension1 = audiocontext.createStereoPanner();
var dimension2 = audiocontext.createStereoPanner();


function create2Sounds(pianoKey1, pianoKey2, startTime, endTime, direction1, direction2) { // startTime is always audiocontext.currentTime and endTime audiocontext.currentTime + how long it should be played
    if (sound1 === null && sound2 === null) {
        createWhiteNoise(startTime, endTime)
    } else {
        var g = audiocontext.createGain();
        g.gain.exponentialRampToValueAtTime(1.0/*0.00001*/, audiocontext.currentTime + 0.04);
        var sound1 = audiocontext.createOscillator();
        sound1.channelCountMode = "clamped-max";
        sound1.channelCount = "2";
        sound1.channelInterpretation = "speakers";
        sound1.type = "sine"; // sine wave — other values are 'square', 'sawtooth', 'triangle' and 'custom'
        sound1.connect(audiocontext.destination);
        sound1.frequency.value = calculateFrequency(pianoKey1);
        console.log(sound1);
        //sound1.connect(g);
        createDimension2(direction1, direction2);
        var sound2 = audiocontext.createOscillator();
        sound2.channelCountMode = "clamped-max";
        sound2.channelCount = "2";
        sound2.channelInterpretation = "speakers";
        sound2.type = "sine"; // sine wave — other values are 'square', 'sawtooth', 'triangle' and 'custom'
        sound2.connect(audiocontext.destination);
        sound2.frequency.value = calculateFrequency(pianoKey2);
        console.log(sound2);
        //sound2.connect(g);
        debugger;

        sound1.connect(dimension1);
        sound2.connect(dimension2);
        dimension1.connect(audiocontext.destination);
        dimension2.connect(audiocontext.destination);

        sound1.start(startTime);
        sound2.start(startTime +0.5);
        sound1.stop(endTime);
        sound2.stop(endTime+0.5);
    }

}
;

function createDimension2(direction1, direction2) { // value between -1 (thats left) and 1 (right)

    if (-1 <= direction1 <= 1 & -1 <= direction2 <= 1) {
        dimension1.pan.value = direction1;
        dimension2.pan.value = direction2;
    } else {
        throw new Error("no such direction");
    }
    console.log(dimension1);
}
;
