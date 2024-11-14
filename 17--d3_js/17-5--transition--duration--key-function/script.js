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
        .join("circle")
        .transition()
        .duration(500) // ms
        .attr("cx", (d, i) => (i + 1) * 50)
        .attr("cy", 50)
        .attr("r", (d, i) => d * 5);
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