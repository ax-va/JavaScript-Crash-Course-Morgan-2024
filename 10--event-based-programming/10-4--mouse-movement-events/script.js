// the first element to match the selector
let mainHeading = document.querySelector("#main-heading");

mainHeading.addEventListener("click", () => {
    console.log("You clicked the main-heading element!");
});
// The types of event to respond are, for example, "click" (for mouse clicks),
// "keydown" (for keyboard keypresses), or "scroll" (for window scrolling).
// The callback (function) is an event handler that will be called anytime the
// event happens on the DOM element addEventListener was called on.

document
    .querySelector("html")
    .addEventListener("mousemove",(e) => {
    // Log the x- and y-coordinates of the mouse
        // relative to the browser window.
        // The coordinates start at 0 in the top-left corner of the browser window.
    console.log(`x: ${e.clientX}, y: ${e.clientY}`);
    // The mousemove events aren't triggered continuously,
        // but some limited number of times per second.
});

// Move the hot pink box with the mouse
let box = document.querySelector("#box");

document
    .querySelector("html")
    .addEventListener("mousemove", (e) => {
        box.style.left = e.clientX + "px";
        box.style.top = e.clientY + "px";
});

