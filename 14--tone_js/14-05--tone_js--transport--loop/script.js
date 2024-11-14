/*
Short explanation of music representation:

A *bar* commonly consists of 4 *beats* (also known also *quarter notes*).

*8th notes* are half the duration of a quarter note, and
*16th notes* are half the duration of an 8th note,
so there are four 16th notes per quarter note.

In Tone.js, *beats per minute* (BPM) = 120, i.e. a beat every 0.5 seconds,
and the "<current_bar>:<current_beat_within_bar>:<16th_note_within_beat>" notation is used.

Consider in this example a transport helper: `Tone.Loop`.
It helps define musical loops, including when they start and when they finish.
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

    // Create a simple synth with default settings
    let synth = new Tone.Synth().toDestination();

    /*

    let loop = new Tone.Loop(
        // The Web Audio API's clock is not the same as the JavaScript clock and is preciser.
        // See also: https://web.dev/audio-scheduling/
        (time) => { // function to repeat filling `time` in with the appropriate location on the transport
            // Play the note C4 with a 16th note duration
            synth.triggerAttackRelease("C4", "16n", time);
        },
        "4n" // "4n" = quarter note, or beat (= "1/4 note") -> The loop will repeat every beat.
    );

    // Play 4 bars with 4 beats each, totally 16 notes, like this
    // "*one* two three four, *two* two three four, *three* two three four, *four* two three four".
    loop.start("0:0:0");
    loop.stop("4:0:0"); // The end of the loop isn'`t inclusive. -> It will not be played.

    */

    // same but chained
    new Tone.Loop((time) => {
        synth.triggerAttackRelease("C4", "16n", time);
    }, "4n").start("0:0:0").stop("4:0:0");

    // Play a new random note each time:
    // by randomly playing notes from a pentatonic, or five-note, scale.
    let synth2 = new Tone.PolySynth( // to play multiple notes at once
        Tone.Synth,
        {
            oscillator: { type: "triangle" },
            volume: -9 // dB
        }
    ).toDestination();

    // octaves of a C major pentatonic scale, including the C from the next octave
    let notes = ["C4", "D4", "E4", "G4", "A4", "C5"];

    new Tone.Loop((time) => { // callback
        // Run three times in the loop
        for (let i = 0; i < 3; i++) {
            // Determine whether to play a note or not
            if (Math.random() < 0.5) {
                // `Math.floor()` rounds a number down to the nearest integer.
                // `Math.random()` generates a random floating-point number between 0 (inclusive) and 1 (exclusive).
                let note = notes[Math.floor(Math.random() * notes.length)];
                synth2.triggerAttackRelease(note, "32n", time);
            }
        }
    // The Tone.Loop object calls this code every eighth note ("8n") for eight bars ("4:0:0" to "12:0:0")
    }, "8n").start("4:0:0").stop("12:0:0");
    // Every eighth note, up to three notes from the array, will be played
    // (there's no guarantee of uniqueness, so the same note could be played two or
    // three times at once, causing that note to be louder).
});
