let numbers = [3, 2, 1];

d3.selectAll("circle")
    // Binds the array of numbers to the selection of circles, one by one
    .data(numbers)
    // Set the radius of each circle to a computed value by using a piece of data, i.e. a datum
    .attr("r", (d, i) => d * 5);

/*
Select an element in Chrome, for example, the first circle and see:
`<circle cx="50" cy="50" r="15"></circle> == $0`.
`$0` is a global variable that points to the currently selected element, the first circle.

Check it in the JavaScript console:
> $0
<circle cx="50" cy="50" r="15"></circle>

Get the datum that is bound to the element
> $0.__data__
3
 */
