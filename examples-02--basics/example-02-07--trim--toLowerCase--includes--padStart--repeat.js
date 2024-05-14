let text = "\t\t\t    Here is my input     ";

text.trim() // in Python: text.strip()
// 'Here is my input'

text
// '\t\t\t    Here is my input     '

text = "\n\t\n    Here is my input     ";

text.trim();
// 'Here is my input'

text = "Hallo";

text.toLowerCase(); // in Python: text.lower()
// 'hallo'

text.includes("allo"); // in Python: "allo" in text
// true

text.padStart(10, "_");
// '_____Hallo'

text.repeat(3); // in Python: text * 3
// 'HalloHalloHallo'

text.repeat(0);
// ''

text.repeat(-1);
// Uncaught RangeError: Invalid count value: -1
