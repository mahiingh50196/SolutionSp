import { StyleSheet } from "react-native";
import { SCREEN_WIDTH } from "../config/Layout";
import { Colors } from "../config/Theme";

const globalStyles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  flexEnd: {
    justifyContent: "flex-end",
  },
  horizontalOffset: {
    marginHorizontal: SCREEN_WIDTH * 0.04,
  },
  hLine: {
    borderWidth: 0.4,
    marginHorizontal: SCREEN_WIDTH * 0.04,
    borderColor: Colors.gray,
  },
  headerMenuIcon: {
    height: 18,
    width: 18,
    marginLeft: 12,
  },
  pbxl: {
    paddingBottom: 40,
  },
});

export default globalStyles;
