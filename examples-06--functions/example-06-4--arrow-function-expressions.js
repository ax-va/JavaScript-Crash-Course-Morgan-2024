/*
Arrow function expression are also referred as arrow functions.
 */

let addArrow = (x, y) => {
    // block body syntax
    return x + y;
};

addArrow(1, 2)
// 3

// concise body syntax
let addArrowConcise = (x, y) => x + y;

// The parentheses can be omitted for one parameter
let squared = x => x * x;

squared(3);
// 9

// Repeatedly call the provided function, waiting the
// specified amount of time between each call
setInterval(() => {
    console.log("Beep");
}, 1000);
// 5
// Beep

// Beep is repeating infinitely many times

// Stop setInterval
clearInterval(5);
