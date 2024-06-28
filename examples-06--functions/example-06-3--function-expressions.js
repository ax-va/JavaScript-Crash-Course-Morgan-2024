/*
Function expressions (function literals) without names are also called anonymous functions.
A function expression cannot be written at the start of a line of code.
*/

// Assign the function expression to the addExpression variable
let addFuncExpr = function (x, y) {
    return x + y;
};
// undefined

addFuncExpr(1, 2);
// 3

// named functional expression
let addFuncExprNamed = function add(x, y) {
    return x + y;
};
// We cannot call the function by name, for example, with add(1, 2)
// because its name is not in scope outside of the function body.
// Names of function expressions is used for debugging.

console.log(addFuncExprNamed);
// ƒ add(x, y) {
//     return x + y;
// }

// A more common way is to pass a function expression into a function
setTimeout( function () {
    console.log("Hi!");
}, 2000);
// 4
// Hi!