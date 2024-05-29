let trilogies = [
    {
        title: "His Dark Materials",
        author: "Philip Pullman",
        books: ["Northern Lights", "The Subtle Knife", "The Amber Spyglass"],
    },
    {
        title: "Broken Earth",
        author: "N. K. Jemisin",
        books: ["The Fifth Season", "The Obelisk Gate", "The Stone Sky"],
    },
];

trilogies[1].books[0];
// 'The Fifth Season'

// Explore the nested array with the Chrome console
let nested = {
    name: "Outer",
    content: {
        name: "Middle",
        content: {
            name: "Inner",
            content: "Whoa…"
        }
    }
};

// The [[Prototype]] properties refer to the Object constructor.
