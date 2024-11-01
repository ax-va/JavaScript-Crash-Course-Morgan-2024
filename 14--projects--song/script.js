/*
Four logical sections of the code:

1. Instruments: The instruments will be instantiated and set up.

2. Sequencing: The looping sequences will be created.

3. Song: The start and end of each sequence will be scheduled.

4. Event Handling: How playing the song will be started.

 */

/////////////////
// Instruments //
/////////////////

// Create an instrument for drumbeat
function mkDrums() {
    let reverb = new Tone.Reverb({
        decay: 1, // The higher this number, the more echoed the effect
        wet: 0.3 // 30 percent reverb and 70 percent the original sound
    }).toDestination();

    let hiHatFilter = new Tone.Filter(15000, "bandpass").connect(reverb);

    let hiHat = new Tone.NoiseSynth({
        envelope: { attack: 0.001, decay: 0.1, sustain: 0, release: 0 },
        volume: -6
    }).connect(hiHatFilter);

    class Snare {
        constructor() {
            this.noiseFilter = new Tone.Filter(5000, "bandpass").connect(reverb);

            this.noiseSynth = new Tone.NoiseSynth({
                envelope: { attack: 0.001, decay: 0.1, sustain: 0, release: 0 },
                volume: -12
            }).connect(this.noiseFilter);

            this.pitchedSynth = new Tone.Synth({
                envelope: { attack: 0.0001, decay: 0.1, sustain: 0, release: 0 },
                oscillator: {type: "sine"},
                volume: -12
            }).connect(reverb);
        }

        triggerAttackRelease(duration, when) {
            this.noiseSynth.triggerAttackRelease(duration, when);
            this.pitchedSynth.triggerAttackRelease("G3", duration, when);
        }
    }

    let snare = new Snare();

    let kick = new Tone.MembraneSynth({
        pitchDecay: 0.02, // How quickly the frequency should change
        octaves: 6, // How many octaves to drop the frequency in that time
        volume: -9
    }).connect(reverb);

    // Return an object with the three drums in the form
    // of the *object literal shorthand syntax*.
    return {hiHat, snare, kick}; // same as `{hiHat: hiHat, snare: snare, kick: kick}`
}

let drums = mkDrums();

// Create instruments for two bass lines

// FMSynth = frequency modulation synthesis
// yields a richer sound than a plain oscillator.
let lowBass = new Tone.FMSynth({
    oscillator: { type: "triangle" },
    envelope: { attack: 0.0001, decay: 0.5, sustain: 0.3, release: 0.1 },
    volume: -3
}).toDestination();

let highBass = new Tone.FMSynth({
    oscillator: { type: "square" },
    envelope: { attack: 0.0001, decay: 0.1, sustain: 0.3, release: 0.1 },
    volume: -9
}).toDestination();

// Create an instrument for two chords or different times in the song
let chordSynth = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: "triangle" },
    volume: -12
}).toDestination();

// Create a tune instrument by using trumpet sampler

// Samples from freesound.org:
// https://freesound.org/people/MTG/sounds/357432/
// https://freesound.org/people/MTG/sounds/357336/
// https://freesound.org/people/MTG/sounds/357546/
let sampler = new Tone.Sampler({
    urls: {
        "C5": "trumpet-c5.mp3",
        "D5": "trumpet-d5.mp3",
        "F5": "trumpet-f5.mp3"
    },
    baseUrl: "https://skilldrick-jscc.s3.us-west-2.amazonaws.com/",
    attack: 0, // fade-in speed
    release: 1, // fade-out speed
    volume: -24
}).toDestination();
// The tune samples should be downloaded to play.
// ->
// That's why they don't play right away.

////////////////
// Sequencing //
////////////////

// Helper functions

// Converts a string to an array of notes or null.
// Dots in the string become nulls in the array and are silent.
function mkSequence(pattern) {
    // Create and return an array, for example,
    // "x...x..." -> ["x", null, null, null, "x", null, null, null].
    return pattern.split("").map((value) => (value === "." ? null : value));
}

function mkPipeSequence(pattern) {
    // Create and return an array, for example,
    // "C3| | |C3| | |G2|B2" -> ["C3", null, null, "C3", null, null, "G2", "B2"].
    return pattern.split("|").map((value) => (value.trim() === "" ? null : value));
}

// Create drum sequences

let drumPattern = {
    kick: "x...x...",
    snare: "..x...x.",
    hiHat: "xxxxxxxx",
};

