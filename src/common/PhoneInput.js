import React, { useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import CountryList from "react-native-country-picker-modal";
import TextInput from "./TextInput";
import Text from "./Text";
import { Colors } from "../config/Theme";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../config/Layout";
import { Back } from "../assets/images";
import { FontFamilies, FontSizes } from "../config/Theme";

const defaultInfo = {
  callingCode: ["91"],
  cca2: "IN",
  currency: ["INR"],
  flag: "flag-in",
  name: "India",
  region: "Asia",
  subregion: "Southern Asia",
};

const PhoneInput = ({ onChangeText, onChangeCode }) => {
  const [countryInfo, setCountryInfo] = useState(defaultInfo);

  const onSelect = (country) => {
    onChangeCode(country?.callingCode[0]);
    setCountryInfo(country);
  };

  return (
    <View style={styles.container}>
      <View style={styles.codeInputWrap}>
        <CountryList
          {...{
            countryCode: countryInfo?.cca2,
            renderCountryFilter: (props) => {
              return (
                <View
                  style={{
                    marginTop: SCREEN_WIDTH * 0.08,
                    width: SCREEN_WIDTH * 0.9,
                    right: SCREEN_WIDTH * 0.1,
                  }}
                >
                  <Text style={styles.title}>Select a Country</Text>
                  <TextInput
                    containerStyle={styles.phoneInput}
                    inputStyle={{ backgroundColor: "#edf1f7" }}
                    placeholder="Search for a country"
                    onChangeText={props.onChangeText}
                  />
                </View>
              );
            },
            closeButtonStyle: {
              marginBottom: SCREEN_HEIGHT * 0.14,
            },
            closeButtonImageStyle: {
              width: 35,
              height: 35,
            },
            withFlag: false,
            withCallingCodeButton: true,
            withCallingCode: true,
            closeButtonImage: Back,
            withFilter: true,
            theme: {
              fontSize: FontSizes.default,
              fontFamily: FontFamilies.sfMedium,
              activeOpacity: 1,
              primaryColorVariant: "transparent",
            },
            withAlphaFilter: true,
            onSelect,
          }}
        />
      </View>
      <TextInput
        inputStyle={{
          width: SCREEN_WIDTH * 0.64,
        }}
        keyboardType="phone-pad"
        placeholder="Enter Your Mobile Number"
        onChangeText={(val) => {
          if (countryInfo.cca2) {
            onChangeText(val);
          }
        }}
      />
    </View>
  );
};

export default PhoneInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  codeInput: {
    borderWidth: 1,
    paddingVertical: 12,
    marginBottom: 8,
    paddingHorizontal: 10,
    borderColor: "#e4e9f2",
    borderRadius: 12,
    color: Colors.input,
    fontSize: 15,
    width: 70,
  },
  codeInputWrap: {
    borderWidth: 1,
    borderColor: "#e4e9f2",
    height: Platform.OS === "ios" ? 44 : 50,
    borderRadius: 8,
    marginRight: 10,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  code: {
    position: "absolute",
    right: 0,
    top: 12,
    zIndex: 8,
    elevation: 3,
  },
  phoneInput: {
    marginTop: 20,
  },
});
