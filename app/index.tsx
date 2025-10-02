import { StatusBar, View } from "react-native";
import { ButtonGrid } from "./components/Calculator/ButtonGrid";
import { Display } from "./components/Calculator/Display";
import { useCalculator } from "./hooks/useCalculator";

export default function Calculator() {
  const {
    display,
    expression,
    result,
    handleNumberPress,
    handleOperationPress,
    handleEquals,
    handleClear,
    handleDecimal,
    handleBackspace,
  } = useCalculator();

  return (
    <View className="flex-1 bg-blue-50">
      <StatusBar barStyle="dark-content" />
      <View className="justify-end flex-1 px-5 pb-12 bg-gradient-to-b from-blue-50 to-blue-100">
        <Display expression={expression} result={result} display={display} />
        
        <ButtonGrid
          onNumberPress={handleNumberPress}
          onOperationPress={handleOperationPress}
          onEquals={handleEquals}
          onClear={handleClear}
          onDecimal={handleDecimal}
          onBackspace={handleBackspace}
        />
      </View>
    </View>
  );
}