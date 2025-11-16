"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// A class decorator using the *new ECMAScript decorator signature*.
// T = any class constructor type
// ctx = metadata about what is being decorated (here: a class)
function logger(target, ctx) {
    // The original class constructor before decoration
    console.log(target);
    // Metadata provided by the new decorator system (name, kind = 'class', etc.)
    console.log(ctx);
    // Decorators can return a *new modified class* that replaces the original.
    // Here we create a subclass of the target.
    return class extends target {
        constructor(...args) {
            // Call the original constructor
            super(...args);
            // Extra behavior added by the decorator
            console.log("class constructor");
            console.log(this); // logs the instance
        }
    };
}
// Applying the decorator to the class.
// The decorator receives the class definition *before* it is instantiated.
let Person = class Person {
    // Instance field
    name = "Rad";
    greet() {
        console.log("Hi, I am " + this.name);
    }
};
Person = __decorate([
    logger
], Person);
// Creating an instance of the decorated class.
// Because the decorator returned a subclass, this instance is an instance of the modified class.
const rad = new Person();
// The instance now includes the extra constructor logic injected by the decorator.
console.log(rad);
