// Check if stings contain "hi" by using the `/hi/` pattern
/hi/.test("haha hihi hi");
// true
/hi/.test("hoho haha");
// false

// Check if strings start with "hi" by using the `/^hi/` pattern
/^hi/.test("hi there");
//true
/^hi/.test("Chicken");
//false

// Check if strings start and end with "hi" by using the `/^hi$/`
/^hi$/.test("hi");
// true
/^hi$/.test("him");
// false

// Check if the strings start with a character in the range [A-Z]
// and end with a next character in the range [a-z].
/^[A-Z][a-z]$/.test("Hi");
// true
/^[A-Z][a-z]$/.test("iH");
// false
/^[A-Z][a-z]$/.test("Hip");
// false