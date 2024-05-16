5 === 5; // in Python: 5 == 5
// true

2 + 3 === 4;
// false

"hello" === "hello";
// true

"hello" === 5;
// false

"hello" !== "goodbye"; // in Python: "hello" != "goodbye"
// true

undefined === null;
// false

0 === false;
// false

1 === true;
// false

// In Python:

// 0 == False
// True

// 1 == True
// True

// but

// 0 is False
// False

// 1 is True
// False

1 < 2; // same in Python: 1 < 2
// true

1 < 2 < 3; // not the same as in Python: 1 < 2 < 3, in Python: True
// true
// in JavaScript
// equivalent to: (1 < 2) < 3
// equivalent to: true < 3
// equivalent to: 1 < 3

-2 < -1 < 0; // not the same as in Python: -2 < -1 < 0, in Python: True
// false
// in JavaScript equivalent to: 1 < 0

3 >= 2; // same in Python: 3 >= 2
// true

"a" < "aa" && "aa" < "ab";
// true

"a" < "aa" < "ab"; // not the same as in Python, in Python: True
// false
