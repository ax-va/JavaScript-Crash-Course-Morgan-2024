// Create an object definition using class
class Dog {
    constructor(name) {
        this.name = name;
    }
    sayHello() {
        console.log(`Woof! My name is ${this.name}.`);
    }
}

// Create an object definition using constructor and prototype
function Cat(name) {
    // property
    this.name = name;
}

// Add a method called sayHello to its prototype
Cat.prototype.sayHello = function () {
    console.log(`Miaow! My name is ${this.name}.`);
};

// Overwrite

let charlie = new Dog("Charlie");
charlie.sayHello = function () {
    console.log(`HELLO!!! I'M ${this.name.toUpperCase()}!`);
};

charlie.sayHello();
// HELLO!!! I'M CHARLIE!
// undefined

let moona = new Cat("Moona");
moona.sayHello = function () {
    console.log(`HELLO!!! I'M ${this.name.toUpperCase()}!`);
};

moona.sayHello();
// HELLO!!! I'M MOONA!
// undefined

charlie;
// * Dog {name: 'Charlie', sayHello: ƒ}
//      name: 'Charlie'
//      sayHello: ƒ ()
//    * [[Prototype]]: Object
//      * constructor: class Dog
//      * sayHello: ƒ ()
//      * [[Prototype]]: Object
//        * constructor: ƒ Object()
// ...

moona;
// * Cat {name: 'Moona', sayHello: ƒ}
//      name: 'Moona'
//      sayHello: ƒ ()
//    * [[Prototype]]: Object
//      * sayHello: ƒ ()
//      * constructor: f Cat(name)
//      * [[Prototype]]: Object
//        * constructor: ƒ Object()
// ...
