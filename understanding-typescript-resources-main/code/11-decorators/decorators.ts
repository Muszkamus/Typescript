function autobind(
  target: (...args: any[]) => any,
  ctx: ClassAccessorDecoratorContext
) {
  console.log(target, ctx);
}

class Person {
  // Instance field
  name = "Rad";
  @autobind
  greet() {
    console.log("Hi, I am " + this.name);
  }
}

// Creating an instance of the decorated class.
// Because the decorator returned a subclass, this instance is an instance of the modified class.
const rad = new Person();

// The instance now includes the extra constructor logic injected by the decorator.
console.log(rad);
