<!-- markdownlint-disable MD001 -->
<!-- markdownlint-disable MD025 -->
<!-- markdownlint-disable MD026 -->
<!-- markdownlint-disable MD033 -->

# TypeScript

---

# Section 2: TypeScript Basics & Basic Types

---

# 15. Type Inference vs Type Assignment

---

Type Interference: TS automatically figures out the variable:

```ts
let age = 38; // inferred as number
```

Type Assignment: You explicitly declare the variable’s type yourself.

```ts
let age: number = 38;
```

---

# 16. Assigning Types To Function Parameters

---

```ts
function add(a: number, b: number) {
  return a + b;
}
```

---

# 17. The "any" Type

---

The any type disables TypeScript’s type checking for a variable, allowing it to hold any value.

---

```ts
let age: any = 36;
age = "37";
```

---

# 18. Understanding Union Types

---

A union type (|) allows a variable to hold more than one possible type.

```ts
let age: string | number = 36;
age = "37";

console.log(age);
```

---

# 19. Arrays & Types

---

```ts
let hobbies = ["sports", "Cooking"];
hobbies.push(10); // ❌ Error: number not assignable to string
```

---

# 20. Advanced Array Types

---

Here, the array can store both strings and numbers — but nothing else.
TypeScript still checks that every element matches one of the permitted types, so you keep flexibility without losing type safety.

```ts
let users: (string | number)[];
users = [1, "Rad"];
console.log(users); // [1, "Rad"]
```

---

# 21. A First Glimpse At Generic Types - Alternative Array Type Declaration

---

Array<string | number> means the same as (string | number)[].
It’s often preferred in complex type definitions or when using advanced TypeScript features like generics, as it makes nested types easier to read.

```ts
let users: Array<string | number>;
users = [1, "Rad"];
```

---

# 22. Making Sense of Tuples

---

Here, possibleResults must contain exactly two numbers — no more, no less.
Tuples are useful for representing structured pairs like coordinates, key-value pairs, or return values.

```ts
let possibleResults: [number, number];
possibleResults = [1, 5]; // ✅ valid
possibleResults = [1, 5, 23]; // ❌ Error: too many elements
```

---

# 23. Object Types

---

Each property has a clearly defined type, including nested objects.
This ensures that user must always follow this shape — preventing missing or incorrectly typed properties.

```ts
let user: {
  name: string;
  age: number;
  hobbies: string[];
  role: { description: string; id: number };
} = {
  name: "Radek",
  age: 28,
  hobbies: ["Sports", "Walking"],
  role: {
    description: "admin",
    id: 5,
  },
};
```

---

# 24. Tricky: The "Must Not Be Null" Type

---

When you use {} in TypeScript, it means “any value that isn’t null or undefined.”
That includes strings, numbers, arrays, booleans, and actual objects.
So yes — it can “be anything,” but not because it’s not empty — rather because {} is a very loose type.

```ts
let val: {} = 42; // ✅ number allowed
val = "hello"; // ✅ string allowed
val = true; // ✅ boolean allowed
val = { name: "Radek" }; // ✅ object allowed
val = null; // ❌ not allowed
val = undefined; // ❌ not allowed
```

---

# 25. Flexible Objects with the Record Type

---

Record Type – Brief Explanation:
Record<Keys, Type> is a built-in TypeScript utility that defines an object with specific key and value types.

```ts
let data: Record<string, number | string>;

data = {
  entry1: 1,
  entry2: "some string",
};
```

string → all keys must be strings (e.g. "entry1", "entry2").

number | string → each value can be either a number or a string.

This is safer and clearer than { [key: string]: any } because it enforces both key and value types.
In short:

{} → too loose, allows almost anything.

Record<string, number | string> → structured object with typed keys and values.

---

# 26. Working with Enums

---

An enum is a TypeScript feature used to define a set of named constants, improving code readability and intent.

```ts
enum Role {
  Admin,
  Editor,
  Guest,
}

let userRole: Role = Role.Admin;
```

By default, enum members are assigned numeric values starting from 0 (Admin = 0, Editor = 1, Guest = 2).

You can also assign custom values (numeric or string).

```js
var Role;
(function (Role) {
  Role[(Role["Admin"] = 0)] = "Admin";
  Role[(Role["Editor"] = 1)] = "Editor";
  Role[(Role["Guest"] = 2)] = "Guest";
})(Role || (Role = {}));
var userRole = Role.Admin;
```

This means:

You can access both ways:
Role.Admin → 0
Role[0] → "Admin"

Enums are useful for defining roles, states, or modes with clear, readable names instead of raw values.

---

# 27. Being Specific With Literal Types

---

1: Literal Types:
They restrict a variable to specific exact values, not just types.

```ts
let userRole: "admin" | "editor" | "guest" = "admin"; // ✅ only these three allowed
let userRole2: "admin" = "guest"; // ❌ Error: "guest" not assignable to "admin"
```

2: Tuple with Literal Type:

```ts
let possibleResults: [1 | -1, number];
```

This defines a tuple (fixed-length array) where:
The first element must be either 1 or -1.
The second element must be a number.

```ts
possibleResults = [1, 42]; // ✅ valid
possibleResults = [-1, 100]; // ✅ valid
possibleResults = [0, 50]; // ❌ Error: 0 not allowed
```

---

# 28. Type Aliases & Custom Types

---

A type alias lets you create a reusable name for a type definition.

```ts
type Role = "admin" | "editor" | "guest";
```

