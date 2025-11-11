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
