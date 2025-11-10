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