This defines Role as a union of literal types, meaning only those exact string values are valid.
You can then reuse it in other type definitions:

```ts
type User = {
  name: string;
  age: number;
  role: Role;
  permissions: string[];
};
```

This keeps your code clean and consistent — any property or parameter expecting a Role must match the allowed values.

```ts
let userRole2: Role = "admin"; // ✅ valid
function access(role: Role) {
  // role can only be "admin" | "editor" | "guest"
}
```

---

# 29. Function Return Value Types

---

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

The parameters a and b are both typed as number.

The : number after the parentheses specifies the return type.

TypeScript enforces that the function must return a number, or it will throw a compile-time error.

---

# 30. The "void" Type

---

The void type indicates that a function does not return a value.

```ts
function log(message: string): void {
  console.log(message);
}
```

The function accepts a string parameter.

void tells TypeScript that nothing meaningful is returned — it only performs an action (like logging or updating state).
If you accidentally try to return a value, TypeScript will flag it:

```ts
return message; // ❌ Error — cannot return a value from a void function
```

---

# 31. The "never" Type

---

The never type is used for functions that never successfully finish — they don’t return anything at all, not even void.

```ts
function logAndThrow(errorMessage: string): never {
  console.log(console.error);
  throw new Error(errorMessage);
}
```

Here’s why:

The function always throws an error, so it can’t reach the end or return a value.

TypeScript uses never to mark functions that either throw or run forever (like infinite loops).

```ts
function crash(): never {
  throw new Error("Fatal error");
}

function loopForever(): never {
  while (true) {}
}
```

---

# 32. Functions As Types

---

```ts
// Example combining callbacks, function types, and object methods in TypeScript

// 1️⃣ Arrow function with parameter typing
const logMsg = (msg: string) => {
  console.log(msg);
};

// 2️⃣ Function expecting a callback parameter
function performJob(cb: (msg: string) => void) {
  // The callback must accept a string and return nothing (void)
  cb("Job Done");
}

performJob(logMsg); // ✅ Logs: "Job Done"

// 3️⃣ Defining a custom type with a function property
type User = {
  name: string;
  age: number;
  greet: () => string; // function must return a string
};

// 4️⃣ Object following the User type
let user: User = {
  name: "Radek",
  age: 28,
  greet() {
    console.log("Hi!");
    return this.name; // ✅ returns string as required
  },
};

user.greet(); // Logs "Hi!" and returns "Radek"

// 🔍 Summary:
// - `cb: (msg: string) => void` defines a callback signature.
// - `greet: () => string` defines an object method returning a string.
// - TypeScript ensures both the parameter types and return types match exactly.
```

---

# 33. null & undefined - Special Types

---

```ts
let a: null | string;

a = "Hi!";

// ...

a = null;

// ✅ Use `undefined` for "not yet assigned"
let userName: string | undefined;
console.log(userName); // undefined (hasn't been set yet)

// ✅ Use `null` for "intentionally empty"
let userAge: number | null = null; // explicitly no value yet, but will be set later
```

The difference in practice:

undefined → default state for uninitialized variables or missing object properties.

Usually handled automatically by JS/TS.

Ideal for optional fields, e.g. user?.email.

null → intentional absence of a value.

You explicitly say “this should be empty.”

Useful when resetting or clearing state (e.g. selectedUser = null).

---

# 34. Inferred null & A First Look At Type Narrowing

---

Explanation:
getElementById() returns HTMLElement | null, so a null check is required.
HTMLElement doesn’t have `.value`, only HTMLInputElement does.
Type assertion `(inputEl as HTMLInputElement)` tells TypeScript the exact element type.
Prevents runtime errors and enables autocomplete for input-specific properties.

```ts
const inputEl = document.getElementById("user-name");

if (!inputEl) {
  throw new Error("Element not found");
}

console.log((inputEl as HTMLInputElement).value);
```

---

# 35. Forced "Not Null" And Optional Chaining

---

```ts
const inputEl = document.getElementById("user-name")!;

// if (!inputEl) {
//   throw new Error("Element not found");
// }

console.log(inputEl?.value);
```

! → Non-null assertion operator
Tells TypeScript that inputEl will definitely exist (not null or undefined).
Use carefully — if the element doesn’t exist, it will still throw a runtime error.

?. → Optional chaining operator
Safely accesses .value only if inputEl is not null or undefined.
Prevents crashes when trying to access properties on a possibly null object.

Use both together only when you’re absolutely sure the element is present in the DOM.

---

# 36. Type Casting

---

```ts
const inputEl = document.getElementById("user-name") as HTMLInputElement | null;

// if (!inputEl) {
//   throw new Error("Element not found");
// }

console.log(inputEl?.value);
```

as HTMLInputElement | null → Type assertion that tells TypeScript the element is either an HTMLInputElement or null.
This gives full IntelliSense for input-specific properties like .value, while keeping null safety.

---

# 37. The "unknown" Type

---

```ts
function process(val: unknown) {
  if (
    typeof val === "object" && // checks that val is an object
    !!val && // excludes null (since typeof null === "object")
    "log" in val && // checks that the 'log' property exists
    typeof val.log === "function" // ensures that 'log' is actually a function
  )
    val.log(); // ✅ safely call log() now
}
```

unknown → a safer alternative to any; it forces you to verify the type before using the value.
This function performs type narrowing step by step:

Confirms val is an object.

Ensures it’s not null.

