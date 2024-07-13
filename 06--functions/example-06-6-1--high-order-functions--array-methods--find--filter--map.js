let shoppingList = ["Milk", "Sugar", "Bananas", "Ice Cream"];

/* the find array method */
shoppingList.find(item => item.length > 6);
// 'Bananas'

// item => item.length > 6 is a callback function.
// The method returns "Bananas" rather than "Ice Cream" because "Bananas" comes earlier in the array.

shoppingList.find(item => item[0] === "A");
// undefined

/* the filter array method */
shoppingList.filter(item => item.length > 6);
// ['Bananas', 'Ice Cream']

/* the map array method */
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// more concise
numbers.map(x => x * x * x);
// [1, 8, 27, 64, 125, 216, 343, 512, 729, 1000]

// equivalent, but less concise
let cubes = [];
for (let number of numbers) {
    cubes.push(number * number * number);
}
cubes;
// [1, 8, 27, 64, 125, 216, 343, 512, 729, 1000]

// Extract some properties
let stockList = [
    {name: "Cheese", price: 3},
    {name: "Bread", price: 1},
    {name: "Butter", price: 2},
];
stockList.map(item => item.price);
// [3, 1, 2]
