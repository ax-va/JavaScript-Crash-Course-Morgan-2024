/*
The core of a drum beat is built around three components:
- the kick drum (a "boom" sound),
- the snare drum (a "bah" sound), and
- the hi-hat (a "ti" sound).
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

    // to pass the band of frequencies around 15 kHz
    let hiHatFilter = new Tone.Filter(15000, "bandpass")
    // to connect the filter to the output, and then the synth to the filter
    .toDestination();

    let hiHat = new Tone.NoiseSynth({
        // The sound will be over immediately after
        // the attack and decay periods (0.001 sec + 0.1 sec).
        envelope: { attack: 0.001, decay: 0.1, sustain: 0, release: 0 },
        volume: -6
    }).connect(hiHatFilter);

    // Stream of eighth-note hi-hats for four bars
    new Tone.Loop((time) => {
        hiHat.triggerAttackRelease("16n", time);
    }, "8n").start("0:0:0").stop("4:0:0");
    // -> the hi-hat every eighth note

    // Use a noise synth and a regular synth with
    // a fixed frequency to simulate the snare sound.
    // Also pass the noise component of the sound through
    // a bandpass filter to make the snare lower than the hi-hat.
    class Snare {
        constructor() {
            /*
            Creates a filter and two synths.
             */
            this.noiseFilter = new Tone.Filter(5000, "bandpass").toDestination();
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
            }).toDestination();
        }

        triggerAttackRelease(duration, when) {
            this.noiseSynth.triggerAttackRelease(duration, when);
            this.pitchedSynth.triggerAttackRelease("G3", duration, when);
        }
    }

    let snare = new Snare();
    new Tone.Loop((time) => {
        snare.triggerAttackRelease("16n", time);
    }, "2n").start("0:1:0").stop("4:0:0");
    // -> the snare every two quarter notes

    let kick = new Tone.MembraneSynth({
        pitchDecay: 0.02, // How quickly the frequency should change
        octaves: 6, // How many octaves to drop the frequency in that time
        volume: -9
    }).toDestination();

    new Tone.Loop((time) => {
        // Trigger the synth with a frequency of 50 Hz.
        // The kick and snare sounds will alternate every quarter note,
        // giving a classic rock drum beat.
        kick.triggerAttackRelease(50, "16n", time);
    }, "2n").start("0:0:0").stop("4:0:0");
});