Verifies it has a log property.

Confirms that log is callable.

After these checks, TypeScript allows val.log() safely — no type errors or runtime risk.

---

# 38. Optional Values & TypeScript

---

```ts
function generateError(msg?: string) {
  throw new Error(msg);
}

generateError(); // ✅ works — msg is optional (undefined)
generateError("Error occured"); // ✅ works — msg provided
```

msg?: string → the question mark marks msg as optional, meaning it can be omitted or undefined.
The function always throws an error, so it effectively never returns a value — its return type is inferred as never.

```ts
type User = {
  name: string;
  age: number;
  role?: "admin" | "guest";
};
```

role?: → optional property — the user object can include it or not.
This improves flexibility while keeping strong typing for the rest of the structure.

---

# 39. Nullish Coalescing

--

```ts
let input = null;

const didProvideInput = input ?? false;
```

?? → Nullish coalescing operator
It returns the value on the left (input) unless that value is null or undefined.
If it is null or undefined, it returns the value on the right (false).

In this case:

input is null, so didProvideInput becomes false.

If input were 0, "", or false, it would still keep that value (unlike || which treats them as falsy).

Example:

```ts
let input = "";
const result = input ?? "No input"; // result = "" ✅
```

---

# Section 3: The TypeScript Compiler (and its Configuration)

---

# 41. TypeScript Project Setup & Creating a tsconfig.json File

---

```bash
tsc --init
```

This will produce tsconfig.json file to edit TS behaviour

---

# 42. Exploring tsconfig Options: Target & Libs

---

```json
{
  // Visit https://aka.ms/tsconfig to read more about this file
  "compilerOptions": {
    // === FILE LAYOUT ===
    // "rootDir": "./src",       // Tells TS where your source files live (input directory)
    // "outDir": "./dist",       // Tells TS where to put compiled JS files (output directory)

    // === ENVIRONMENT SETTINGS ===
    "module": "nodenext", // Enables modern ES module support in Node.js (import/export)
    "target": "esnext", // Output latest JavaScript features that your runtime supports
    "types": [], // Empty array = only include default libs (no auto @types imports)

    // "lib": ["esnext"],         // Defines available built-ins (e.g. Promise, Map) for Node
    // "types": ["node"],         // Include Node.js types (if using fs, path, etc.)
    // (Install with: npm i -D @types/node)

    // === OUTPUT FILES ===
    "sourceMap": true, // Generfates .map files for debugging in browser/devtools
    "declaration": true, // Generates .d.ts files for publishing or reuse in other projects
    "declarationMap": true, // Links declaration files to source maps for better debugging

    // === STRICTER TYPE CHECKS ===
    "noUncheckedIndexedAccess": true, // Forces you to handle undefined when accessing array/object indexes
    "exactOptionalPropertyTypes": true, // Makes `optional?: string` behave as `string | undefined`, not just `string`

    // === STYLE & SAFETY OPTIONS ===
    // "noImplicitReturns": true,          // Ensures all code paths in functions return a value
    // "noImplicitOverride": true,         // Requires explicit 'override' keyword when overriding base methods
    // "noUnusedLocals": true,             // Flags unused local variables
    // "noUnusedParameters": true,         // Flags unused function parameters
    // "noFallthroughCasesInSwitch": true, // Prevents accidental fall-through in switch statements
    // "noPropertyAccessFromIndexSignature": true, // Enforces bracket notation for index signatures

    // === RECOMMENDED CORE SETTINGS ===
    "strict": true, // Enables all strict type-checking options (best practice!)
    "jsx": "react-jsx", // Enables React JSX transform (for React 17+)
    "verbatimModuleSyntax": true, // Keeps import/export syntax as written (no rewrites)
    "isolatedModules": true, // Ensures each file is treated as its own module (useful for bundlers)
    "noUncheckedSideEffectImports": true, // Warns about imports that only have side effects (safer builds)
    "moduleDetection": "force", // Forces TS to treat all files using import/export as modules
    "skipLibCheck": true // Skips type checking of .d.ts files (faster compile, safe for most projects)
  }
}
```

Summary of the key ones to keep active:
"strict" → always.

"noUncheckedIndexedAccess" → excellent for data safety.

"exactOptionalPropertyTypes" → helps avoid subtle undefined bugs.

"isolatedModules" & "verbatimModuleSyntax" → critical for modern bundlers (Vite, Next.js, etc.).

"declaration" + "sourceMap" → necessary if you plan to distribute your code or debug effectively.

---

Besides configuring compilation & type checking, you can also use the tsconfig.json file to enable some "quality of life" checks - checks that are not directly related to types but that can help you improve your code quality.

```json
{
  "noUnusedLocals": true, // helps you detect unused variable
  "noUnusedParameters": true, // helps you detect unused function parameters
  "noFallthroughCasesInSwitch": true // helps you detect switch cases without break or return
}
```

---

# Section 4: TypeScript Essentials Demo Project

---

