class Player {
    // method without the function keyword
    constructor(startX, startY) { // in Python:  def __init__(self, start_x, start_y):
        this.x = startX; // in Python: self.x = start_x
        this.y = startY;  // definition difference: property in JavaScript, attribute in Python
    }

    // method without the function keyword
    move(dx, dy) { // in Python: def move(self, dx, dy):
        this.x += dx;
        this.y += dy;
    }
}

let player1 = new Player(0, 0); // in Python: player1 = Player(0, 0)
player1;
// * Player {x: 0, y: 0}
//      x: 0
//      y: 0
//    * [[Prototype]]: Object
//      * constructor: class Player
//      * move: ƒ move(dx, dy)
//      * [[Prototype]]: Object

player1.x;  // similar in Python: player1.x
// 0
player1.y;
// 0

player1.move(1, 2);
player1.x;
// 1
player1.y;
// 2

let player2 = new Player(5, 5);
player2.x;
// 5
player2.y;
// 5

player1.move(2, -2)
player1.x;
// 3
player1.y;
// 0
