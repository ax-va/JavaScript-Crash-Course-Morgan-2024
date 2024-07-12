/*
Event bubbling = Triggering an event on an element causes triggering the event on all its ancestors.

When an event is triggered on an element, it also gets triggered on all the element's ancestors
(parents, parents of parents, and so on).
If an ancestor has a separate event handler attached to it, it would also receive the event.
An event "bubbles up" through the DOM, from the innermost element to the outermost element.
 */

// the first element to match the selector
let mainHeading = document.querySelector("#main-heading");

mainHeading.addEventListener("click", () => {
    console.log("You clicked the main-heading element!");
});
/*
The types of event to respond are, for example, "click" (for mouse clicks),
"keydown" (for keyboard keypresses), or "scroll" (for window scrolling).
The callback (function) is an event handler that will be called anytime the
event happens on the DOM element addEventListener was called on.
 */

document.querySelector("em").addEventListener("click", () =>
{
    console.log("You clicked the em element!");
});

document.querySelector("body").addEventListener("click", ()=> {
    console.log("You clicked the body element!");
});

/*
Clicking the em element causes the messages:

You clicked the em element!
You clicked the main-heading element!
You clicked the body element!
 */