```ts
type InvestmentData = {
  initialAmount: number; // typed property: must be a number
  annualContribution: number; // number type ensures numeric input
  expectedReturn: number; // expected annual return percentage
  duration: number; // number of years for investment
};

const data: InvestmentData = {
  initialAmount: 5000,
  annualContribution: 500,
  expectedReturn: 0.08,
  duration: 10,
}; // variable 'data' strictly follows the InvestmentData type structure

type InvestmentResult = {
  year: string; // must be a string (e.g., "Year 1")
  totalAmount: number; // total amount accumulated
  totalContributions: number; // total money invested
  totalInterestEarned: number; // total interest generated
};

type CalculationResult = InvestmentResult[] | string; // union type: allows either array of results or an error message

function calculateInvestment(
  data: InvestmentData // parameter must match InvestmentData type
): InvestmentResult[] | CalculationResult {
  const { initialAmount, annualContribution, expectedReturn, duration } = data; // destructuring preserves types automatically

  if (initialAmount < 0) {
    return "Initial investment must be at least 0"; // valid string return (matches union type)
  }

  if (duration <= 0) {
    return "No valid amount of years provided"; // same type safety for errors
  }

  if (expectedReturn <= 0) {
    return "Expected return must be at least 0";
  }

  let total = initialAmount;
  let totalContributions = 0;
  let totalInterestEarned = 0;

  const annualResults: InvestmentResult[] = []; // array typed to hold only InvestmentResult objects

  for (let i = 0; i < duration; i++) {
    total = total * (1 + expectedReturn);
    totalInterestEarned = total - totalContributions - initialAmount;
    totalContributions = totalContributions + annualContribution;
    total = total + annualContribution;

    annualResults.push({
      year: `Year ${i + 1}`, // must be a string
      totalAmount: total, // must be a number
      totalInterestEarned, // inferred number
      totalContributions, // inferred number
    }); // type checked automatically against InvestmentResult
  }

  return annualResults; // returning typed array satisfies return type
}

console.log(calculateInvestment(data)); // inferred return type is CalculationResult (array or string)

function printResults(results: CalculationResult) {
  if (typeof results === "string") {
    // type narrowing: TypeScript knows 'results' is string inside this block
    console.log(results);
    return;
  }

  for (const yearEndResult of results) {
    // outside the if, TS infers 'results' as InvestmentResult[]
    console.log(yearEndResult.year);
    console.log(`Total: ${yearEndResult.totalAmount.toFixed(0)}`);
    console.log(
      `Total Contributions: ${yearEndResult.totalContributions.toFixed(0)}`
    );
    console.log(
      `Total interest earned: ${yearEndResult.totalInterestEarned.toFixed(0)}`
    );
    console.log("-------------");
  }
}

const results = calculateInvestment(data); // results inferred as CalculationResult
printResults(results); // function expects CalculationResult, so fully type-safe
```

---

# Section 6: Classes & Interfaces

---

# 69. Creating a First Class

---

1. class User { ... }
   This declares a class named User.
   Classes in TypeScript are templates for objects that bundle data (properties) and logic (methods).

2. name: string; and age: number;
   These are property declarations with explicit types.
   You’re saying every User object must have:
   a name that’s a string
   an age that’s a number
   TypeScript enforces this at compile time.

3. constructor(n: string, a: number) { ... }
   The constructor runs automatically when you call new User(...).
   It accepts two parameters:
   n → string (user’s name)
   a → number (user’s age)
   Inside, this.name = n; and this.age = a; assign those values to the new instance.

4. Example usage

```ts
const radek = new User("Radek", 28);
console.log(radek.name); // "Radek"
console.log(radek.age); // 28
```

radek is now an instance of the User class — an object with those properties.

### Summary

You’re defining a strongly typed class with:
clear property types (string, number)

a constructor that initializes them
TypeScript ensures you can’t create a User without the right arguments:

```ts
new User("Alice", "28"); // ❌ Error: "28" is not a number
```

---

# 70. A Useful TypeScript Shortcut & Compiling to JavaScript

---

```ts
class User {
  constructor(public name: string, public age: number) {}
}

const radek = new User("Radek", 28);

console.log(radek);
```

---

# Different Access Modifiers

---

1: public (default)

Accessible anywhere — inside or outside the class.

Use when you want properties or methods to be openly available.

```ts
public name: string;
```

2: private

Accessible only inside the class.

Not accessible by subclasses or external code.

Use for internal logic or state that shouldn’t be exposed.

```ts
private password: string;
```

3: protected

Accessible inside the class and its subclasses, but not from outside.

Use for things subclasses should inherit or override but external code shouldn’t touch.

```ts
protected id: number;
```

4: readonly

Can be read publicly but set only once (at declaration or in constructor).

Use for data that should never change after creation.

```ts
readonly createdAt: Date = new Date();
```

- public → open to all
- private → internal only
- protected → visible to subclasses
- readonly → immutable after initialization

---

# 72. Marking Fields as "readonly"

---

```ts
class User {
  readonly hobbies: string[] = [];

  constructor(public name: string, private age: number) {}
}
```

- readonly hobbies: string[] → You cannot reassign the hobbies property itself.
- But since it’s an array, you can still mutate its contents (push, pop, etc.).

```ts
const radek = new User("Radek", 28);

radek.hobbies = []; // ❌ Error — reassignment not allowed
radek.hobbies.push("Gym"); // ✅ Works — mutates array contents
```

Correct interpretation

- readonly prevents rebinding the reference, not mutating the underlying object.
- In this case, hobbies always points to the same array, but the array can change.

---

# 73. Understanding Getters

---

```ts
class User {
  constructor(private firstName: string, private lastName: string) {}
  get fullName() {
    // getter by default makes it public
    return this.firstName + " " + this.lastName;
  }
}

const radek = new User("Radek", "Doe");

console.log(radek.fullName);
```

1: constructor(private firstName: string, private lastName: string)

Both firstName and lastName are private.

