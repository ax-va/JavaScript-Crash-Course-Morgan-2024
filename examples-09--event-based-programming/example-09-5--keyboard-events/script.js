document
    .querySelector("html")
    .addEventListener("keydown", (e)=> {
        console.log(e);
    });
// * KeyboardEvent {isTrusted: true, key: 'a', code: 'KeyA', location: 0, ctrlKey: false,...}

// Move the hot pink box by keys
let box = document.querySelector("#box");
let currentX = 0;
let currentY = 0;

box.style.left = currentX + "px";
box.style.top = currentY + "px";

document
    .querySelector("html")
    .addEventListener("keydown", (e)=> {
        if (e.key === "w") {
            currentY -= 5;
        } else if (e.key === "a") {
            currentX -= 5;
        } else if (e.key === "s") {
            currentY += 5;
        } else if (e.key === "d") {
            currentX += 5;
        }
        box.style.left = currentX + "px";
        box.style.top = currentY + "px";
    });
// Notice that holding the key down results in the box continuing to move,
// as the keyboard sends repeated keydown events.

