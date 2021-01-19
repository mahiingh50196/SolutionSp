import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import Touchable from "./Touchable";
import Text from "./Text";
import { Colors, FontFamilies } from "../config/Theme";

const Button = ({
  type = "primary",
  title = "Submit",
  width = null,
  onPress = () => {},
  style = {},
  isLoading = false,
}) => {
  const renderButton = () => {
    switch (type) {
      case "primary":
        return (
          <Touchable onPress={onPress}>
            <View
              style={[
                styles.wrapPrimary,
                {
                  width,
                },
                style,
              ]}
            >
              {!isLoading && <Text style={styles.buttonText}>{title}</Text>}
            </View>
          </Touchable>
        );
      case "secondary":
        return (
          <Touchable onPress={onPress}>
            <View
              style={[
                styles.wrapSecondary,
                {
                  width,
                },
                style,
              ]}
            >
              {!isLoading && <Text style={styles.buttonText}>{title}</Text>}
            </View>
          </Touchable>
        );
      case "transparent":
        return (
          <Touchable onPress={onPress}>
            <View
              style={[
                styles.wrapTranaparent,
                {
                  width,
                },
                style,
              ]}
            >
              {!isLoading && (
                <Text style={styles.buttonTransparentText}>{title}</Text>
              )}
            </View>
          </Touchable>
        );
      default:
        return <></>;
    }
  };
  return (
    <View>
      {isLoading && (
        <View style={styles.indicator}>
          <ActivityIndicator animating color="red" />
        </View>
      )}
      {renderButton()}
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  wrapSecondary: {
    padding: 12,
    borderRadius: 8,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: Colors.buttonText,
  },
  wrapPrimary: {
    backgroundColor: "#41d5fb",
    padding: 12,
    borderRadius: 8,
    paddingHorizontal: 20,
  },
  wrapTranaparent: {
    backgroundColor: "transparent",
    padding: 12,
    borderRadius: 8,
    paddingHorizontal: 20,
  },
  buttonTransparentText: {
    textAlign: "center",
    color: Colors.primary,
    fontFamily: FontFamilies.sfRegular,
  },
  buttonText: {
    textAlign: "center",
    color: Colors.buttonText,
    fontFamily: FontFamilies.sfBold,
  },
  indicator: {
    position: "absolute",

    top: 15,

    zIndex: 5,
    alignSelf: "center",
  },
});
