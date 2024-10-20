/*
A *bar* commonly consists of 4 *beats* (also known also *quarter notes*).

*8th notes* are half the duration of a quarter note, and
*16th notes* are half the duration of an 8th note,
so there are four 16th notes per quarter note.

In Tone.js, *beats per minute* (BPM) = 120, i.e. a beat every 0.5 seconds,
and the "<current_bar>:<current_beat_within_bar>:<16th_note_within_beat>" notation is used.
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

    // Create a simple synth with default settings
    let synth = new Tone.Synth().toDestination();

    /*

    let loop = new Tone.Loop(
        // function to repeat filling `time` in with the appropriate location on the transport
        (time) => {
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

    Tone.Transport.start();
});
