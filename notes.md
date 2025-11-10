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

```ts
class User {
  private _firstName: string = "";
  private _lastName: string = "";

  set firstName(name: string) {
    if (name.trim() === "") {
      throw new Error("Invalid name");
    }
    this._firstName = name;
  }
  set lastName(name: string) {
    if (name.trim() === "") {
      throw new Error("Invalid name");
    }
    this._lastName = name;
  }

  get fullName() {
    // getter by default makes it public
    return this._firstName + " " + this._lastName;
  }
}

const radek = new User();

radek.firstName = "Radek";
radek.lastName = "Doe";

console.log(radek.fullName);
```