That means you cannot access them directly:

```ts
radek.firstName; // ❌ Error: private property
```

2: get fullName() { ... }

This defines a getter method called fullName.

It behaves like a property, not a function — no parentheses needed.

By default, getters are public, unless you explicitly mark them otherwise.

```ts
radek.fullName; // ✅ Works
```

3: Why use a getter?

It lets you control access to private fields.

It computes a value dynamically without needing a separate method call.

You can later add logic (e.g., capitalization or formatting) without changing how the class is used.

---

# 74. Setting Values with Setters

---

1: Private fields

```ts
   private \_firstName: string = "";
   private \_lastName: string = "";
```

Only accessible inside the class.

External code cannot modify them directly — prevents accidental misuse.

2: Setters with validation

```ts
set firstName(name: string) {
  if (name.trim() === "") throw new Error("Invalid name");
  this._firstName = name;
}
```

The set keyword defines a property setter, not a method.

You can assign like a normal property (radek.firstName = "Radek").

The validation ensures you can’t set an empty string.

Same logic for lastName.

3: Getter

```ts
get fullName() {
return this.\_firstName + " " + this.\_lastName;
}
```

Exposes a computed property without exposing the raw fields.

Automatically public.

Used like a property (radek.fullName), not like a function call.

4: Runtime result

```ts
const radek = new User();
radek.firstName = "Radek";
radek.lastName = "Doe";
console.log(radek.fullName);
```

---

A setter is a special method that defines what happens when a value is assigned to a property from outside the class. It doesn’t automatically change the class’s state — it only mutates internal values if you explicitly tell it to inside the setter.

A getter defines what happens when that property is read. It can return a computed or formatted value based on the class’s internal data, but it never changes the state of the class itself.

In short:

Setter → handles controlled assignment (can validate or modify before saving).

Getter → handles controlled access (can calculate or format before returning).

Neither acts automatically — they only do what you explicitly define in their bodies.

```ts
class User {
  // Private fields — only accessible inside the class
  private _firstName: string = "";
  private _lastName: string = "";

  // === SETTERS ===
  // A setter lets you control how a property is *assigned*.
  // It looks like a method but is called like a normal property: radek.firstName = "Radek"
  set firstName(name: string) {
    // Basic validation: trim() removes whitespace
    if (name.trim() === "") {
      throw new Error("Invalid name"); // prevents empty input
    }
    this._firstName = name; // if valid, save it to the private field
  }

  set lastName(name: string) {
    if (name.trim() === "") {
      throw new Error("Invalid name");
    }
    this._lastName = name;
  }

  // === GETTER ===
  // A getter lets you *retrieve* a property value dynamically.
  // It runs automatically when you access radek.fullName.
  get fullName() {
    // Combines both private fields into one formatted string
    return this._firstName + " " + this._lastName;
  }
}

const radek = new User();

// Calling the setters (not functions — just assignments)
radek.firstName = "Radek"; // setter firstName runs → stores "Radek" in _firstName
radek.lastName = "Doe"; // setter lastName runs → stores "Doe" in _lastName

// Accessing the getter (again, no parentheses)
console.log(radek.fullName);
// getter fullName runs → combines both names and returns "Radek Doe"

// === OUTPUT ===
// Radek Doe
```

---

# 75. Exploring Static Properties & Methods

---

```ts
class User {
  // === STATIC FIELD ===
  static eid = "USER";
  // Belongs to the _class itself_, not to individual objects (instances)

  // === STATIC METHOD ===
  static greet() {
    console.log("Hello");
  }
}

// Accessing static members directly via the class name
console.log(User.eid); // Logs: "USER"
User.greet(); // Logs: "Hello"
```

🧩 Explanation
static keyword means the property or method belongs to the class itself, not to instances created from it.
In other words, User.eid exists, but radek.eid (if you made const radek = new User()) would not.

User.eid — accesses the static property.

User.greet() — calls the static method directly on the class.

You use static members when the data or behavior is shared across all instances — for example:

Utility methods (Math.random() is a static method).

Constants or configuration values (User.roleName = "Admin").

---

# 76. Understanding Inheritance

---

```ts
class Employee extends User {
  // The class `Employee` inherits everything from `User`.
  // That means it gets User's properties, methods, and static members (if not private).

  constructor(public jobTitle: string) {
    super(); // ✅ must be called before using "this"

    // You could also set inherited fields after calling super, e.g.:
    // super.firstName = "Max"; // if User had a public firstName
  }

  work() {
    // You can add new methods or override inherited ones
    console.log(`${this.jobTitle} is working`);
  }
}
```

🧩 Explanation

extends User → makes Employee a subclass of User.
This is classical inheritance: Employee inherits all public and protected members of User.

constructor(public jobTitle: string) → defines a constructor that also automatically creates a property jobTitle (TypeScript shortcut syntax).
It means each Employee instance will have a jobTitle field.

super() → calls the parent class constructor (User’s).
In JavaScript and TypeScript, you must call super() in a derived class before accessing this, otherwise it throws an error.
This initializes the parent class’s part of the object.

work() → a custom method specific to Employee.
It’s how subclasses extend base functionality.

---

# 77. The "protected" Modifier

---

```ts
class Employee extends User {
  constructor(public jobTitle: string) {
    super(); // ✅ must be called before using `this`
  }

  work() {
    console.log(this._firstName);
    // ❌ ERROR: Property '_firstName' is private and only accessible within class 'User'.
  }
}
```

