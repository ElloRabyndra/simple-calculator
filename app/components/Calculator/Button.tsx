import { Text, TouchableOpacity } from "react-native";
import { BUTTON_SIZE } from "../../constants/calculator";

interface ButtonProps {
  value: string;
  onPress: () => void;
  bg?: string;
  textColor?: string;
  wide?: boolean;
  fontSize?: number;
}

export const Button = ({
  value,
  onPress,
  bg = "#FFFFFF",
  textColor = "#1E3A8A",
  wide = false,
  fontSize = 28,
}: ButtonProps) => (
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