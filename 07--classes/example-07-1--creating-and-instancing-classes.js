/*
The newer class system with class keyword is a *syntactic sugar* of the older one.
 */

class Player {
    // Add a method without the function keyword that is also a property
    constructor(startX, startY) { // in Python:  def __init__(self, start_x, start_y):
        // properties
        this.x = startX; // in Python: self.x = start_x
        this.y = startY;  // definition difference: property in JavaScript, attribute in Python
    }

    // Add a method without the function keyword that is also a property
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
//        * constructor: ƒ Object()
// ...

// Notice: the constructor and move methods was automatically added to Player.prototype as its properties.

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
