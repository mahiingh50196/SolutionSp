import {
  TextInput as RNInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { Colors, FontSizes, FontFamilies } from "../config/Theme";
import Text from "./Text";
import { Cross } from "../assets/images";
import Feather from "react-native-vector-icons/Feather";

const TextInput = ({
  label,
  onChangeText,
  inputStyle,
  containerStyle,
  errorMessage,
  withEye = false,
  dafaultValue,
  labelStyle,
  ...props
}) => {
  const [value, setValue] = React.useState("");
  const [focused, setFocused] = React.useState(false);
  const [isSecureText, setSecureText] = React.useState(false);

  const borderColor = {
    borderColor: focused ? "#41d5fb" : "#e4e9f2",
  };

  const textInputstyle = Array.isArray(inputStyle)
    ? [styles.input, borderColor, ...inputStyle]
    : [styles.input, borderColor, inputStyle];

  const inputContainer = Array.isArray(containerStyle)
    ? [...containerStyle]
    : containerStyle;

  function handleInput(val) {
    onChangeText(val);
    setValue(val);
  }

  return (
    <View>
      {!!label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <View style={inputContainer}>
        <RNInput
          focusBorderColor="#41d5fb"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={textInputstyle}
          onChangeText={handleInput}
          secureTextEntry={isSecureText}
          value={value || dafaultValue}
          {...props}
        />
        {withEye && (
          <TouchableOpacity
            style={styles.eye}
            onPress={() => {
              setSecureText(!isSecureText);
            }}
          >
            <Feather
              name={isSecureText ? "eye-off" : "eye"}
              color="#8f9bb3"
              size={22}
            />
          </TouchableOpacity>
        )}
        {focused && (
          <TouchableOpacity
            style={styles.cross}
            onPress={() => {
              setValue(null);
            }}
          >
            <Image
              source={Cross}
              resizeMode="contain"
              style={styles.crossIcon}
            />
          </TouchableOpacity>
        )}
      </View>
      {!!errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    paddingVertical: 12,
    marginBottom: 8,
    paddingHorizontal: 10,
    borderColor: "#e4e9f2",
    borderRadius: 12,
    color: Colors.input,
    fontSize: 15,
  },
  label: {
    marginBottom: 8,
    color: Colors.black,
    fontFamily: FontFamilies.sfSemiBold,
  },
  cross: {
    position: "absolute",
    right: 8,
    height: "100%",
    justifyContent: "center",
    bottom: 3,
  },
  crossIcon: {
    height: 20,
    width: 20,
  },
  error: {
    fontSize: FontSizes.small,
    color: Colors.danger,
  },
  eye: {
    position: "absolute",
    right: 50,
    height: "100%",
    justifyContent: "center",
    bottom: 3,
  },
});
