/*
Create a bar graph that visualizes the frequency of characters in a text box.
The bar graph will update as new text is typed or pasted into the box.
 */

// Set the width and height of the svg element
// that will be added to the DOM below.
const width = 600;
const height = 600;

// Add an svg element to the page
let svg = d3
    .select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

function update(data) {
    /*
    Creates / updates a horizontally oriented bar chart
     */
    svg
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("width", (d, i) => d.count * 5)
        .attr("height", 10)
        .attr("x", 20)
        .attr("y", (d, i) => i * 20);
}

d3.select("textarea")
    // The "input" event is triggered anytime the content of the text area changes
    .on("input", (e) => {
        // object for keeping track of the character frequencies
        let frequencies = {};
        // Split the text in individual characters and iterate trough them
        e.target.value.split("").forEach((char) => {
            let currentCount = frequencies[char] || 0; // 0 by default
            frequencies[char] = currentCount + 1;
        });
        // Make from the frequencies object like
        // {"h": 1, "e": 1, "l": 2, "o": 1}
        // an array of objects like
        // [
        //     {"char": "e", "count": 1},
        //     {"char": "h", "count": 1},
        //     {"char": "l", "count": 2},
        //     {"char": "o", "count": 1}
        // ]
        let data = Object.entries(frequencies).map((pair) => {
            return {char: pair[0], count: pair[1]};
        });
        // Sort the array of objects into ascending alphabetical order
        // based on the `char` property of each object
        // by applying a comparison function to every pair of elements `a` and `b`.
        data.sort((a, b) => d3.ascending(a.char, b.char));
        // See in the console that everything is working as expected
        console.log(data);
        // Create / update a horizontally oriented bar chart
        update(data);
});