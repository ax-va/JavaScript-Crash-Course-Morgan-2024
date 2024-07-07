document.querySelectorAll(".highlight");
// * NodeList(2) [p.highlight, p.highlight]
//   * 0: p.highlight
//   * 1: p.highlight
//     length: 2
//   * [[Prototype]]: NodeList

let strong = document.querySelectorAll("#main-heading strong");
strong;
// * NodeList [strong]

strong[0].textContent;
// 'JavaScript'

/*
document.querySelector returns only the first element matching the selector, or null if no elements match
 */

document.querySelector("#main-heading strong").textContent
// 'JavaScript'