import { StyleSheet } from "react-native";
import { SCREEN_WIDTH } from "../config/Layout";
import { Colors } from "../config/Theme";

const globalStyles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  horizontalOffset: {
    marginHorizontal: SCREEN_WIDTH * 0.04,
  },
  hLine: {
    borderWidth: 0.4,
    marginHorizontal: SCREEN_WIDTH * 0.04,
    borderColor: Colors.gray,
  },
});

export default globalStyles;
