let temperature = 70;

// prefix incrementing and decrementing
console.log("returned:", ++temperature);
// returned: 71
console.log("temperature:", temperature);
// temperature: 71

console.log("returned:", ++temperature);
// returned: 72
console.log("temperature:", temperature);
// temperature: 72

console.log("returned:", --temperature);
// returned: 71
console.log("temperature:", temperature);
// temperature: 71

temperature = 70;

// postfix incrementing and decrementing
console.log("returned:", temperature++);
// returned: 70
console.log("temperature:", temperature);
// temperature: 71

console.log("returned:", temperature++);
// returned: 71
console.log("temperature:", temperature);
// temperature: 72

console.log("returned:", temperature--);
// returned: 72
console.log("temperature:", temperature);
// temperature: 71
