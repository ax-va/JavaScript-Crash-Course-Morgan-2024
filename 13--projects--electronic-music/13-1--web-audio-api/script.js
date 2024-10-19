let playButton = document.querySelector("#play");
let playingParagraph = document.querySelector("#playing");

// Hide the Play button and show the "Playing" text when the user clicks the button
playButton.addEventListener("click", () => {
    // Hide this button
    playButton.style = "display:none";
    playingParagraph.style = "";

    // Create the audio context to interact with the Web Audio API through it
    let audioCtx = new AudioContext();

    // Create the first node, an *oscillator*, that creates a signal, as default, a sine wave
    let oscNode = audioCtx.createOscillator();
    // One cycle of the wave lasts 1/440 of a second, or 2.27 ms
    // that is the standard reference pitch for tuning musical instruments.
    // The frequency corresponds to the note A above middle C.
    oscNode.frequency.value = 440; // Hz

    // In signal processing, *gain* refers to an increase or decrease in a signal's amplitude
    let gainNode = audioCtx.createGain();
    // Change the sine maximum and minimum values of 1 and -1 to ones of 0.5 and -0.5, respectively,
    // making the sound softer
    gainNode.gain.value = 0.5;

    // Connect the output of the oscillator node to the input of the gain node
    oscNode.connect(gainNode);
    // Connect the output of the gain node to the main output
    gainNode.connect(audioCtx.destination);
    // oscillator with frequency of 440 Hz -> gain of 0.5 -> output

    // Start signal playing immediately
    oscNode.start(audioCtx.currentTime);
    // Stop signal playing five seconds after it started
    oscNode.stop(audioCtx.currentTime + 5);
});

