let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;

let x = 0;
let y = 0;

function drawCircle(x, y) {
    ctx.fillStyle = "rgb(127,127,255)";
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2, false);
    ctx.fill();
}

function update() {
    x += 1;
    y += 1;
    if (x > width) x = 0;
    if (y > height) y = 0;
}

function draw() {
    ctx.clearRect(0, 0, width, height);
    drawCircle(x, y);
}

// Call an anonymous function every 10 ms
setInterval(() => {
    update();
    draw();
}, 10 /* ms */);
