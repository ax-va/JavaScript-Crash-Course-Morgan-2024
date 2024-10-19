let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;
let redValue = document.querySelector("#red-channel").value;
let greenValue = document.querySelector("#green-channel").value;
let blueValue = document.querySelector("#blue-channel").value;
let alphaValue = document.querySelector("#alpha-channel").value;
let radiusValue = document.querySelector("#radius").value;

function drawCircle(x, y) {
    ctx.fillStyle = `rgba(${redValue}, ${greenValue}, ${blueValue}, ${alphaValue})`;
    ctx.beginPath();
    ctx.arc(x, y, radiusValue, 0, Math.PI * 2, false);
    ctx.fill();
}

canvas.addEventListener("click", (e) => {
    // The offsetX and offsetY properties give the distance of the click event
    // from the top-left corner of the clicked element itself
    drawCircle(e.offsetX, e.offsetY);
});

document
    .querySelector("#sliders")
    .addEventListener("change", (e) => {
        if (e.target.id === "red-channel")
            redValue = e.target.value;
        else if (e.target.id === "green-channel")
            greenValue = e.target.value;
        else if (e.target.id === "blue-channel")
            blueValue = e.target.value;
        else if (e.target.id === "alpha-channel")
            alphaValue = e.target.value;
        else if (e.target.id === "radius")
            radiusValue = e.target.value;
    });

document
    .querySelector("#clear")
    .addEventListener("click", () => {
        ctx.clearRect(0, 0, width, height);
    });