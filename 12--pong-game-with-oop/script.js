/*
    Play the Pong game.
    Use the mouse to move the bottom paddle.
    Hit the ball with the edges of the paddle to change the angle of the ball.
    The play stops when a player reaches 10 points.
    Try playing in the browser https://vizhub.com/ax-va/966f246e8d2b45ccaf84a5adccafda33.
 */

class GameView {
    /*
        This class is responsible for the canvas, drawing context,
        drawing entities (e.g., the ball and two paddles) to the canvas,
        and drawing the "GAME OVER" text, i.e. how the game is displayed.
     */
    constructor() {
        let canvas = document.querySelector("#canvas");
        this.ctx = canvas.getContext("2d");
        this.width = canvas.width;
        this.height = canvas.height;
        this.offsetLeft = canvas.offsetLeft;
    }

    draw(...entities) {
        // Fill the canvas with black to clear it
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.width, this.height);
        // Draw entities such as the ball and two paddles
        // (using *polymorphism* and *Liskov substitution principle*).
        entities.forEach(entity => entity.draw(this.ctx));
    }

    drawScores(scores) {
        // Scores will be white
        this.ctx.fillStyle = "white";
        // Set the context for scoring points
        this.ctx.font = "16px monospace";
        this.ctx.textAlign = "left";
        this.ctx.textBaseline = "top";
        this.ctx.fillText(scores.top.toString(), 0, 0);
        this.ctx.textAlign = "right";
        this.ctx.textBaseline = "bottom";
        this.ctx.fillText(scores.bottom.toString(), this.width, this.height)
    }

    drawGameOver() {
        this.ctx.fillStyle = "white";
        this.ctx.font = "30px monospace";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText("GAME OVER", this.width / 2, this.height / 2);
    }

}

class Entity {
    /*
        This superclass as a parent for the  Paddle and Ball subclasses
        includes code for keeping track of the sizes and positions of the
        elements, calculating the boundaries of the elements for collision detection,
        and drawing the elements.
     */
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    bBox() {
    // bounding box
        return {
            left: this.x,
            right: this.x + this.width,
            top: this.y,
            bottom: this.y + this.height,
        };
    }

    draw(ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Paddle extends Entity {
    // static properties assigned to the entire class
    static WIDTH = 40;
    static HEIGHT = 5;
    static OFFSET = 20;

    constructor(x, y, name) {
        super(x, y, Paddle.WIDTH, Paddle.HEIGHT);
        this.name = name;
    }

    followBall(ball) {
        const MAX_OFFSET = 2;
        if (ball.bBox().left < this.bBox().left) {
            this.x -= MAX_OFFSET;
        } else if (ball.bBox().right > this.bBox().right) {
            this.x += MAX_OFFSET;
        }
    }
}

class Ball extends Entity {
    // the width and height of the ball
    static SIZE = 5;

    constructor() {
        super(0, 0, Ball.SIZE, Ball.SIZE);
        this.init();
    }

    init() {
        this.x = 20;
        this.y = 30;
        this.positionOffset = {x: 2, y: 4};
    }

    update() {
        this.x += this.positionOffset.x;
        this.y += this.positionOffset.y;
    }

    adjustAngle(distanceFromLeft, distanceFromRight) {
        /*
            Uses the distance from the left of the ball to the left of the paddle
            and from the right of the paddle to the right of the ball
            to change `this.positionOffset.x`.
         */
        if (distanceFromLeft < 0) {
            this.positionOffset.x -= 0.5;
            console.log("Left-edge hit!");
            console.log(`Distance from left: ${distanceFromLeft}`);
        } else if (distanceFromRight < 0) {
            this.positionOffset.x += 0.5;
            console.log("Right-edge hit!");
            console.log(`Distance from right: ${distanceFromRight}`);
        }
    }
}

class Play {
    /*
        Controls the collisions, changes the scores,
        draws, and also stops the game.
     */
    constructor() {
        this.gameView = new GameView();
        this.ball = new Ball();
        this.paddles = {
            top: new Paddle(50, Paddle.OFFSET, "top"),
            bottom: new Paddle(70, this.gameView.height - Paddle.HEIGHT - Paddle.OFFSET, "bottom"),
        };
        this.scores = {
            top: 0,
            bottom: 0,
        };
        this.gameOver = false;
        // Move the bottom paddle with the mouse
        document.addEventListener("mousemove", (e) => {
            this.paddles.bottom.x = e.x - this.gameView.offsetLeft;
        });
    }

    static areBallAndPaddleCollided(ball, paddle) {
        // Return `true` if the bounding boxes of the ball and paddle are overlapped.
        return (
            (ball.bBox().left < paddle.bBox().right && ball.bBox().right > paddle.bBox().left) &&
            (ball.bBox().top < paddle.bBox().bottom && ball.bBox().bottom > paddle.bBox().top)
        );
    }

    static handleBallAndPaddleCollision(ball, paddle) {
        let distanceFromLeft = ball.bBox().left - paddle.bBox().left;
        let distanceFromRight = paddle.bBox().right - ball.bBox().right;
        ball.adjustAngle(distanceFromLeft, distanceFromRight);
        // Avoid multiple collisions that could send
        // the ball bouncing back and forth "inside" the paddle.
        let absBallPositionOffsetY = Math.abs(ball.positionOffset.y)
        if (paddle.name === "top") ball.positionOffset.y = absBallPositionOffsetY;
        if (paddle.name === "bottom") ball.positionOffset.y = -absBallPositionOffsetY;
    }

    controlCollisionsOfBallAndPaddles() {
        if (Play.areBallAndPaddleCollided(this.ball, this.paddles.top)) {
            Play.handleBallAndPaddleCollision(this.ball, this.paddles.top);
        }
        if (Play.areBallAndPaddleCollided(this.ball, this.paddles.bottom)) {
            Play.handleBallAndPaddleCollision(this.ball, this.paddles.bottom);
        }
    }

    controlCollisionsOfBallAndWalls() {
        if (this.ball.bBox().left < 0 || this.ball.bBox().right > this.gameView.width) {
            this.ball.positionOffset.x = -this.ball.positionOffset.x;
        }
        if (this.ball.bBox().top < 0) {
            this.ball.init();
            this.scores.bottom++;
        } else if (this.ball.bBox().bottom > this.gameView.height) {
            this.ball.init();
            this.scores.top++;
        }
    }

    controlCollisions() {
        this.controlCollisionsOfBallAndPaddles();
        this.controlCollisionsOfBallAndWalls();
        // Check to stop the game
        if (this.scores.top > 9 || this.scores.bottom > 9) {
            this.gameOver = true;
        }
    }

    draw() {
        this.gameView.draw(
            this.ball,
            this.paddles.top,
            this.paddles.bottom
        );
        this.gameView.drawScores(this.scores);
    }

    update() {
        this.ball.update();
        this.paddles.top.followBall(this.ball);
    }

    loop() {
        this.draw();
        this.update();
        this.controlCollisions();

        if (this.gameOver) {
            // To display the finale scores
            this.draw();
            this.gameView.drawGameOver();
        } else {
            // Call this function again after a timeout in ms.
            setTimeout(() => this.loop(), 30);
            // We lose `this` if we just use `this.loop`.
        }
    }
}

let play = new Play();
play.loop();