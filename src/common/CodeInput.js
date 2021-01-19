import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Colors, FontFamilies } from "../config/Theme";

const CodeInput = ({
  codeLength,
  onFullFill,
  containerStyle,
  resetOnFullFill,
}) => {
  const arr = Array(codeLength).join(".").split(".");
  const inputRefs = [];
  const [inputArray, setInputArray] = useState(arr);
  const [focused, setFocused] = useState(0);

  function handleCodeChange(currentIdx, value) {
    const updatedInputArray = inputArray.map((item, idx) => {
      if (idx === currentIdx) {
        return value;
      }
      return item;
    });

    if (value && currentIdx !== codeLength - 1) {
      inputRefs[currentIdx + 1]?.focus();
    }

    setInputArray(updatedInputArray);
    if (updatedInputArray.join("").length === codeLength) {
      onFullFill(updatedInputArray.join(""));
      if (resetOnFullFill) {
        setInputArray(arr);
        inputRefs[0]?.focus();
      }
    }
  }

  function handleKeyPress(e) {
    if (e.nativeEvent.key === "Backspace") {
      if (!inputArray[focused]) {
        const nextIndex = focused > 0 ? focused - 1 : 0;
        inputRefs[nextIndex]?.focus();
      }
    }
  }

  function renderInputs() {
    return inputArray.map((item, idx) => (
      <TextInput
        // eslint-disable-next-line react/no-array-index-key
        key={idx}
        ref={(ref) => (inputRefs[idx] = ref)}
        maxLength={1}
        style={[
          styles.input,
          {
            borderColor: focused === idx ? Colors.primary : "#e4e9f2",
          },
        ]}
        autoFocus={idx === 0}
        selectionColor={Colors.primary}
        value={item}
        onChangeText={(value) => handleCodeChange(idx, value)}
        keyboardType="numeric"
        onFocus={() => {
          setFocused(idx);
        }}
        onKeyPress={handleKeyPress}
      />
    ));
  }

  return (
    <View style={[styles.container, containerStyle]}>{renderInputs()}</View>
  );
};

export default CodeInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  input: {
    width: 80,
    borderColor: "#aaa",
    height: 80,
    fontSize: 34,
    borderWidth: 1,
    borderRadius: 34,
    textAlign: "center",
    alignSelf: "center",
    fontFamily: FontFamilies.sfBold,
  },
});
