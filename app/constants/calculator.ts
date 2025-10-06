import { Dimensions } from "react-native";

export const { width } = Dimensions.get("window");
export const BUTTON_SIZE = (width - 80) / 4;

export const OPERATORS = ["+", "−", "×", "÷"] as const;

export const BUTTON_COLORS = {
  number: {
    bg: "#FFFFFF",
    text: "#1E3A8A",
  },
  operator: {
    bg: "#3B82F6",
    text: "#FFFFFF",
  },
  clear: {
    bg: "#EF4444",
    text: "#FFFFFF",
  },
  backspace: {
    bg: "#F3F4F6",
    text: "#6B7280",
  },
  equals: {
    bg: "#10B981",
    text: "#FFFFFF",
  },
  parentheses: {
    bg: "#fcc800",
    text: "#FFFFFF",
  },
} as const;
