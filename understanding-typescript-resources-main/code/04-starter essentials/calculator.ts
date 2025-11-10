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
