/* An analog of the array in JavaScript is the list in Python. */

let primes = [2, 3, 5, 7, 11, 13, 17, 19];
primes;
// ► (8) [2, 3, 5, 7, 11, 13, 17, 19]

primes[0];
// 2

primes[7];
// 7

primes[8];
// undefined

primes.length;
// 8

primes[primes.length - 1]; // in Python: primes[-1]
// 19

primes[0] = 0;
// 0

primes[0];
// 0

primes[8] = 23; // in Python: exception; in order to append in Python: primes.append(8)
// 23

primes;
// ► (9) [0, 3, 5, 7, 11, 13, 17, 19, 23]

// multidimensional arrays
let ticTacToe = [["", "", ""],
                 ["", "", ""],
                 ["", "", ""]];
ticTacToe;
// ▼ (3) [Array(3), Array(3), Array(3)]
//    ► 0: (3) ['', '', '']
//    ► 1: (3) ['', '', '']
//    ► 2: (3) ['', '', '']
//      length: 3
//    ► [[Prototype]]: Array(0)

ticTacToe[0][2] = "X";
// 'X'
ticTacToe;
// ▼ (3) [Array(3), Array(3), Array(3)]
//   ► 0: (3) ['', '', 'X']
//   ► 1: (3) ['', '', '']
//   ► 2: (3) ['', '', '']
//     length: 3
//   ► [[Prototype]]: Array(0)

ticTacToe[2][0] = "O";
// 'O'
ticTacToe;
// ▼ (3) [Array(3), Array(3), Array(3)]
//   ► 0: (3) ['', '', 'X']
//   ► 1: (3) ['', '', '']
//   ► 2: (3) ['O', '', '']
//     length: 3
//   ► [[Prototype]]: Array(0)
