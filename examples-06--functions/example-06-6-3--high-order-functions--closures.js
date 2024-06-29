function makeAppender(suffix) {
    return function (text) {
        return text + suffix;
    };
}

let exciting = makeAppender("!!!");
exciting("Hello");
// 'Hello!!!'

let puzzling = makeAppender("???");
puzzling("What")
// 'What???'

let winking = makeAppender(" ;-)");
winking("Hi");
// 'Hi ;-)'

winking("Goodbye");
// 'Goodbye ;-)'
