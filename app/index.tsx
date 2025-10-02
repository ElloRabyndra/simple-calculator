import * as Haptics from "expo-haptics";
import { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");
const BUTTON_SIZE = (width - 80) / 4;

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleNumberPress = (num: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    const lastChar = expression.slice(-1);
    const isLastCharOperator = ["+", "−", "×", "÷"].includes(lastChar);
    const lastNumberMatch = expression.match(/[\d.]+$/);
    const lastNumber = lastNumberMatch ? lastNumberMatch[0] : null;

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

    // Jika tidak ada lastNumber (mis. expression kosong)
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
    if (lastNumber === "0" && !lastNumber.includes(".")) {
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
      const isLastCharOperator = ["+", "−", "×", "÷"].includes(lastChar);

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

  const calculate = () => {
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

  const handleEquals = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    if (expression) {
      const calculatedResult = calculate();
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
    const lastNumberMatch = expression.match(/[\d.]+$/);
    const lastNumber = lastNumberMatch ? lastNumberMatch[0] : display;

    if (!lastNumber.includes(".")) {
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

  const Button = ({
    value,
    onPress,
    bg = "#FFFFFF",
    textColor = "#1E3A8A",
    wide = false,
    fontSize = 28,
  }: any) => (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={`justify-center items-center rounded-2xl ${
        wide ? "flex-[2]" : "flex-1"
      }`}
      style={{
        backgroundColor: bg,
        height: BUTTON_SIZE - 8,
        marginHorizontal: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <Text style={{ color: textColor, fontSize, fontWeight: "700" }}>
        {value}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-blue-50">
      <StatusBar barStyle="dark-content" />
      <View className="justify-end flex-1 px-5 pb-12 bg-gradient-to-b from-blue-50 to-blue-100">
        {/* Display */}
        <View
          className="p-6 mb-8 bg-white shadow-lg rounded-3xl"
          style={{ minHeight: 160 }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}
          >
            {/* Expression */}
            <Text
              className="mb-3 text-2xl font-medium text-right text-blue-400"
              numberOfLines={3}
            >
              {expression || "0"}
            </Text>

            {/* Result */}
            {result !== "" && (
              <View className="pt-2 border-t border-blue-100">
                <Text className="mb-1 text-sm font-medium text-right text-blue-500">
                  = {result}
                </Text>
              </View>
            )}

            {/* Current Display */}
            <Animated.View style={animatedStyle}>
              <Text
                className="font-bold text-right text-blue-900"
                style={{ fontSize: 56 }}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                {display}
              </Text>
            </Animated.View>
          </ScrollView>
        </View>

        {/* Buttons */}
        <View className="gap-3">
          {/* Row 1 */}
          <View className="flex-row gap-2">
            <Button
              value="C"
              onPress={handleClear}
              bg="#EF4444"
              textColor="#FFFFFF"
            />
            <Button
              value="⌫"
              onPress={handleBackspace}
              bg="#F3F4F6"
              textColor="#6B7280"
            />
            <Button
              value="÷"
              onPress={() => handleOperationPress("÷")}
              bg="#3B82F6"
              textColor="#FFFFFF"
            />
          </View>

          {/* Row 2 */}
          <View className="flex-row gap-2">
            <Button value="7" onPress={() => handleNumberPress("7")} />
            <Button value="8" onPress={() => handleNumberPress("8")} />
            <Button value="9" onPress={() => handleNumberPress("9")} />
            <Button
              value="×"
              onPress={() => handleOperationPress("×")}
              bg="#3B82F6"
              textColor="#FFFFFF"
            />
          </View>

          {/* Row 3 */}
          <View className="flex-row gap-2">
            <Button value="4" onPress={() => handleNumberPress("4")} />
            <Button value="5" onPress={() => handleNumberPress("5")} />
            <Button value="6" onPress={() => handleNumberPress("6")} />
            <Button
              value="−"
              onPress={() => handleOperationPress("−")}
              bg="#3B82F6"
              textColor="#FFFFFF"
            />
          </View>

          {/* Row 4 */}
          <View className="flex-row gap-2">
            <Button value="1" onPress={() => handleNumberPress("1")} />
            <Button value="2" onPress={() => handleNumberPress("2")} />
            <Button value="3" onPress={() => handleNumberPress("3")} />
            <Button
              value="+"
              onPress={() => handleOperationPress("+")}
              bg="#3B82F6"
              textColor="#FFFFFF"
            />
          </View>

          {/* Row 5 */}
          <View className="flex-row gap-2">
            <Button value="0" onPress={() => handleNumberPress("0")} wide />
            <Button value="." onPress={handleDecimal} />
            <Button
              value="="
              onPress={handleEquals}
              bg="#10B981"
              textColor="#FFFFFF"
            />
          </View>
        </View>
      </View>
    </View>
  );
}