| Modifier      | Accessible inside class | Accessible in subclasses | Accessible outside |
| ------------- | ----------------------- | ------------------------ | ------------------ |
| **private**   | ✅                      | ❌                       | ❌                 |
| **protected** | ✅                      | ✅                       | ❌                 |
| **public**    | ✅                      | ✅                       | ✅                 |

---

# 78. Making Sense Of Abstract Classes

---

```ts
abstract class UIElement {
  constructor(public identifier: string) {}

  clone(targetLocation: string) {
    // logic to duplicate the UI element
    console.log(`Cloning ${this.identifier} to ${targetLocation}`);
  }
}
```

abstract class → cannot be instantiated directly.
You can’t do new UIElement("header") — it’s meant to be a blueprint for subclasses.
The constructor sets a public property identifier automatically (TypeScript shorthand for this.identifier = identifier).
The clone() method defines a common behavior that all subclasses can use or override.

```ts
class SideDrawerElement extends UIElement {
  constructor(public identifier: string, public position: "left" | "right") {
    super(identifier); // ✅ must call parent constructor
  }
}
```

extends UIElement → inherits everything from UIElement, including the identifier and the clone() method.
The constructor adds an extra property — position — that’s specific to the subclass.
super(identifier) → calls the base class constructor to initialize inherited fields.

| Concept          | Purpose                                                                                  |
| ---------------- | ---------------------------------------------------------------------------------------- |
| `abstract class` | Template that cannot be instantiated directly. Used to define shared structure/behavior. |
| `super()`        | Initializes the parent class’s constructor and fields.                                   |
| Inheritance      | Subclass (`SideDrawerElement`) reuses and extends base functionality.                    |
| Public shorthand | `public identifier: string` both declares and assigns the field in one step.             |

---

# 81. Interfaces As Object Types

---

```ts
interface Authenticatable {
  // Tells TypeScript: “user must follow the Authenticatable interface shape.”
  // The assigned object ✅ matches that shape exactly:
  // It has the required properties (email, password)
  // It implements both methods (login, logout)
  // TypeScript confirms type safety — if you miss or rename a property, you’ll get an error.
  email: string;
  password: string;

  login(): void;
  logout(): void;
}
let user: Authenticatable;

user = {
  email: "test@gmail.com",
  password: "qwerty",
  login() {
    // reach out to the database
  },
  logout() {
    // clear the session
  },
};
```

Example

```ts
class User implements Authenticatable {
  constructor(public email: string, public password: string) {}

  login() {
    console.log(`Logging in ${this.email}`);
  }

  logout() {
    console.log(`${this.email} logged out`);
  }
}

const radek = new User("radek@gmail.com", "qwerty");
radek.login(); // "Logging in radek@gmail.com"
```

| Concept               | Meaning                                                                                 |
| --------------------- | --------------------------------------------------------------------------------------- |
| **interface**         | Describes the required structure (type contract).                                       |
| **implements**        | Ensures a class follows the interface’s structure.                                      |
| **Object assignment** | Must include all properties/methods defined in the interface.                           |
| **No runtime code**   | Interfaces disappear after compilation — they’re purely for compile-time type checking. |

---

# 82. Interfaces vs Type Aliases & Understanding Declaration Merging

---

| Use `interface` for                         | Use `type` for                        |
| ------------------------------------------- | ------------------------------------- |
| OOP-style architecture (classes, contracts) | Complex types (unions, intersections) |
| Extending or merging                        | Primitive or function aliases         |
| Public APIs / Libraries                     | Internal utilities & composition      |
| Clear structure                             | Flexible composition                  |

---

# 84. Implementing Interfaces

---

```ts
interface Authenticatable {
  // Defines a contract (shape) — any class implementing it must include all those properties and methods (email, password, login, logout).
  email: string;
  password: string;

  login(): void;
  logout(): void;
}

interface AuthenticatableAdmin extends Authenticatable {
  role: "admin" | "superadmin";
}

const admin: AuthenticatableAdmin = {
  // AuthenticatableAdmin extends the base interface, meaning it inherits all its members and adds one (role).
  email: "...",
  password: "...",
  role: "admin",
  login() {},
  logout() {},
};

class AuthenticatableUser implements Authenticatable {
  // The implements keyword enforces that the class follows the interface exactly.
  // If you miss one property or method, TypeScript throws a compile-time error.
  constructor(public email: string, public password: string) {}

  // Declares email and password as public class fields.
  // Initializes them automatically from constructor arguments.

  // These satisfy the methods required by the interface.
  // Right now they’re empty, but in real systems they’d contain logic like:
  // Checking credentials against a database
  // Generating a session or token
  // Logging the action for auditing

  login() {}
  logout() {}
}

function authenticate(user: Authenticatable) {
  user.login();
}

let user: Authenticatable;
user = {
  email: "test@gmail.com",
  password: "qwerty",
  login() {
    // reach out to the database
  },
  logout() {
    // clear the session
  },
};
authenticate(user);
```

### 🧠 Why this pattern matters (especially in fintech)

Interfaces define security-critical contracts (e.g., every auth-related class must implement login() and logout()).
Classes encapsulate state + behavior (email, password, session management).
You can now swap different implementations easily:

```ts
class GoogleUser implements Authenticatable { ... }
class BiometricUser implements Authenticatable { ... }

```

Both can plug into the same AuthService that depends only on the interface, not the concrete class — aligning perfectly with the Dependency Inversion Principle (the "D" in SOLID).

