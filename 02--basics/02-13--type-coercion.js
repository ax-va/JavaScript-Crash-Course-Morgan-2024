/*
Whereas JavaScript is *weakly typed*, Python is *strongly typed*,
meaning that there are no implicit coercions.
 */

"Current value: " + 10;
// 'Current value: 10'

10 + " characters";
// '10 characters'

"Current value: " + true;
// 'Current value: true'

true + " values";
// 'true values'

// The Boolean will first be coerced into a number:
100 + true;
// 101

// "Double equals" (==) apply coercion to its operands before checking for equality.

// The Boolean will first be coerced into a number:
0 == false;
// true

// but

0 === false;
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

// String numbers will be coerced to numbers
"1" == 1;
// true

123 == "123"
// true

undefined == null;
// true

undefined == false;
// false

"" == 0;
// true

"" == false;
// true

0 != false;
// false
// (!true)
