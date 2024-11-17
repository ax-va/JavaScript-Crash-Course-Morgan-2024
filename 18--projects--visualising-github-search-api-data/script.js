const width = 600;
const height = 400;

let margin = {top: 20, right: 10, bottom: 20, left: 50};

let svg = d3
    .select("body")
    // The sidebar appears to the right of the graph,
    // as the `svg` element appears before the sidebar in the flex container.
    .insert("svg", "#sidebar") // instead of `.append("svg")`
    .attr("width", width)
    .attr("height", height);

// Add a bottom axis container
let bottomContainer = svg
    .append("g")
    .attr("id", "bottom")
    .attr("transform", `translate(0, ${height - margin.bottom})`);

// Add a left axis container
let leftContainer = svg
    .append("g")
    .attr("id", "left")
    .attr("transform", `translate(${margin.left}, 0)`);

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

function update(items) {
    ///////////////
    // Draw axis //
    ///////////////
    let xScale = d3.scaleBand()
        .domain(items.map(d => d.full_name))
        .range([margin.left, width - margin.right])
        .padding(0.3);

    let yScale = d3.scaleLinear()
        .domain([0, d3.max(items, d => d.stargazers_count)])
        .range([height - margin.bottom, margin.top])
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
    bottomContainer.call(bottomAxis);
    leftContainer.call(leftAxis);

    ///////////////
    // Draw bars //
    ///////////////
    svg
        .selectAll("rect")
        // Use `full_name` in the key function for unique identifiers
        .data(items, d => d.full_name)
        .join("rect")
        .attr("x", d => xScale(d.full_name))
        .attr("y", d => yScale(d.stargazers_count))
        .attr("width", xScale.bandwidth())
        // Each bar is drawn from its top-left corner,
        // and that the heights are calculated
        // such that the bottoms of all the bars align.
        .attr("height", d => yScale(0) - yScale(d.stargazers_count))
        .on("mouseover", (e, d) => {
            let info = d3.select("#info");
            info
                .select(".repo .value a")
                .text(d.full_name)
                .attr("href", d.xhtml_url);
            info.select(".license .value").text(getLicense(d));
            info.select(".stars .value").text(d.stargazers_count);
        });
}

function getUrl() {
/*
Converts unencoded query string parameters
to a properly formatted and encoded URL.
 */
    let baseUrl = "https://api.github.com/search/repositories";
    let params = {
        q: "language:javascript stars:>25000",
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
    update(data.items);
});