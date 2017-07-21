var AudioContext = window.AudioContext || window.webkitAudioContext;
var audiocontext = new AudioContext();
var dimension = audiocontext.createStereoPanner();

function createSound(pianoKey, startTime, endTime, direction) { // startTime is always audiocontext.currentTime and endTime audiocontext.currentTime + how long it should be played
    if (pianoKey === null) {
        createWhiteNoise(startTime, endTime);
    } else {
        var g = audiocontext.createGain();
        g.gain.exponentialRampToValueAtTime(1.0/*0.00001*/, audiocontext.currentTime + 0.04);
        createDimension(direction);
        var sound = audiocontext.createOscillator();
        sound.channelCountMode = "clamped-max";
        sound.channelCount = "2";
        sound.channelInterpretation = "speakers";
        sound.type = "sine"; // sine wave — other values are 'square', 'sawtooth', 'triangle' and 'custom'
        sound.connect(audiocontext.destination);
        sound.frequency.value = calculateFrequency(pianoKey);
        console.log(sound);
        sound.connect(g);

        sound.connect(dimension);
        dimension.connect(audiocontext.destination);

        sound.start(startTime);
        sound.stop(endTime);
    }
}
;

function calculateFrequency(n) {
    var frequency = 440 * Math.pow(Math.pow(2, 1 / 12), n - 49 +12 ) ; //n is the nth key on the piano --> 12 key equals one octave
    console.log(frequency);
    return frequency;
}
;

function createWhiteNoise(startTime, endTime) {
    var bufferSize = 2 * audiocontext.sampleRate,
            noiseBuffer = audiocontext.createBuffer(1, bufferSize, audiocontext.sampleRate),
            output = noiseBuffer.getChannelData(0);
    for (var i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
    }

    var whiteNoise = audiocontext.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;
    whiteNoise.start(startTime);

    whiteNoise.connect(audiocontext.destination);
    whiteNoise.stop(endTime);
}
;


function createDimension(direction) { // value between -1 (thats left) and 1 (right)

    if (-1 <= direction <= 1) {
        dimension.pan.value = direction;
    } else {
        throw new Error("no such direction");
    }
    console.log(dimension);
    return dimension;
}
;
