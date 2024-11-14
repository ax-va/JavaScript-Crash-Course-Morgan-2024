class Actor {
    constructor(startX, startY) { // in Python:  def __init__(self, start_x, start_y):
        this.x = startX;
        this.y = startY;
    }

    move(dx, dy) { // in Python: def move(self, dx, dy):
        this.x += dx;
        this.y += dy;
    }

    distanceTo(otherActor) {
        /*
        Returns the distance to the otherActor instance.
         */
        let dx = otherActor.x - this.x;
        let dy = otherActor.y - this.y;
        // Find the length of the hypotenuse of the triangle formed by the two distances and return it
        return Math.hypot(dx, dy);
    }
}

class Player extends Actor { // in Python: class Player(Actor):
    constructor(startX, startY) { // in Python:  def __init__(self, start_x, start_y):
        super(startX, startY); // in Python: super().__init__(start_x, start_y)
        // Notice: because of multiple inheritance in Python, a subclass can have many parent classes
        // and the superclass, attributes, and methods are determined by Method Resolution Order (MRO).
        this.hp = 100;  // hit points = health
    }
}

class Enemy extends Actor {
    attack(player) {
        if (this.distanceTo(player) < 4) {
            player.hp -= 10;
            return true;
        } else {
            return false;
        }
    }
}

let player = new Player(1, 2);
let enemy = new Enemy(3, 4);
player.hp;
// 100

enemy.distanceTo(player);
// 2.8284271247461903

enemy.attack(player);
// true

player.hp;
// 90

player.move(5, 5);
enemy.attack(player);
// false

player.hp;
// 90

/* the instanceof keyword */

player instanceof Player;
// true
player instanceof Actor;
// true
player instanceof Enemy;
// false
