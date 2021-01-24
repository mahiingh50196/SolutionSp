import React from "react";
import { Text as RNText, StyleSheet } from "react-native";
import { FontFamilies, FontSizes } from "../config/Theme";

const Text = ({ children, style, ...other }) => {
  const textstyle = Array.isArray(style)
    ? [styles.text, ...style]
    : [styles.text, style];

  return (
    <RNText style={textstyle} {...other}>
      {children}
    </RNText>
  );
};

export default Text;

const styles = StyleSheet.create({
  text: {
    fontFamily: FontFamilies.poppinsLight,
    fontSize: FontSizes.default,
  },
});
