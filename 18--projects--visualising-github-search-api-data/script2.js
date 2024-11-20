/*
This script is with an OOP part.
 */

let hiddenLicenses = new Set();

function getLicense(d) {
    // The *optional chaining operator* (`?`) returns `undefined`
    // if the object to the left of the operator is `null` or `undefined`.
    let license = d.license?.name;
    if (!license) {
        return "N/A";
    } else {
        return license;
    }
}

class Chart {
    constructor(items) {
        this.items = items;
        this.width = 600;
        this.height = 400;
        this.margin = {top: 20, right: 10, bottom: 20, left: 50};

        this.svg = d3
            .select("body")
            // The sidebar appears to the right of the graph,
            // as the `svg` element appears before the sidebar in the flex container.
            .insert("svg", "#sidebar") // instead of `.append("svg")`
            .attr("width", this.width)
            .attr("height", this.height);

        // Add a bottom axis container
        this.bottomContainer = this.svg
            .append("g")
            .attr("id", "bottom")
            .attr("transform", `translate(0, ${this.height - this.margin.bottom})`);

        // Add a left axis container
        this.leftContainer = this.svg
            .append("g")
            .attr("id", "left")
            .attr("transform", `translate(${this.margin.left}, 0)`);

        // Add a label to the left axis
        let chartHeight = (this.height - this.margin.bottom) - this.margin.top;
        let midPoint = this.margin.top + chartHeight / 2;
        this.svg
            .append("text")
            .text("Stars")
            .style("font-size", "14px")
            // Center the text label around its calculated position
            .attr("text-anchor", "middle")
            // 1. Translate the center of the label to the position.
            // 2. Rotate it on 90 degrees counterclockwise (or 270 degrees clockwise).
            .attr("transform", `translate(12, ${midPoint}) rotate(270)`);

        // Collect all the *unique* license names passing the names to the `Set` constructor.
        // In JavaScript, sets maintain their order, like arrays.
        this.licenses = new Set(this.items.map(d => getLicense(d)));
        this.colorScale = d3
            .scaleOrdinal()
            .domain(this.licenses)
            // Use an array of 10 hex color strings:
            // ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf']
            // If there are more than 10 licenses, the colors wrap around to the beginning again
            // (the eleventh and twelfth licenses will use the same colors as the first and second ones).
            .range(d3.schemeCategory10);
    }

    update() {
        // filtered items without the hidden licenses
        let filteredItems = this.items.filter(d => !hiddenLicenses.has(getLicense(d)));
        ///////////////
        // Draw axis //
        ///////////////
        let xScale = d3.scaleBand()
            .domain(filteredItems.map(d => d.full_name)) // instead of `.domain(this.items.map(d => d.full_name))`
            .range([this.margin.left, this.width - this.margin.right])
            .padding(0.3);

        let yScale = d3.scaleLinear()
            .domain([0, d3.max(filteredItems, d => d.stargazers_count)]) // instead of `.domain([0, d3.max(this.items, d => d.stargazers_count)])`
            .range([this.height - this.margin.bottom, this.margin.top])
            // Round the top of the scale to the next tick value
            .nice();

        // Create axis generators
        let bottomAxis = d3
            .axisBottom(xScale)
            // Remove the ticks from the bottom axis
            // by setting the tick values to be an empty list.
            .tickValues([]);
        let leftAxis = d3
            .axisLeft(yScale)
            // Use a format specifier to render the numbers
            // with the "k" and "M" shorthands
            // like 200,000 as 200k and 1,000,000 as 1M.
            .tickFormat(d3.format("~s"));
        // Use the generators to draw the axes to the containers
        this.bottomContainer.call(bottomAxis);
        this.leftContainer.call(leftAxis);

        ///////////////////////////
        // Draw bars and infobox //
        ///////////////////////////
        this.svg
            .selectAll("rect")
            // Use `full_name` in the key function for unique identifiers
            .data(filteredItems, d => d.full_name) // instead of `.data(items, d => d.full_name)`
            .join("rect")
            .attr("x", d => xScale(d.full_name))
            .attr("y", d => yScale(d.stargazers_count))
            .attr("fill", d => this.colorScale(getLicense(d)))
            .attr("width", xScale.bandwidth())
            // Each bar is drawn from its top-left corner,
            // and that the heights are calculated
            // such that the bottoms of all the bars align.
            .attr("height", d => yScale(0) - yScale(d.stargazers_count))
            // Add information into infobox
            .on("mouseover", (e, d) => {
                let info = d3.select("#info");
                info.select(".repo .value a")
                    .text(d.full_name)
                    .attr("href", d.html_url);
                info.select(".license .value")
                    .text(getLicense(d));
                info.select(".stars .value")
                    .text(d.stargazers_count);
            });
    }