| Concept                  | Purpose                                      |
| ------------------------ | -------------------------------------------- |
| `interface`              | Defines a structural contract (the “what”)   |
| `extends`                | Inherits and refines that contract           |
| `implements`             | Enforces the contract in a concrete class    |
| Structural typing        | Any object with the right shape is accepted  |
| Compile-time enforcement | Prevents missing methods or properties early |

---

# Section 7: Advanced Types

---

# 89. Intersection Types

---

```ts
type FileData = {
  // Describes information about a file — its path and its content.
  path: string;
  content: string;
};
type DatabaseData = {
  // Represents connection details for a database — a connectionUrl and some credentials.
  connectionUrl: string;
  credentials: string;
};
type Status = {
  // A generic reusable status structure (shared across different resources).
  isOpen: string;
  errorMessage?: string;
};

type AccessedFileData = FileData & Status;
type AccessedDatabaseData = DatabaseData & Status;

const file: AccessedFileData = {
  path: "/config/settings.json",
  content: "{ key: 'value' }",
  isOpen: "true",
};

const db: AccessedDatabaseData = {
  connectionUrl: "postgres://localhost:5432/mydb",
  credentials: "admin:1234",
  isOpen: "false",
  errorMessage: "Connection timeout",
};
```

---

# 90. More on Type Guards

---

```ts
type FileSource = { type: "file"; path: string };
const fileSource: FileSource = {
  type: "file",
  path: "some/path/to/file.csv",
};
//  function isFile(source: Source): source is FileSource

function isFile(source: Source) {
  return source.type === "file";
}

function loadData(source: Source) {
  // if ('path' in source) {
  if (isFile(source)) {
    // source.path
    // source.path; => use that to open the file
    return;
  }
  // source.connectionUrl; => to reach out to database
}
```

---

# 95. Working with Function Overloads

---

```ts
// Function overloading

// These declare multiple “shapes” of the same function to the TypeScript compiler:
// If you pass a string, TS will expect a string return.
// If you pass an array, TS will expect a number return.

function getLength(val: any[]): number;
function getLength(val: string): string;

function getLength(val: string | any[]) {
  // This is the actual function body that handles both cases:
  if (typeof val === "string") {
    const numberOfWords = val.split(" ").length;
    return `${numberOfWords} words`;
  }

  return val.length;
}

// TypeScript automatically picks the right overload based on the argument type — that’s the power of function overloading.
const numOfWords = getLength("Does this work");
numOfWords.length;
const numOfItems = getLength(["Does this work", "at all?"]);
```

---

# 96. Making Sense of Index Types

---

```ts
type DataStore = {
  // This is an index signature — it defines what all keys of the object can hold.

  // Any property (string key) must have a value that’s either a boolean or a number.
  [prop: string]: boolean | number;
};

let store: DataStore = {};

store.id = 5; // ✅ OK — number allowed
// store.name = "Radek" // ❌ Error —gir  string not assignable to boolean | number
```

---

# 97. Constant Types with "as const"

---

```ts
// Makes let as const, unavailable to change. Possibly good to use when changing is not allowed under specific scenario
let roles = ["admin", "guest", "editor"] as const;
console.log(roles);
```

---

# Section 8: Generic Types

---

# 103. Creating & Using a Generic Type

---

- T → general type (most common)
- U, V → second/third type params
- K → key
- V → value
- E → element (arrays)
- Item → readable in domain-specific code
- TypeOfUser → if you want clarity over brevity

```ts
let names: string[] = ["Rad", "Amy"]; // Normal type
let names2: Array<string> = ["Rad", "Amy"]; // Generic type

type DataStore<T> = {
  // <T> is a generic type parameter — it’s a placeholder for whatever type you pass later.
  [key: string]: T;
};

let store: DataStore<string | boolean> = {}; // Here, T becomes string | boolean.

store.name = "Rad";

store.isWorking = true;

let nameStore: DataStore<string> = {};
```

---

# 104. Generic Functions & Inference

---

```ts
function merge<T, U>(a: T, b: U) {
  return [a, b];
}
const ids = merge(1, "Rad"); // inferred = const ids: [number, string]

const ids2 = merge<number, string>(1, "Rad"); // explicit

console.log(ids);
console.log(ids2);
```

When to provide generics manually?

When TypeScript can’t infer the type.

When you want stricter typing (e.g., forcing a narrower type).

When using more complex objects where inference becomes ambiguous.

```ts
merge<{ id: number }, { name: string }>({ id: 1 }, { name: "Rad" });
```

Summary
merge(1, "Rad") → TypeScript infers types automatically.

merge<number, string>(...) → you explicitly specify them.

Both are valid; inference is almost always preferred unless TS guesses wrong.

---

# 106. Generics & Constraints

---

```ts
function mergeObj<T extends object>(a: T, b: T) {
  //    T extends object means:
  // T must be an object type
  // both a and b must be the same type T
  return { ...a, ...b };
}
const merged = mergeObj({ userName: "Rad" }, { age: 35 });
// ❌ Error: userName object is not the same type as age object
```

TypeScript tries to infer T:

For { userName: "Rad" }, T = { userName: string }

For { age: 35 }, T = { age: number }

These are not the same, so TS complains.

---

# 107. Constraints & Multiple Generic Types

---

```ts
function mergeObj<T extends object, U extends object>(a: T, b: U) {
  return { ...a, ...b };
}
const merged = mergeObj({ userName: "Rad" }, { age: 35 });
console.log(merged);
```

