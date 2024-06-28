/* An analog of the object in JavaScript is the dictionary in Python. */

let casablanca = {
    "title": "Casablanca",
    "released": 1942,
    "director": "Michael Curtiz",
};
casablanca;
// title: 'Casablanca', released: 1942, director: 'Michael Curtiz'}

// The valid identifiers as keys here are key1, key_2, key$3. The other keys are in quotes.
let obj = { key1: 1, key_2: 2, key$3: 3, "key 4": 4, "key#5": 5 };
// {key1: 1, key_2: 2, key$3: 3, key 4: 4, key#5: 5}

obj[key1];
// exception: Uncaught ReferenceError: key1 is not defined

obj["key1"];
// 1

obj["key 4"];
// 4

obj["key 3"];
// undefined

// Dot notation for valid identifiers: we say that key_2 is a property instead of a key
obj.key_2; // but not in Python: obj.key_2 is valid only if key_2 is an attribute of obj
// 2

obj."key 4";
// exception: Uncaught SyntaxError: Unexpected string

obj.length;
// undefined

// Create an empty object
let dictionary = {};
// Set keys and values (or properties)
dictionary.mouse = "A small rodent";
// 'A small rodent'
dictionary["computer mouse"] = "A pointing device for computers";
// 'A pointing device for computers'
dictionary;
// {mouse: 'A small rodent', computer mouse: 'A pointing device for computers'}

// Change a value
dictionary.mouse = "A furry rodent";
// 'A furry rodent'
dictionary;
// {mouse: 'A furry rodent', computer mouse: 'A pointing device for computers'}