    legend() {
        // Add a legend for licenses with colors and checkboxes
        d3.select("#legend-colors")
                .selectAll("p")
                .data(this.licenses)
                .join(
                    enter => {
                        let p = enter.append("p");
                        // Add checkboxes to filter licenses
                        p.append("input")
                            .attr("type", "checkbox")
                            // Notice:
                            // `.attr("checked", true)`
                            // sets an *initial state* of a checkbox in the DOM.
                            // After the checkbox is rendered, user interactions
                            // modify the property, not the attribute.
                            // Therefore we set the property.
                            .property("checked", d => !hiddenLicenses.has(d))
                            .attr("title", "Include in chart");
                        // Add colored squares
                        p.append("div")
                            .attr("class", "color")
                            .style("background-color", d => this.colorScale(d));
                        // Add license names
                        p.append("span")
                            .text(d => d)
                        return p;
                    }
                );

        // Handle the checkbox change
        d3.selectAll("#legend-colors input").on("change", (e, d) => {
            // `d` is item of `licenses` because `input`
            // is a child of `p` and is bound to the same data.
            if (e.target.checked) {
                hiddenLicenses.delete(d);
            } else {
                hiddenLicenses.add(d);
            }
            // console.log(hiddenLicenses);
            // Call `update` itself if a checkbox is clicked
            this.update();
        });
    }
}

function getUrl() {
/*
Converts unencoded query string parameters
to a properly formatted and encoded URL.
 */
    let baseUrl = "https://api.github.com/search/repositories";
    let params = {
        q: "language:rust stars:>25000",
        per_page: 20,
        sort: "stars"
    };
    let queryString = Object.entries(params)
        .map(pair => {
            return `${pair[0]}=${encodeURIComponent(pair[1])}`;
        })
        .join("&");
    return `${baseUrl}?${queryString}`;
}

let url = getUrl();

/*
console.log(url);
// https://api.github.com/search/repositories?q=language%3Ajavascript%20stars%3A%3E10000&per_page=20&sort=stars
// ---
// where a query starts with a question mark (`?`),
// key-value pairs use an equal sign (`=`) to separate a key and value,
// and are separated themselves by an ampersand (`&`),
// and the URL encoding is used like `%3A` for a colon (`:`),
// `%3E` for a greater-than sign (`>`), and `%20` for a space.
// ---
// Check in the browser if the URL returns a JSON data.
*/

/*
// The `d3.json` method returns a `Promise` because fetching data from an API takes a time.
// The `then` method takes a function that will be called when the data is ready.
d3.json(url).then(data => {
    // `data` is already converted into a JavaScript object.
    console.log(data);
});
// Fields used in this code:
// `object.items[i].full_name`: '<the name of the repository owner>/<the name of the repository>'
// `object.items[i].stargazers_count`: the number of times the repository has been starred by users
// `object.items[i].html_url`: the repository's URL on GitHub
// `object.items[i].license`: software license
*/

d3.json(url).then(data => {
    let chart = new Chart(data.items);
    chart.update();
    chart.legend(); });