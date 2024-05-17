// Truthiness:
// - The falsy values include undefined, null, the number 0, and the empty string ("").
// - All nonzero numbers and nonempty strings are truthy.

// The outputs confirm that nonzero numbers and nonempty strings are truthy,
// while the number 0, the empty string, undefined, and null are falsy.

!!0;
// false

!!1;
// true

!!"hi";
// true

!!"";
// false

!!undefined;
// false

!!null;
// false

// && and || with truthy and falsy operands return a decisive operand.

// &&:
// If the first operand is falsy, the first operand is returned.
// If the first operand is truthy, the second operand is returned.

// The || operator works the opposite way:
// If the first operand is falsy, the second operand is returned.
// If the first operand is truthy, the first operand is returned.

2 && 10;
// 10

2 || 10;
// 2

0 && 10;
// 0

0 || 10;
// 10

"" && 10;
// ''

"" || 10;
// 10

"" && null;
// ''

"" || null;
// null

null && "";
// null

null || "";
// ''

// Uses for truthiness

// - The || operator can be used to give a variable a default value if one isn't provided
let name;
givenName = name || "No name provided";
// 'No name provided'

// similar in Python:
// name = None
// given_name = name or "No name provided"
// 'No name provided'

// - Don't evaluate the second operand
1 || alert("Not evaluated");
// 1

let score = 0;
score && alert(`Your score is ${score}!`);
// 0

++score;

score && alert(`Your score is ${score}!`);
// undefined