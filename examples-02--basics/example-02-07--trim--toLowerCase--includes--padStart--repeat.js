let inputText = "\t\t\t    Here is my input     ";

inputText.trim()
// 'Here is my input'

inputText
// '\t\t\t    Here is my input     '

inputText = "\n\t\n    Here is my input     ";

inputText.trim();
// 'Here is my input'

let text = "Hallo";

text.toLowerCase();
// 'hallo'

text.includes("allo");
// true

text.padStart(10, "_");
// '_____Hallo'

text.repeat(3);
// 'HalloHalloHallo'

text.repeat(0);
// ''

text.repeat(-1);
// Uncaught RangeError: Invalid count value: -1
