let numbers = [3, 2, 1];

function update(data) {
    d3
        .select("svg")
        // The next line is needed, even though the first time
        // this is called there are no `circle` elements to select.
        .selectAll("circle")
        // Binds the array of numbers to the selection of circles, one by one.
        // A *key function* helps change the default *join-by-index* mode that assumes
        // that every index in the array will always map to the same index in the selection.
        // The `d => d` key function sets that given a datum, the datum itself is the unique identifier.
        // Another better example would be `d => d.employeeId`.
        .data(data, d => d)
        // Add or remove elements:
        // if there aren't enough circle elements in the `svg` element
        // for all the items in `data`, then D3 should add more
        // or conversely, if there are too many, D3 should remove some.
        .join(
            // Add a new element:
            // `enter` is a selection of temporary placeholders for each of the entering elements.
            enter => enter
                .append("circle")
                // Set positions immediately because they are *before* the transition
                .attr("cx", (d, i) => (i + 1) * 50)
                .attr("cy", 50)
                // Set color to black immediately
                .attr("fill", "black")
                // Then animate the radius from zero (the default value)
                // to the value calculated from the datum.
                .transition()
                .duration(500) // ms
                // The radius increase will be animated because it is *after* the transition
                .attr("r", (d, i) => d * 5)
                // Animate the color change to hotpink
                .attr("fill", "hotpink"),
                // -> Any new circle will appear in the right position immediately, and
                // the change in size (from zero to the desired radius) will animate.
            // Modify an existing element:
            // `update` is a selection containing all the existing elements that are already bound to a datum.
            update => update
                .transition()
                .duration(500)
                // Animate only the `cx` attribute to move the circle to the right
                .attr("cx", (d, i) => (i + 1) * 50),
            // Remove an existing element:
            // `exit` is a selection containing all the elements that should be removed.
            exit => exit
                .transition()
                .duration(500)
                // Animate the circle radius back to zero before removing it
                .attr("r", 0)
                // Remove the element after waiting for animation
                .remove()
        )
}

update(numbers);

function getRandomNumber() {
    // `Math.random()` returns a number in the range [0, 1)
    return 1 + Math.random() * 3;
}

d3.select("#append").on("click", () => {
    // Push a random number onto the end of the numbers array
    numbers.push(getRandomNumber());
    update(numbers);
});

d3.select("#prepend").on("click", () => {
    // Place a random number onto the front of the numbers array
    numbers.unshift(getRandomNumber());
    update(numbers);
});

d3.select("#drop").on("click", () => {
    // Pop the last number from the array
    numbers.pop();
    update(numbers);
});