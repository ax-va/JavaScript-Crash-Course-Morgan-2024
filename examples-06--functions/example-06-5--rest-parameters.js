/*
A rest parameter always has to be the last parameter listed in the function definition.
 */

let myColors = (name, ...favoriteColors) => {
    let colorString = favoriteColors.join(", ");
    console.log(`My name is ${name} and my favorite colors are ${colorString}.`);
};

myColors("Alex", "blue", "green", "orange");
// My name is Alex and my favorite colors are blue, green, orange.

function sum(...numbers) {
    let total = 0;
    for (let number of numbers) {
        total += number;
    }
    return total;
}

sum(1, 2, 3, 4, 5);
// 15

sum(6, 7, 8, 9, 10, 11, 12, 13);
// 76
