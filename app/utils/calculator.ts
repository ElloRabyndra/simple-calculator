import { OPERATORS } from "../constants/calculator";

export const isOperator = (char: string): boolean => {
  return OPERATORS.includes(char as any);
};

export const getLastNumber = (expression: string): string | null => {
  const lastNumberMatch = expression.match(/[\d.]+$/);
  return lastNumberMatch ? lastNumberMatch[0] : null;
};

export const calculate = (expression: string): string => {
  try {
    // Replace operator symbols with JavaScript operators
    let evalExpression = expression
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/−/g, "-");

    const calculatedResult = eval(evalExpression);
    return String(calculatedResult);
  } catch (error) {
    return "Error";
  }
};

export const shouldReplaceZero = (
  lastNumber: string | null,
  display: string
): boolean => {
  if (!lastNumber) {
    return display === "0";
  }
  return lastNumber === "0" && !lastNumber.includes(".");
};

export const hasDecimal = (number: string): boolean => {
  return number.includes(".");
};