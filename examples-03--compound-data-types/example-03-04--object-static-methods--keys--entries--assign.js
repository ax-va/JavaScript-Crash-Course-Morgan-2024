// Get array of all keys of object
let cats = { "Kiki": "black and white", "Mei": "tabby", "Moona": "gray" };
Object.keys(cats);
// * (3) ['Kiki', 'Mei', 'Moona']

// in Python: cats.keys()

// The object can have a property named "keys".
// That's why cats.keys() is not used.
let piano = {
    make: "Steinway",
    color: "black",
    keys: 88,
};
piano.keys;
// 88

// Get keys and values
let chromosomes = {
    koala: 16,
    snail: 24,
    giraffe: 30,
    cat: 38,
};
Object.entries(chromosomes);
// * (4) [Array(2), Array(2), Array(2), Array(2)]
//   * 0: (2) ['koala', 16]
//   * 1: (2) ['snail', 24]
//   * 2: (2) ['giraffe', 30]
//   * 3: (2) ['cat', 38]
//     length: 4
//   * [[Prototype]]: Array(0)

// in Python: chromosomes.items()

// Combine objects
let physical = { pages: 208, binding: "Hardcover" };
let contents = { genre: "Fiction", subgenre: "Mystery" };
let book = {};
Object.assign(book, physical, contents);
// {pages: 208, binding: 'Hardcover', genre: 'Fiction', subgenre: 'Mystery'}
book;
// {pages: 208, binding: 'Hardcover', genre: 'Fiction', subgenre: 'Mystery'}

// in Python:
// physical = { "pages": 208, "binding": "Hardcover" }
// contents = { "genre": "Fiction", "subgenre": "Mystery" }
// book = {**physical, **contents}
// # or even better
// book = physical | content
