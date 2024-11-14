/*
Short explanation of music representation:

A *bar* commonly consists of 4 *beats* (also known also *quarter notes*).

*8th notes* are half the duration of a quarter note, and
*16th notes* are half the duration of an 8th note,
so there are four 16th notes per quarter note.

In Tone.js, *beats per minute* (BPM) = 120, i.e. a beat every 0.5 seconds,
and the "<current_bar>:<current_beat_within_bar>:<16th_note_within_beat>" notation is used.

Consider in this example a transport helper: `Tone.Part`.
It helps specify the exact timing of every note played.
Unlike with `Tone.Loop` and `Tone.Sequence`, the notes don't have
to be played at equal time intervals.
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

    // Use a polyphonic synth to play multiple notes at the same time
    let synth = new Tone.PolySynth(Tone.Synth).toDestination();

    new Tone.Part((time, note) => {
            synth.triggerAttackRelease(note, "16n", time);
        },
        // array of time-note pairs
        [
            ["0:0:0", ["C3", "E4"]],  // to play two notes at once
            ["0:0:3", "D4"],
            ["0:1:0", "C4"],
            ["0:1:2", "D4"],
            ["0:2:0", ["E3", "E4"]],
            ["0:2:2", "E4"],
            ["0:3:0", "E4"],
            ["1:0:0", ["G3", "D4"]],
            ["1:0:2", "D4"],
            ["1:1:0", "D4"],
            ["1:2:0", ["E3", "E4"]],
            ["1:2:2", "G4"],
            ["1:3:0", "G4"],
            ["2:0:0", ["C3", "E4"]],
            ["2:0:3", "D4"],
            ["2:1:0", "C4"],
            ["2:1:2", "D4"],
            ["2:2:0", ["E3", "E4"]],
            ["2:2:2", "E4"],
            ["2:3:0", "E4"],
        ]
    // Play immediately
    ).start("0:0:0");
    // -> "Mary Had a Little Lamb"
});