let kickSequence = mkSequence(drumPattern.kick);
let snareSequence = mkSequence(drumPattern.snare);
let hiHatSequence = mkSequence(drumPattern.hiHat);

let hiHatToneSequence = new Tone.Sequence((time) => {
    drums.hiHat.triggerAttackRelease("16n", time);
}, hiHatSequence, "8n");

let snareToneSequence = new Tone.Sequence((time) => {
    drums.snare.triggerAttackRelease("16n", time);
}, snareSequence, "8n");

let kickToneSequence = new Tone.Sequence((time) => {
    drums.kick.triggerAttackRelease(50, "16n", time);
}, kickSequence, "8n");

// Create bass sequences

let lowBassSequence = mkPipeSequence("G2| | |G2|G2| | | ");
let highBassSequence = mkPipeSequence("G3|F3|E3|D3|G2|D3|G3|D3");

let lowBassToneSequence = new Tone.Sequence((time, note) => {
    lowBass.triggerAttackRelease(note, "16n", time, 0.6);
}, lowBassSequence, "8n");

let highBassToneSequence = new Tone.Sequence((time, note) => {
    highBass.triggerAttackRelease(note, "16n", time, 0.3);
}, highBassSequence, "8n");

// Create chord sequences

let chords = {
    // Note: the numbers are interpreted as strings
    1: ["D4", "G4"],
    2: ["E4", "G4"],
    3: ["C4", "E4", "G4"],
    4: ["B3", "F4", "G4"],
};

function playChord(time, chordName) {
    let notes = chords[chordName];
    // Play all the notes in the chord at once with `PolySynth`
    chordSynth.triggerAttackRelease(notes, "16n", time, 0.6);
}

// 32 eighth notes long, or 4 bars
let chordSequence1 = new Tone.Sequence((time, chordName) => {
    playChord(time, chordName);
}, mkSequence("1...2...3..4...31...2...3..4.343"), "8n"); // "8n" = each dot or chord name is an eighth note

// 16 eighth notes long, or 2 bars
let chordSequence2 = new Tone.Sequence((time, chordName) => {
    playChord(time, chordName);
}, mkSequence("3...2...4..1.213"), "8n"); // "8n" = each dot or chord name is an eighth note

// Create tune sequence

let trumpetPart = new Tone.Part((time, note) => {
    sampler.triggerAttackRelease(note, "1n", time); // "1n" = playing a long note, or a whole bar
}, [["0:0:0", "G5"], // relative times to when the part is scheduled to begin
    ["0:2:0", "C5"],
    ["1:0:0", "G5"],
    ["2:0:0", "D5"],
    ["2:2:0", "C5"],
    ["3:0:0", "B4"],
    ["4:0:0", "G5"],
    ["4:2:0", "C5"],
    ["5:0:0", "G5"],
    ["6:0:0", "D5"],
    ["6:2:0", "C5"],
    ["7:0:0", "B4"],
    ["7:2:0", "D5"],
    ["8:0:0", "C5"],
    ["8:2:0", "E5"],
    ["9:0:0", "F5"],
    ["9:2:0", "D5"],
    ["10:0:0", "C5"],
    ["10:2:0", "E5"],
    ["11:0:0", "D5"],
    ["12:0:0", "C5"],
    ["12:2:0", "E5"],
    ["13:0:0", "F5"],
    ["13:2:0", "D5"],
    ["14:0:0", "C5"],
    ["14:2:0", "E5"],
    ["15:0:0", ["B4", "G5"]]
]);

//////////
// Song //
//////////

// Start drums at the beginning of the song and keep playing for 44 bars
hiHatToneSequence.start("0:0:0").stop("44:0:0");
snareToneSequence.start("0:0:0").stop("44:0:0");
kickToneSequence.start("0:0:0").stop("44:0:0");

// The bass solo continues for a few bars after the drums stop.
lowBassToneSequence.start("0:0:0").stop("47:3:0");
highBassToneSequence.start("4:0:0").stop("47:3:0");

chordSequence1.start("8:0:0").stop("24:0:0");
chordSequence2.start("24:0:0").stop("32:0:0");
chordSequence1.start("32:0:0").stop("40:0:0");

trumpetPart.start("16:0:0");

////////////////////
// Event Handling //
////////////////////

let playButton = document.querySelector("#play");
let playingParagraph = document.querySelector("#playing");

play.addEventListener("click", () => {
    // Hide the "Play" button
    playButton.style = "display: none";
    // Show the "Playing" paragraph
    playingParagraph.style = "";

    Tone.start();
    Tone.Transport.position = "0:0:0"; // default
    Tone.Transport.start();
})