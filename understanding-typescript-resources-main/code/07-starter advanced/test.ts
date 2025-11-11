type DataStore = {
  // This is an index signature — it defines what all keys of the object can hold.

  // Any property (string key) must have a value that’s either a boolean or a number.
  [prop: string]: boolean | number;
};

let store: DataStore = {};

store.id = 5; // ✅ OK — number allowed
// store.name = "Radek" // ❌ Error — string not assignable to boolean | number

// ----------------

// Makes let as const, unavailable to change. Possibly good to use when changing is not allowed under specific scenario
let roles = ["admin", "guest", "editor"] as const;
console.log(roles);
