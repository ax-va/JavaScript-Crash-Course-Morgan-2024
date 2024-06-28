let penny = { name: "Penny", value: 1, weight: 2.5 };
let nickel = { name: "Nickel", value: 5, weight: 5 };
let dime = { name: "Dime", value: 10, weight: 2.268 };
let quarter = { name: "Quarter", value: 25, weight: 5.67 };

let change = [quarter, quarter, dime, penny, penny, penny];

change[0].value;
// 25

penny.weight = 2.49;
// 2.49

change[3].weight;
// 2.49

change[4].weight;
// 2.49

change[5].weight;
// 2.49
