import { ScrollView, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

interface DisplayProps {
  expression: string;
  result: string;
  display: string;
}

export const Display = ({ expression, result, display }: DisplayProps) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
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
  );
};