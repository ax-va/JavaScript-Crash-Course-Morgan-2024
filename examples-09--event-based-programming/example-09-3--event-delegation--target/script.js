/*
The event delegation lets us attach a single event handler,
rather than using a separate handler for each list item.
 */
let wordList = document.querySelector("#word-list");
let sentence = document.querySelector("#sentence");

wordList.addEventListener("click", (event) => {
    let word = event.target.textContent;
    if (sentence.textContent.length === 0)
        sentence.textContent += " ";
    sentence.textContent += " " + word;
});
