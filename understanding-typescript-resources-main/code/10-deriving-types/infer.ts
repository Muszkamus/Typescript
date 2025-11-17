function add(a: number, b: number) {
  return a + b;
}
// A normal function returning a number

type AddFn = typeof add;
// typeof add extracts the function's type signature

type ReturnValueType<T> = T extends (...args: any[]) => infer RV ? RV : T;
// If T is a function type, infer RV = its return value type
// Otherwise, just return T unchanged

type AddReturnValue = ReturnValueType<AddFn>;
// AddFn is a function → TS infers RV = number
// So AddReturnValue = number
