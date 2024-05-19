let languages = [];

// Add a new element and return the length
languages.push("Python"); // in Python, append returns None: languages.append("Python")
// 1
languages.push("JavaScript");
// 2
languages.push("Java");
// 3
languages;
// ▶ (3) ['Python', 'JavaScript', 'Java']

// Add an element to the beginning of the array
languages.unshift("TypeScript"); // in Python: languages.insert(0, "TypeScript") for list or languages.appendleft("TypeScript") for deque
// 4
languages;
// ▶ (4) ['TypeScript', 'Python', 'JavaScript', 'Java']

// Remove and return the last element
languages.pop(); // same in Python: languages.pop()
// 'Java'
languages;
// ▶ (3) ['TypeScript', 'Python', 'JavaScript']

// Remove and return the first element from an array
languages.shift(); // in Python: languages.pop(0) for list or languages.popleft() for deque
// 'TypeScript'
languages;
// ▶ (2) ['Python', 'JavaScript']

// Concatenate arrays (leaving the original arrays unchanged)
let fish = ["Salmon", "Cod", "Trout"];
let mammals = ["Sheep", "Cat", "Tiger"];
fish.concat(mammals); // same in Python: fish + mammals; not the same in Python: fish.extend(mammals) returns None and changes fish
// ▶ (6) ['Salmon', 'Cod', 'Trout', 'Sheep', 'Cat', 'Tiger']

// Concatenate multiple arrays
let originals = ["Hope", "Empire", "Jedi"];
let prequels = ["Phantom", "Clones", "Sith"];
let sequels = ["Awakens", "Last", "Rise"];
prequels.concat(originals, sequels); // in Python: prequels + originals + sequels
// ▶ (9) ['Phantom', 'Clones', 'Sith', 'Hope', 'Empire', 'Jedi', 'Awakens', 'Last', 'Rise']

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
// ▶ (4) ['Ringo', 'George', 'Paul', 'John']
// Another better way in Python: beatles[::-1]
beatles;
// ▶ (4) ['Ringo', 'George', 'Paul', 'John']

// sort()
[100, true, false, "hi", 3.14].sort();
// ▶ (5) [100, 3.14, false, 'hi', true]
beatles.sort();
// ▶ (4) ['George', 'John', 'Paul', 'Ringo']
// in Python: beatles.sort() returns None and sort a list
// in Python: sorted(beatles) returns the sorted list and does not change the original list

// splice() removes elements from an array and returns removed elements
beatles.splice(0, 2);
// ▶ (2) ['George', 'John']
beatles;
// ▶ (2) ['Paul', 'Ringo']
