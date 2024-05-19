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
