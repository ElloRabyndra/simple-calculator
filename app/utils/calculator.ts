import { OPERATORS } from "../constants/calculator";

export const isOperator = (char: string): boolean => {
  return OPERATORS.includes(char as any);
};

export const getLastNumber = (expression: string): string | null => {
  const lastNumberMatch = expression.match(/[\d.]+$/);
  return lastNumberMatch ? lastNumberMatch[0] : null;
};

export const countOpenParentheses = (expression: string): number => {
  const openCount = (expression.match(/\(/g) || []).length;
  const closeCount = (expression.match(/\)/g) || []).length;
  return openCount - closeCount;
};

export const calculate = (expression: string): string => {
  try {
    // Tutup semua kurung yang masih terbuka
    let processedExpression = expression;
    const openCount = countOpenParentheses(expression);
    
    if (openCount > 0) {
      processedExpression = expression + ")".repeat(openCount);
    }

    // Hapus operator di akhir jika ada
    processedExpression = processedExpression.replace(/[+\-×÷]$/, "");

    // Replace operator symbols with JavaScript operators
    let evalExpression = processedExpression
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/−/g, "-");

    const calculatedResult = eval(evalExpression);
    
    // Format hasil untuk menghindari floating point precision issues
    const roundedResult = Math.round(calculatedResult * 100000000) / 100000000;
    
    return String(roundedResult);
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