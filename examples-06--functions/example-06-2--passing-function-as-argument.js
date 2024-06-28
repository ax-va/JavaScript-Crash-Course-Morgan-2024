function sayHi() {
    console.log("Hi!");
}

// Wait 2000 milliseconds before calling the function
setTimeout(sayHi, 2000);
// 4
/*
4 is a timeout ID that is a unique identifier to cancel the delayed function call if desired.
To cancel a function call delayed with setTimeout,
call the clearTimeout function, passing the timeout ID as an argument.
*/
// Hi!

sayHi;
// ƒ sayHi() {
//     console.log("Hi!");
// }