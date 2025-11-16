type User = { name: string; age: number };
type UserKeys = keyof User;

// 1. keyof creates a union of property names

let validKey: UserKeys;

validKey = "name";
validKey = "age";

//  2. The variable is restricted to only valid keys of the User type.
// This is type-safe key referencing.

// validKey = "name"; // OK
// validKey = "age";  // OK
// validKey = "random"; // // validKey = "random" ❌ Not allowed — "random" is NOT a key of type User ("name" | "age")

function getProp<T extends object, U extends keyof T>(obj: T, key: U) {
  //3. Understanding the generic constraints
  // T extends object
  // The function accepts any object.
  // U extends keyof T
  // U must be a key of that object.

  // TypeScript forces key to be an actual property of the object passed in.

  // So if T = { name: string; age: number },
  // then U = "name" | "age".
  const val = obj[key];

  if (val === undefined || val === null) {
    throw new Error("Accessing undefined or null value");
  }

  //   4. obj[key] is automatically type-safe
  // Because key is constrained, TypeScript knows:
  // If you pass "age" → you get a number
  // If you pass "name" → you get a string

  return val;
}

const user = { name: "Rad", age: 35 };

const val = getProp(user, "age");

console.log(val);
