let numbers = [3, 2, 1, 2, 3];

d3
    .select("svg")
    // The next line is needed, even though the first time
    // this is called there are no `circle` elements to select.
    .selectAll("circle")
    // Binds the array of numbers to the selection of circles, one by one
    .data(numbers)
    // Add or remove elements:
    // if there aren't enough circle elements in the `svg` element
    // for all the items in `data`, then D3 should add more
    // or conversely, if there are too many, D3 should remove some.
    .join("circle")
    .attr("cx", (d, i) => (i + 1) * 50)
    .attr("cy", 50)
    .attr("r", (d, i) => d * 5);
