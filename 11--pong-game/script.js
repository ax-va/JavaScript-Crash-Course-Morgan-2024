let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let width = canvas.width, height = canvas.height;

// Add the ball
const BALL_SIZE = 5;
let ballPosition = {x: 20, y: 30};
let ballPositionOffset = {x: 2, y: 4};

// Add the top and bottom paddles
const PADDLE_WIDTH = 40;
const PADDLE_HEIGHT = 5;
const PADDLE_OFFSET = 20;
let topPaddlePosition = 50;
let bottomPaddlePosition = 70;

// Move the bottom paddle with the mouse
document.addEventListener("mousemove", (e) => {
    bottomPaddlePosition = e.x - canvas.offsetLeft;
});

function draw() {
    // Fill the canvas with black
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
    // Everything else will be white
    ctx.fillStyle = "white";
    // Draw the ball
    ctx.fillRect(ballPosition.x, ballPosition.y, BALL_SIZE, BALL_SIZE);
    // Draw the top paddle
    ctx.fillRect(topPaddlePosition, PADDLE_OFFSET, PADDLE_WIDTH, PADDLE_HEIGHT);
    // Draw the bottom paddle
    ctx.fillRect(bottomPaddlePosition, height - PADDLE_HEIGHT - PADDLE_OFFSET, PADDLE_WIDTH, PADDLE_HEIGHT);
}

function update() {
    ballPosition.x += ballPositionOffset.x;
    ballPosition.y += ballPositionOffset.y;
}

function areBallAndPaddleCollided(ball, paddle) {
    // Return `true` if overlapped
    return (
        (ball.left < paddle.right && ball.right > paddle.left) &&
        (ball.top < paddle.bottom && ball.bottom > paddle.top)
    );
}

function adjustAngle(distanceFromLeft, distanceFromRight) {
    // Use the distance from the left of the ball to the left of the paddle and
    // from the right of the paddle to the right of the ball to change `ballPositionOffset.x`.
    if (distanceFromLeft < 0) {
        ballPositionOffset.x -= 0.5;
        console.log("Left-edge hit!");
        console.log(`Distance from left: ${distanceFromLeft}`);
        console.log("ballPositionOffset.x", ballPositionOffset.x);
    } else if (distanceFromRight < 0) {
        ballPositionOffset.x += 0.5;
        console.log("Right-edge hit!");
        console.log(`Distance from right: ${distanceFromRight}`);
        console.log("ballPositionOffset.x", ballPositionOffset.x);
    };
}

function handleCollisions() {
    // Handle if the ball has collided with one of the four walls of the canvas
    let ball = {
        left: ballPosition.x,
        right: ballPosition.x + BALL_SIZE,
        top: ballPosition.y,
        bottom: ballPosition.y + BALL_SIZE,
    }
    if (ball.left < 0 || ball.right > width) {
        ballPositionOffset.x = -ballPositionOffset.x;
        console.log("ballPositionOffset.x", ballPositionOffset.x);
    }
    if (ball.top < 0 || ball.bottom > height) {
        ballPositionOffset.y = -ballPositionOffset.y;
    }
    // Handle if the paddle and the ball have collided
    let topPaddle = {
        left: topPaddlePosition,
        right: topPaddlePosition + PADDLE_WIDTH,
        top: PADDLE_OFFSET,
        bottom: PADDLE_OFFSET + PADDLE_HEIGHT,
    };
    let bottomPaddle = {
        left: bottomPaddlePosition,
        right: bottomPaddlePosition + PADDLE_WIDTH,
        top: height - PADDLE_OFFSET - PADDLE_HEIGHT,
        bottom: height - PADDLE_OFFSET,
    };
    if (areBallAndPaddleCollided(ball, topPaddle)) {
        // Top paddle collision happened.
        let distanceFromLeft = ball.left - topPaddle.left;
        let distanceFromRight = topPaddle.right - ball.right;
        adjustAngle(distanceFromLeft, distanceFromRight);
        // Using the absolute to avoid multiple collisions that could
        // send the ball bouncing back and forth "inside" the paddle.
        ballPositionOffset.y = Math.abs(ballPositionOffset.y);
    };
    if (areBallAndPaddleCollided(ball, bottomPaddle)) {
        // Bottom paddle collision happened.
        let distanceFromLeft = ball.left - bottomPaddle.left;
        let distanceFromRight = bottomPaddle.right - ball.right;
        adjustAngle(distanceFromLeft, distanceFromRight);
        // Using the absolute to avoid multiple collisions that could
        // send the ball bouncing back and forth "inside" the paddle.
        ballPositionOffset.y = -Math.abs(ballPositionOffset.y);
    };
}

function loopPongGame() {
    draw();
    update();
    handleCollisions();
    // Call this function again after a timeout in ms
    setTimeout(loop, 30);
    // Recall that `setTimeout` calls its function only once after the timeout,
    // while `setInterval` calls its function repeatedly.
}

loopPongGame()