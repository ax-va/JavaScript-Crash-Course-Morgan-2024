/*
Prototype-Based Inheritance = an older system than classes in JavaScript that still is used.

That consists of
1) a constructor function (a regular, standalone function)
2) a prototype (a constructor's object-property that instances should be modeled after).

The JavaScript's class-based inheritance is a *syntactic sugar* for prototype-based inheritance.
 */

// Create constructor function called Cat
function Cat(name) {
    // property
    this.name = name;
}

// Add a method called sayHello to its prototype
Cat.prototype.sayHello = function () {
    console.log(`Miaow! My name is ${this.name}.`);
};

// Create a new instance that will inherit from the prototype
let kiki = new Cat("Kiki");
kiki.sayHello();
// Miaow! My name is Kiki.
// undefined

// prototype-based inheritance chain
kiki;
// * Cat {name: 'Kiki'}
//      name: 'Kiki'
//    * [[Prototype]]: Object
//      * sayHello: ƒ ()
//      * constructor: f Cat(name)
//      * [[Prototype]]: Object
//        * constructor: ƒ Object()
// ...

// Notice: classes use the same prototype mechanism under the hood.

// Access an object's [[Prototype]] property, here Cat.prototype, directly in code
kiki.__proto__;
// * {sayHello: ƒ}
//   * sayHello: ƒ ()
//   * constructor: ƒ Cat(name)
//   * [[Prototype]]: Object

let alex = {name: "Alex", age: null};
alex;
// * {name: 'Alex', age: null}
//      name: 'Alex'
//    * [[Prototype]]: Object
//      * constructor: ƒ Object()
// ...

/* walking the prototype chain */

kiki.name;
// 'Kiki'
kiki.sayHello();
// Miaow! My name is Kiki.
// undefined
kiki.hasOwnProperty("name");
// true
