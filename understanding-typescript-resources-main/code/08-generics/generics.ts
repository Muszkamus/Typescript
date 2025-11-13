class User<T> {
  constructor(public id: T) {}
}

const user = new User("Rad");
console.log(user.id);
