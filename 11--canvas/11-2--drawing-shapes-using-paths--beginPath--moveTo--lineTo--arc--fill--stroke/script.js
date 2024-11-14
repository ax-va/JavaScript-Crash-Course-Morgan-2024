let canvas = document.querySelector("#canvas");
// Get the canvas's two-dimensional drawing context that provides
// the entire Canvas API as a set of methods and properties.
let ctx = canvas.getContext("2d");

// All other shapes besides rectangles are drawn on the canvas as paths
// that is a series of points connected by straight or curved lines, and then
// either stroked with an outline or filled in with a color.

// Draw a red triangle
ctx.fillStyle = "red";
ctx.beginPath();
ctx.moveTo(100, 100);
ctx.lineTo(150, 15);
ctx.lineTo(200, 100);
ctx.lineTo(100, 100);
ctx.fill();

// Draw a green-filled arc
ctx.fillStyle = "green";
ctx.beginPath();
ctx.arc(250, 250, 50, 0, Math.PI * 2 * 0.75, false);
ctx.fill();

// Draw a black-stroked arc
ctx.strokeStyle = "black";
ctx.beginPath();
ctx.arc(50, 250, 50, 0, Math.PI * 2 * 0.75, false);
ctx.stroke();