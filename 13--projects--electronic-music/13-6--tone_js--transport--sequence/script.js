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
    Tone.Transport.start();


    // `Tone.Sequence` helps provide a list of note names
    // to be scheduled to play at regular intervals.
    // Those sequence can be repeated many times.

    let synth = new Tone.Synth().toDestination();

    new Tone.Sequence((time, note) => {
        synth.triggerAttackRelease(note, "16n", time);
    }, ["G4", "C4", "C4", "C4"], "4n")
    .start("0:0:0")
    .stop("4:0:0");
    // Each time the callback is called, the next note in this list is passed as the `note` argument.
    // Cycling through the notes in the list continues over and over until it's time to stop.
    // "4n" is used here as the duration between callbacks and
    // means that a new note will be played every quarter note.
    // In practice, `Tone.Sequence` passes `time` as a number of seconds
    // rather than using <bars:quarters:sixteenths> notation.
    // -> We hear 4 bars, with 4 beats per bar, making 16 notes in total
    // that looks for the first six calls of the callback like:
    // ```
    // synth.triggerAttackRelease("G4", "16n", "0:0:0");
    // synth.triggerAttackRelease("C4", "16n", "0:1:0");
    // synth.triggerAttackRelease("C4", "16n", "0:2:0");
    // synth.triggerAttackRelease("C4", "16n", "0:3:0");
    // synth.triggerAttackRelease("G4", "16n", "1:0:0");
    // synth.triggerAttackRelease("C4", "16n", "1:1:0");
    // ```

    // Use some silent gaps (*rests* in musical terms)
    new Tone.Sequence((time, note) => {
        synth.triggerAttackRelease(note, "16n", time);
    }, ["C4", null, "B3", "C4", "G3", "A3", null, "B3"], "8n")
    .start("4:0:0")
    .stop("8:0:0");
    // Changing "4n" to "8n" means the notes will play twice as fast as before
});
