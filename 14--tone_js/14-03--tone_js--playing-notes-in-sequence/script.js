let playButton = document.querySelector("#play");
let playingParagraph = document.querySelector("#playing");

// Hide the Play button and show the "Playing" text when the user clicks the button
playButton.addEventListener("click", () => {
    // Hide this button
    playButton.style = "display:none";
    playingParagraph.style = "";

    // Trigger the Tone.js library to start inside the click handler
    Tone.start();

    // monophonic synth
    let synth = new Tone.Synth({
        // Use the square oscillator
        oscillator: {type: "square"},
        envelope: {
            // 1. The *attack* is the amount of time between the note being triggered
            // (for example, when you press a key on a synthesizer) and the note reaching its maximum volume.
            attack: 0.1,
            // 2. The *decay* is the amount of time between the end of the attack and the sustain portion of the note.
            decay: 0.3,
            // 3. The *sustain* is a gain value that defines the volume the note will remain
            // at after the attack and decay, for as long as the key is held down.
            sustain: 0.8,
            // 4. The *release* defines how long it will take for the note's amplitude
            // to get back down to zero after the key is released.
            release: 0.1
            // The release needs to be shorter so the end of each note doesn't overlap with the start of the next one.
        },
        // Sets the overall volume of the synthesizer in decibels (dB)
        volume: -6 // -6 dB to match the gain of 0.5
    }).toDestination();

    // Play notes A3, B3, C♯4, D4, E4, F♯4, G♯4, A4 (that are a single octave of an A major scale).
    // For example, C♯4, or D♭4, (with the *sharp* and *flat* symbols) is a black note (on the piano keys)
    // (known as an *accidental*) and is a semitone higher than C4 and a semitone lower than D4.
    // In Tone.js, "#" is used for "♯" and "b" for "♭".
    synth.triggerAttackRelease("A3", 0.9, 0); // duration of 0.9 sec without release
    synth.triggerAttackRelease("B3", 0.9, 1); // delay of 1 sec = 0.9 sec + release of 0.1 sec
    synth.triggerAttackRelease("C#4", 0.9, 2);
    synth.triggerAttackRelease("D4", 0.9, 3);
    synth.triggerAttackRelease("E4", 0.9, 4);
    synth.triggerAttackRelease("F#4", 0.9, 5);
    synth.triggerAttackRelease("G#4", 0.9, 6);
    synth.triggerAttackRelease("A4", 0.9, 7);
});
