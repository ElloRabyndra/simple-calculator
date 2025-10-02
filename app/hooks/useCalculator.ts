import * as Haptics from "expo-haptics";
import { useState } from "react";
import { calculate, getLastNumber, hasDecimal, isOperator, shouldReplaceZero } from "../utils/calculator";

export const useCalculator = () => {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");

  const handleNumberPress = (num: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    const lastChar = expression.slice(-1);
    const isLastCharOperator = isOperator(lastChar);
    const lastNumber = getLastNumber(expression);

    // Jika sebelumnya menekan '=' dan ada result, mulai expression baru
    if (result !== "") {
      setDisplay(num);
      setExpression(num);
      setResult("");
      return;
    }

    // Jika baru memulai angka setelah operator, append normal
    if (isLastCharOperator) {
      setDisplay(num);
      setExpression(expression + num);
      return;
    }

    // Jika tidak ada lastNumber 
    if (!lastNumber) {
      // Jika display = "0" dan tekan digit non-zero -> ganti 0 dengan digit
      if (display === "0") {
        setDisplay(num);
        setExpression(num);
      } else {
        // kondisi normal: append
        setDisplay(display + num);
        setExpression(expression + num);
      }
      return;
    }

    // Jika angka yang sedang diketik hanya "0" tanpa desimal, ganti 0 dengan digit baru
    if (shouldReplaceZero(lastNumber, display)) {
      setDisplay(num);
      setExpression(expression.slice(0, -1) + num);
      return;
    }

    // default: append digit
    setDisplay(display === "0" ? num : display + num);
    setExpression(expression + num);
  };

  const handleOperationPress = (op: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    if (result !== "") {
      setExpression(result + op);
      setDisplay(result);
      setResult("");
    } else {
      // Cek apakah karakter terakhir adalah operator
      const lastChar = expression.slice(-1);
      const isLastCharOperator = isOperator(lastChar);

      if (isLastCharOperator) {
        // Ganti operator terakhir dengan operator baru
        setExpression(expression.slice(0, -1) + op);
      } else {
        // Tambahkan operator baru
        setExpression(expression + op);
      }
      // Display tidak berubah, tetap menampilkan angka terakhir
    }
  };

  const handleEquals = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    if (expression) {
      const calculatedResult = calculate(expression);
      setResult(calculatedResult);
      setDisplay(calculatedResult);
    }
  };

  const handleClear = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setDisplay("0");
    setExpression("");
    setResult("");
  };

  const handleDecimal = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    // Check if current number already has decimal
    const lastNumber = getLastNumber(expression) || display;

    if (!hasDecimal(lastNumber)) {
      setDisplay(display + ".");
      setExpression(expression + ".");
    }
  };

  const handleBackspace = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (result !== "") {
      setResult("");
      setDisplay("0");
      setExpression("");
    } else if (expression.length > 0) {
      const newExpression = expression.slice(0, -1);
      setExpression(newExpression);

      // Update display to show last number or operator
      const match = newExpression.match(/[\d.]+$/);
      setDisplay(match ? match[0] : newExpression.slice(-1) || "0");
    } else {
      setDisplay("0");
    }
  };

  return {
    display,
    expression,
    result,
    handleNumberPress,
    handleOperationPress,
    handleEquals,
    handleClear,
    handleDecimal,
    handleBackspace,
  };
};