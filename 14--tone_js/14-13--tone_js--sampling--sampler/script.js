/*
*Sampling* = using snippets of existing audio to build up a new piece of music.
One common technique is to modify the playback speed of the samples to change their pitch.

Free online sample database: https://freesound.org

Samples used in this example:
- https://freesound.org/people/MTG/sounds/357432/
- https://freesound.org/people/MTG/sounds/357336/
- https://freesound.org/people/MTG/sounds/357546/

Re-uploaded samples used in this example:
- https://skilldrick-jscc.s3.us-west-2.amazonaws.com/trumpet-c5.mp3
- https://skilldrick-jscc.s3.us-west-2.amazonaws.com/trumpet-d5.mp3
- https://skilldrick-jscc.s3.us-west-2.amazonaws.com/trumpet-f5.mp3

The samples were re-uploaded into this repo.

*Reverb* (short for *reverberation*) is an effect that makes
music sound like it's being played in a room or larger enclosed space.

The core of a drum beat is built around three components:
- the kick drum (a "boom" sound),
- the snare drum (a "bah" sound), and
- the hi-hat (a "ti" sound).

A helper function handles drum patterns of the form:
```
{
    kick: "x...x...",
    snare: "..x...x.",
    hiHat: "xxxxxxxx",
};
```,
where each x represents a note, each dot represents a silence,
and each column represents an eighth note.
 */
let playButton = document.querySelector("#play");
let playingParagraph = document.querySelector("#playing");

// Hide the Play button and show the "Playing" text when the user clicks the button
playButton.addEventListener("click", () => {
    // Hide this button
    playButton.style = "display:none";
    playingParagraph.style = "";

    // Trigger the Tone.js library to start inside the click handler
    Tone.start();
    Tone.Transport.start();

    // Converts a string to an array of notes or null.
    // Dots in the string become nulls in the array and are silent.
    function mkSequence(pattern) {
        // Create and return an array, for example,
        // "x...x..." -> ["x", null, null, null, "x", null, null, null].
        return pattern.split("").map((value) => (value === "." ? null : value));
    }

    let drumPattern = {
        kick: "x...x...",
        snare: "..x...x.",
        hiHat: "xxxxxxxx",
    };

    let kickSequence = mkSequence(drumPattern.kick);
    let snareSequence = mkSequence(drumPattern.snare);
    let hiHatSequence = mkSequence(drumPattern.hiHat);

    let reverb = new Tone.Reverb({
        // How long (in seconds) the reverberation will continue after the sound stops
        decay: 1, // The higher this number, the more echoed the effect
        // How much of the reverb sound is passed through compared with the original sound
        wet: 0.6 // 60 percent reverb and 40 percent the original sound
    }).toDestination();

    // to pass the band of frequencies around 15 kHz
    let hiHatFilter = new Tone.Filter(15000, "bandpass")
    // to connect the filter to the output, and then the synth to the filter
    .connect(reverb);

    let hiHat = new Tone.NoiseSynth({
        // The sound will be over immediately after
        // the attack and decay periods (0.001 sec + 0.1 sec).
        envelope: { attack: 0.001, decay: 0.1, sustain: 0, release: 0 },
        volume: -6
    }).connect(hiHatFilter);

    // Stream of eighth-note hi-hats for four bars
    new Tone.Sequence((time) => {
        hiHat.triggerAttackRelease("16n", time);
    }, hiHatSequence, "8n").start("0:0:0").stop("4:0:0");

    // Use a noise synth and a regular synth with
    // a fixed frequency to simulate the snare sound.
    // Also pass the noise component of the sound through
    // a bandpass filter to make the snare lower than the hi-hat.
    class Snare {
        constructor() {
            /*
            Creates a filter and two synths.
             */
            this.noiseFilter = new Tone.Filter(5000, "bandpass").connect(reverb);
            this.noiseSynth = new Tone.NoiseSynth({
                envelope: {
                    attack: 0.001,
                    decay: 0.1,
                    sustain: 0,
                    release: 0
                },
                volume: -12
            }).connect(this.noiseFilter);
            this.pitchedSynth = new Tone.Synth({
                envelope: {
                    attack: 0.0001,
                    decay: 0.1,
                    sustain: 0,
                    release: 0
                },
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
    new Tone.Sequence((time)=> {
        snare.triggerAttackRelease("16n", time);
    }, snareSequence, "8n").start("0:0:0").stop("4:0:0");

    let kick = new Tone.MembraneSynth({
        pitchDecay: 0.02, // How quickly the frequency should change
        octaves: 6, // How many octaves to drop the frequency in that time
        volume: -8
    }).connect(reverb);

    new Tone.Sequence((time) => {
        // Trigger the synth with a frequency of 50 Hz.
        // The kick and snare sounds will alternate every quarter note,
        // giving a classic rock drum beat.
        kick.triggerAttackRelease(50, "16n", time);
    }, kickSequence, "8n").start("0:0:0").stop("4:0:0");

    // `Tone.Sampler` is by default polyphonic (can play multiple samples at once)
    const sampler = new Tone.Sampler({
        // mapping note names to filenames
        urls: {
            "C5": "trumpet-c5.mp3",
            "D5": "trumpet-d5.mp3",
            "F5": "trumpet-f5.mp3"
        },
        // shared prefix of the same S3 bucket
        baseUrl: "https://skilldrick-jscc.s3.us-west-2.amazonaws.com/",
        attack: 0, // fade-in speed
        release: 1, // fade-out speed
        volume: -12, // dB
        onload: () => { // When all the samples have been downloaded, do this.
            // Play a three-note chord
            sampler.triggerAttackRelease(["C5", "E5", "G5"], "1n", 0);
        }
    }).toDestination();
    // -> a C major chord played by the trumpet sampler
});
