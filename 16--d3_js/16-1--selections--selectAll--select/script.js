/*
Demonstrate manipulating the DOM through D3's `selectAll()`, `select()`, and `insert()`.
 */

// Select all the SVG circles by a CSS selector (`circle`) and set the "fill" attribute
// of every element in the selection to "hotpink" to change their colors.
d3.selectAll("circle").attr("fill", "hotpink");

d3.selectAll("circle")
    .attr("fill", "hotpink") // `.attr` returns the selection itself.
    // Make the radius of each circle greater than the previous one.
    .attr("r", (d, i) => 10 + i * 5); // `d` for datum, `i` for index of the element in the selection, starting from 0

// First select the `body` element
d3.select("body")
    // Then insert the `h1` element before the `svg` element
    .insert("h1", "svg")
    // Add the text content to the inserted element in that selection
    .text("Hello, D3!");
