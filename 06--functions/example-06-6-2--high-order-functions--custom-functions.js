function doubler(callback) {
    callback();
    callback();
}

doubler(() => console.log("Hi there!"));
// Hi there!
// Hi there!

// doubler("hello");
// // Uncaught
// // TypeError: callback is not a function

function callMultipleTimes(times, callback) {
    for (let i = 0; i < times; i++) {
        callback(i);
    }
}
callMultipleTimes(3, time => console.log(`This was time: ${time}`));
// This was time: 0
// This was time: 1
// This was time: 2
