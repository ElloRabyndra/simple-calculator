import { View } from "react-native";
import { BUTTON_COLORS } from "../../constants/calculator";
import { Button } from "./Button";

interface ButtonGridProps {
  onNumberPress: (num: string) => void;
  onOperationPress: (op: string) => void;
  onEquals: () => void;
  onClear: () => void;
  onDecimal: () => void;
  onBackspace: () => void;
}

export const ButtonGrid = ({
  onNumberPress,
  onOperationPress,
  onEquals,
  onClear,
  onDecimal,
  onBackspace,
}: ButtonGridProps) => {
  return (
    <View className="gap-3">
      {/* Row 1 */}
      <View className="flex-row gap-2">
        <Button
          value="C"
          onPress={onClear}
          bg={BUTTON_COLORS.clear.bg}
          textColor={BUTTON_COLORS.clear.text}
        />
        <Button
          value="⌫"
          onPress={onBackspace}
          bg={BUTTON_COLORS.backspace.bg}
          textColor={BUTTON_COLORS.backspace.text}
        />
        <Button
          value="÷"
          onPress={() => onOperationPress("÷")}
          bg={BUTTON_COLORS.operator.bg}
          textColor={BUTTON_COLORS.operator.text}
        />
      </View>

      {/* Row 2 */}
      <View className="flex-row gap-2">
        <Button value="7" onPress={() => onNumberPress("7")} />
        <Button value="8" onPress={() => onNumberPress("8")} />
        <Button value="9" onPress={() => onNumberPress("9")} />
        <Button
          value="×"
          onPress={() => onOperationPress("×")}
          bg={BUTTON_COLORS.operator.bg}
          textColor={BUTTON_COLORS.operator.text}
        />
      </View>

      {/* Row 3 */}
      <View className="flex-row gap-2">
        <Button value="4" onPress={() => onNumberPress("4")} />
        <Button value="5" onPress={() => onNumberPress("5")} />
        <Button value="6" onPress={() => onNumberPress("6")} />
        <Button
          value="−"
          onPress={() => onOperationPress("−")}
          bg={BUTTON_COLORS.operator.bg}
          textColor={BUTTON_COLORS.operator.text}
        />
      </View>

      {/* Row 4 */}
      <View className="flex-row gap-2">
        <Button value="1" onPress={() => onNumberPress("1")} />
        <Button value="2" onPress={() => onNumberPress("2")} />
        <Button value="3" onPress={() => onNumberPress("3")} />
        <Button
          value="+"
          onPress={() => onOperationPress("+")}
          bg={BUTTON_COLORS.operator.bg}
          textColor={BUTTON_COLORS.operator.text}
        />
      </View>

      {/* Row 5 */}
      <View className="flex-row gap-2">
        <Button value="0" onPress={() => onNumberPress("0")} wide />
        <Button value="." onPress={onDecimal} />
        <Button
          value="="
          onPress={onEquals}
          bg={BUTTON_COLORS.equals.bg}
          textColor={BUTTON_COLORS.equals.text}
        />
      </View>
    </View>
  );
};