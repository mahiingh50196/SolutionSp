import { StyleSheet } from "react-native";
import { SCREEN_WIDTH } from "../config/Layout";

const globalStyles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  horizontalOffset: {
    marginHorizontal: SCREEN_WIDTH * 0.04,
  },
});

export default globalStyles;
