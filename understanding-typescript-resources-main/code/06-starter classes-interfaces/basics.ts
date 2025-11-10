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
