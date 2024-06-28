// function declaration
function sayHello(name) {
    console.log(`Hello, ${name}!`);
}
// undefined

sayHello("Alex");
// Hello, Alex!
// undefined

sayHello("world");
// Hello, world!
// undefined

/* return values */

function add(x, y) {
    return x + y;
}
// undefined

add(1, 2);
// 3

let sum = add(500, 500);
// undefined

`I walked ${sum} miles`;
// 'I walked 1000 miles'

`I walked ${add(500, 500)} miles`;
// 'I walked 1000 miles'

/* parameter types: dynamically typed */

add("Hello, ", "world!");
// 'Hello, world!'

// type coercion:
// JavaScript converts the Booleans to the numbers 1 and 0 before the addition, producing the number 1
add(true, false);
// 1

// type coercion:
// JavaScript converts both of the operands to strings and concatenates them, producing the string "11"
add(1, '1');
// '11'

/* side effect */

let addCalls = 0;
function add(x, y) {
    addCalls++;
    console.log(`x was ${x} and y was ${y}.`);
    return x + y;
}

let sum = add(Math.PI, Math.E);
// x was 3.141592653589793 and y was 2.718281828459045.
// undefined

sum;
// 5.859874482048838

addCalls;
// 1