// Project Brief: Bank Account Simulator

// We need a simple TypeScript program that simulates how a basic bank account works.
// The program should represent a customer’s account, allow deposits and withdrawals, and prevent invalid actions (like withdrawing too much or depositing negative amounts).
// --------- Done -------------
// Core Requirements
// Create an Account class that holds:
// An owner name
// A private balance (starts at 0 by default)
// ----------Done--------------

// The class must have the following methods:
// deposit(amount: number) → adds money to the account
// Reject deposits of zero or negative values (throw an error)
// withdraw(amount: number) → removes money from the account
// Reject withdrawals larger than the current balance (throw an error)
// A read-only getter balance → returns the current balance

// Behavior Example
// A user opens an account named “Alice”.
// She deposits £500.
// She tries to withdraw £700 → the program throws an error.
// She withdraws £200 → balance becomes £300.
// Printing the balance should display: Current balance: £300.

// Technical Expectations
// Use TypeScript classes, getters/setters, and access modifiers (private, public).
// Include basic runtime error handling using try/catch.
// Code should be clean, with descriptive method names and error messages.

// Output should be printed to the console.
// Goal
// This task is mainly to show you can use TypeScript to model real-world entities using classes, validation, and encapsulation.

const bankName = "Rad";
const initialBalance = 0;

class Account {
  private _userName: string = bankName;
  private _userBalance: number = initialBalance;

  set name(userName: string) {
    if (userName.trim() === "") {
      throw new Error("Name is empty!");
    }
    this._userName = userName;
  }

  deposit(value: number) {
    if (value <= 0) {
      throw new Error("Cannot deposit 0 or less!");
    }
    this._userBalance += value;
    return this._userBalance;
  }

  withdraw(value: number) {
    if (value > this._userBalance)
      throw new Error("Cannot withdraw! Not enough money in the bank");
    if (value <= 0)
      throw new Error("Cannot withdraw! Unable to withdraw 0 or less!");

    this._userBalance -= value;
    return this._userBalance;
  }

  get currentBalance(): string {
    return `Current balance: ${this._userBalance}`;
  }
}

const user1 = new Account();
user1.name = bankName;

user1.deposit(500);
user1.withdraw(300);

console.log(user1.currentBalance);
