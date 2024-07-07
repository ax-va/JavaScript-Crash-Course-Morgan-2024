// Open the previous page in Chrome and run in the Chrome console
document.title;
// Hello, World!'

document.title = "Hello, JavaScript!";
// 'Hello, JavaScript!'

// That is just a change to the DOM, the browser’s model of the web page,
// not the underlying HTML file itself that disappear by refreshing.

let heading = document.getElementById("main-heading");
// undefined

// Browsers will usually return the first element with that ID

heading;
// <h1 id="main-heading">Hello!</h1>

// That is not text, but a text representation of HTMLElement

heading.innerText;
// 'Hello!'

heading.innerText = "Hi there...";
// 'Hi there...'