// Find the index of the first matching element only
let sizes = ["Small", "Medium", "Large"];
sizes.indexOf("Medium"); // in Python: sizes.index("Medium")
// 1
sizes.indexOf("Huge"); // in Python: sizes.index("Huge") throws an exception
// -1

let colors = ["Blue", "White", "Blue"];
colors.indexOf("Blue"); // similar in Python: colors.index("Blue") returns 0
// 0

// Join an array into a string
let beatles = ["John", "Paul", "George", "Ringo"];
beatles.join(); // in Python: ",".join(beatles)
// 'John,Paul,George,Ringo'
beatles.join(", "); // in Python: ", ".join(beatles)
// 'John, Paul, George, Ringo'

// join() converses non-string values to strings
[100, true, false, "hi", 3.14].join(" - ");
'100 - true - false - hi - 3.14'
// in Python: " - ".join([100, True, False, "hi", 3.14])
// throws an exception because of non-string elements

// includes()
beatles.includes("Mark"); // in Python: "Mark" in beatles
// false
beatles.includes("John"); // in Python: "John" in beatles
// true

// reverse() is a mutating method, i.e. it changes an array
beatles.reverse(); // similar in Python: beatles.reverse() changes a list, but returns None
// * (4) ['Ringo', 'George', 'Paul', 'John']
// Another better way in Python: beatles[::-1]
beatles;
// * (4) ['Ringo', 'George', 'Paul', 'John']

// sort()
[100, true, false, "hi", 3.14].sort();
// * (5) [100, 3.14, false, 'hi', true]
beatles.sort();
// * (4) ['George', 'John', 'Paul', 'Ringo']
// in Python: beatles.sort() returns None and sort a list
// in Python: sorted(beatles) returns the sorted list and does not change the original list

// splice() removes elements from an array and returns removed elements
beatles.splice(0, 2);
// * (2) ['George', 'John']
beatles;
// * (2) ['Paul', 'Ringo']
