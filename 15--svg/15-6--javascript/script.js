document.querySelectorAll(".fun").forEach((element) => {
    console.log(element);
    // * circle.fun
    // * rect.fun
    // * path.fun

    // Click one of the elements to move it to the right,
    // and hold down `SHIFT` and click, to move the element to the left.

    // The `data-...` attributes are used to store some data in the DOM.
    // Notice: DOM attributes are always stored as strings.
    element.setAttribute("data-offset", 0);

    element.addEventListener("click", (event) => {
        // Get the attribute value and Cćonvert it from string to number
        let offset = Number(event.target.getAttribute("data-offset"));

        if (event.shiftKey) {
            offset -=5;
        } else {
            offset +=5;
        }

        event.target.setAttribute("data-offset", offset);
        event.target.setAttribute("transform", `translate(${offset}, 0)`);
    })
});

