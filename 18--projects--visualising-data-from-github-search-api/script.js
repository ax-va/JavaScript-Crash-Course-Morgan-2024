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

/*
let url = getUrl();
console.log(url);
// https://api.github.com/search/repositories?q=language%3Ajavascript%20stars%3A%3E10000&per_page=20&sort=stars
// ---
// where a query starts with a question mark (`?`),
// key-value pairs use an equal sign (`=`) to separate a key and value,
// and are separated themselves by an ampersand (`&`),
// and the URL encoding is used like `%3A` for a colon (`:`),
// `%3E` for a greater-than sign (`>`), and `%20` for a space.
// ---
// Check in the browser the URL returns JSON data.
*/

let url = getUrl();
    // The `d3.json` method returns a `Promise` because fetching data from an API takes a time.
    // The `then` method takes a function that will be called when the data is ready.
    d3.json(url).then(data => {
        // `data` is already converted into a JavaScript object.
        console.log(data);
    });
