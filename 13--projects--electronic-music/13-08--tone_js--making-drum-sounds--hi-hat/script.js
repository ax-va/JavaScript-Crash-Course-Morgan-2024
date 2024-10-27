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
});