---

# 108. Working with Generic Classes & Interfaces

---

```ts
class User<T> {
  constructor(public id: T) {}
}

const user = new User("Rad");
console.log(user.id);
```

---

# Section 10: Deriving Types From Types

---

# 119. Using "typeof"

---

```ts
// A normal JavaScript constant containing a string value.
const userName = "Rad";

// Runtime "typeof" (JavaScript).
// This runs in the console and prints the TYPE of the VALUE at runtime.
// Output: "string"
console.log(typeof userName);

// TypeScript "typeof" (used in a TYPE position).
// This does NOT run at runtime. It extracts the *type* of the variable.
// Because userName is a constant and TS infers it as the literal "Rad",
// the type becomes: type UserName = "Rad"
type UserName = typeof userName;

// This prints the actual value "Rad" to the console at runtime.
console.log(userName);
```

---

# 120. "typeof" & A More Useful Example

---

```ts
// A plain JavaScript object. TypeScript infers the type automatically.
const settings = {
  difficulty: "easy",
  minLevel: 10,
  didStart: false,
  players: ["john", "Jane"],
};

// Use TypeScript's "typeof" in a *type position*.
// This copies the entire inferred type of the "settings" variable.
// TS expands it to an object type with the exact structure above.
//
// So "Settings" becomes:
//
// type Settings = {
//   difficulty: string;
//   minLevel: number;
//   didStart: boolean;
//   players: string[];
// };
//
// This keeps your types synced with your data without rewriting them manually.
type Settings = typeof settings;

// A function that accepts only values matching the "Settings" type.
// Anything missing or incorrectly typed will trigger an error.
function loadData(settings: Settings) {}
```

---

# 122. Extracting Keys with "keyof"

---

---

---

---

---

---

# Section 11: ECMAScript Decorators

---

What decorators are

Decorators are a metaprogramming feature.

They’re functions you attach to code (class, property, method) with @something.

Their purpose is to change or extend the behavior of the code they’re attached to.

Example idea:

@Length(5, 20)
title: string;

This decorator adds validation logic to that field.

Why decorators exist

They let you write code that modifies other code in a clean, declarative way.

They’re heavily used in frameworks like Angular, class-validator, NestJS, etc.

Two kinds of decorators in TypeScript

1. ECMAScript decorators (official)

Part of the JavaScript proposal (currently stage 3 → close to implemented).

TypeScript supports them already.

Will eventually work in plain JavaScript.

Modern syntax.

2. Experimental decorators (old)

Older proposal — won’t be added to JavaScript.

Only available in TypeScript.

Still widely used in existing TS projects (Angular, NestJS).

Requires "experimentalDecorators": true in tsconfig.json.

Big picture

Decorators = attach @something to a class/property/method → decorator function runs → your code behavior changes.

They’re optional — you can build whole apps without them.

Useful for validation, dependency injection, metadata, routing, Angular components, etc.

---

# 135. Exploring Different Types of Decorators

---

Decorators are designed for class-based structures – classes, methods, fields, and accessors (getters/setters).

They cannot be used on standalone functions or variables – only members of a class can be decorated.

Two decorator syntaxes exist in TypeScript (ECMAScript and experimental), but details come later.

Purpose of decorators is to modify or extend class behavior in a declarative, reusable way.

The instructor will show how to create, type, and apply method and field decorators in practice.

Why decorators cannot be used on plain functions

Short answer:
Because the decorator proposal in JavaScript was designed specifically for classes, not for free-standing functions.

Longer explanation (still concise):

The official ECMAScript decorator specification only supports class elements, not top-level functions.

JavaScript functions at the top level aren’t part of the class metadata model, so they don’t have the same structure decorators rely on.

Decorators work by receiving metadata about the class element they modify—its key, descriptor, access kind, etc.—which doesn’t exist for standalone functions.

Allowing decorators on free functions would require a new syntax and new semantics for how those functions are analysed and modified, which was out of scope for the current proposal.

---

# 136. Building a First Decorator

---

```ts
// A class decorator using the *new ECMAScript decorator signature*.
// T = any class constructor type
// ctx = metadata about what is being decorated (here: a class)
function logger<T extends new (...args: any[]) => any>(
  target: T,
  ctx: ClassDecoratorContext
) {
  // The original class constructor before decoration
  console.log(target);

  // Metadata provided by the new decorator system (name, kind = 'class', etc.)
  console.log(ctx);

  // Decorators can return a *new modified class* that replaces the original.
  // Here we create a subclass of the target.
  return class extends target {
    constructor(...args: any[]) {
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
@logger
class Person {
  // Instance field
  name = "Rad";

  greet() {
    console.log("Hi, I am " + this.name);
  }
}

// Creating an instance of the decorated class.
// Because the decorator returned a subclass, this instance is an instance of the modified class.
const rad = new Person();

// The instance now includes the extra constructor logic injected by the decorator.
console.log(rad);
```

Decorators solve a real problem:

Add behavior to classes without modifying the class itself.

Examples from real frameworks:

NestJS → @Controller, @Injectable, @Get

Angular → @Component

TypeORM → @Entity, @Column

class-validator → @MinLength, @IsEmail

They let you:

add logging

add metadata

perform dependency injection

auto-register classes

wrap/extend methods

enforce validation

configure routing

attach runtime behavior cleanly

All without touching the internal code.
