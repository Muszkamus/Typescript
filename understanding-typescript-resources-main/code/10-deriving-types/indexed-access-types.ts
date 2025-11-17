// Old way of thinking:
// We have an object and we want to extract the "permissions" part.
// (Imagine we want the value of that specific field.)

// const appUser = {
//   name: "Rad",
//   age: 35,
//   permissions: [
//     { id: "p1", title: "Admin", description: "Admin Access" },
//   ], // <-- This is the part we're focused on
// };

// -----------------------------
// Indexed Type (TypeScript)
// -----------------------------
// This works like destructuring but for *types*, not values.

// Value destructuring example:
// const { permissions } = appUser;

// Type extraction equivalent:
// AppUser["permissions"] pulls out the *type* of that field.

type AppUser = {
  name: string;
  age: number;
  permissions: {
    id: string;
    title: string;
    description: string;
  }[];
};
// AppUser["permissions"] extracts the *type* of the permissions array.

type Perms = AppUser["permissions"];
// Perms is now the type: { id: string; title: string; description: string; }[]

type Perm = Perms[number];
// Perm extracts the type of ONE element from the array above.
// Equivalent to: { id: string; title: string; description: string }

type Names = string[];
// A normal array of strings.

type Name = Names[number];
// Name becomes the type of ONE array element → string

// .........
