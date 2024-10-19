// the first element to match the selector
let mainHeading = document.querySelector("#main-heading");

mainHeading.addEventListener("click", () => {
    console.log("You clicked the main-heading element!");
});
// The types of event to respond are, for example, "click" (for mouse clicks),
// "keydown" (for keyboard keypresses), or "scroll" (for window scrolling).
// The callback (function) is an event handler that will be called anytime the
// event happens on the DOM element addEventListener was called on.