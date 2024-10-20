let playButton = document.querySelector("#play");
let playingParagraph = document.querySelector("#playing");

// Hide the Play button and show the "Playing" text when the user clicks the button
playButton.addEventListener("click", () => {
    // Hide this button
    playButton.style = "display:none";
    playingParagraph.style = "";

    // Trigger the Tone.js library to start inside the click handler
    Tone.start();

    // Tone.Synth (synthesizer) constructor
    let synth = new Tone.Synth({
        // Use the simplest oscillator that generates sine waves
        oscillator: {type: "sine"},
        // The amplitude envelope determines how the volume of a note changes over the course of its duration.
        // An *ADSR* (*attack*, *decay*, *sustain*, *release*) envelope is a simplified model for musical instruments:
        // 1 ^
        //   |    /\
        //   |   /  \____
        //   |  /     S  \
        //   ---------------->
        //       A D     R
        // The values of attack, decay, and release are all given in seconds,
        // while sustain is a number between 0 and 1 representing the amplitude level to be sustained at.
        // Real examples:
        // violin -> long attack and less immediate release;
        // piano -> very short attack and intermediate and more immediate release.
        envelope: {
            // 1. The *attack* is the amount of time between the note being triggered
            // (for example, when you press a key on a synthesizer) and the note reaching its maximum volume.
            attack: 0,
            // 2. The *decay* is the amount of time between the end of the attack and the sustain portion of the note.
            decay: 0,
            // 3. The *sustain* is a gain value that defines the volume the note will remain
            // at after the attack and decay, for as long as the key is held down.
            sustain: 1,
            // 4. The *release* defines how long it will take for the note's amplitude
            // to get back down to zero after the key is released.
            release: 0
        },
        // Sets the overall volume of the synthesizer in decibels (dB)
        volume: -6 // -6 dB to match the gain of 0.5
        // A setting of 0 decibels is equivalent to a gain of 1 (no change to the volume).
        // -6 decibels is equivalent to a gain of 0.5, or half the volume.
        // -12 decibels corresponds to a gain of 0.25, or a quarter of the volume, and so on.
        // Every +6 decibels doubles the volume, and every -6 decibels halves it.
        // This is due to the peculiarity of the our perception of sound volume:
        // when the level is halved or doubled, we percept the change on a fixed amount,
        // a fixed number of decibels that are added or subtracted.
    // Connect the output of the synth to the audio context's output
    }).toDestination();

    // Play a single note "A4" (equivalent to 440 Hz) two seconds, starting immediately
    synth.triggerAttackRelease("A4", 2, 0);
    // Hear the same sound as in the previous example with Web Audio API

    let synthSquare = new Tone.Synth({
        oscillator: {type: "square"},
        envelope: {attack: 0, decay: 0, sustain: 1, release: 0},
        volume: -6
    }).toDestination();

    synthSquare.triggerAttackRelease("A4", 2, 4);
    // The distinctive sound of each oscillator is known as its *color*, or *timbre*.
    // Other oscillator waveforms represent a combination of many individual sine waves
    // of various frequencies, where each frequency is a whole-number multiple of the original frequency.
    // These multiples of the base frequency are known as *harmonics*, or *overtones*,
    // while the base frequency is known as the fundamental.

    let synthSquare2 = new Tone.Synth({
        oscillator: {type: "square"},
        envelope: {attack: 0.8, decay: 0.3, sustain: 0.8, release: 1},
        volume: -6
    }).toDestination();

    synthSquare2.triggerAttackRelease("A4", 2, 8);

    let synthSquare3 = new Tone.Synth({
        oscillator: {type: "square"},
        envelope: {attack: 0.8, decay: 0.3, sustain: 0.8, release: 1},
        volume: -12
    }).toDestination();

    synthSquare3.triggerAttackRelease("A4", 2, 12);
});
