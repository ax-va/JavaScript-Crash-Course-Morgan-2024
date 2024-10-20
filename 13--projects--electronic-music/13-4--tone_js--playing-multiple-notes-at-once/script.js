let playButton = document.querySelector("#play");
let playingParagraph = document.querySelector("#playing");

// Hide the Play button and show the "Playing" text when the user clicks the button
playButton.addEventListener("click", () => {
    // Hide this button
    playButton.style = "display:none";
    playingParagraph.style = "";

    // Trigger the Tone.js library to start inside the click handler
    Tone.start();

    // polyphonic synth
    let synth = new Tone.PolySynth(
        Tone.Synth,
        {
            // Use the square oscillator
            oscillator: {type: "square"},
            envelope: {
                // The *attack* is the amount of time between the note being triggered
                // (for example, when you press a key on a synthesizer) and the note reaching its maximum volume.
                attack: 0.1,
                // The *decay* is the amount of time between the end of the attack and the sustain portion of the note.
                decay: 0.3,
                // The *sustain* is a gain value that defines the volume the note will remain
                // at after the attack and decay, for as long as the key is held down.
                sustain: 0.8,
                // The *release* defines how long it will take for the note's amplitude
                // to get back down to zero after the key is released.
                release: 0.1
                // The release needs to be shorter so the end of each note
                // doesn't overlap with the start of the next one.
            },
            // Sets the overall volume of the synthesizer in decibels (dB)
            volume: -6 // -6 dB to match the gain of 0.5
        }
    ).toDestination();

    // Play a harmonized scale with a nice major chord at the end.
    // Set simultaneous notes in an array to play their at the same time.
    synth.triggerAttackRelease(["A3", "C#4"], 0.9, 0);
    synth.triggerAttackRelease(["B3", "D4"], 0.9, 1);
    synth.triggerAttackRelease(["C#4", "E4"], 0.9, 2);
    synth.triggerAttackRelease(["D4", "F#4"], 0.9, 3);
    synth.triggerAttackRelease(["E4", "G#4"], 0.9, 4);
    synth.triggerAttackRelease(["F#4", "A4"], 0.9, 5);
    synth.triggerAttackRelease(["G#4", "B4"], 0.9, 6);
    synth.triggerAttackRelease(["E4", "A4", "C#5"], 1.9, 7);
    // by default, playing a maximum of 32 notes with a polysynth
});
