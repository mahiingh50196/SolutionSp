import React, { useState } from "react";
import { Background, Text, TextInput } from "../common";
import { View, StyleSheet } from "react-native";
import CountryList, { HeaderModal } from "react-native-country-picker-modal";
import { Back } from "../assets/images";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../config/Layout";
import { FontFamilies, FontSizes } from "../config/Theme";

const CountryPicker = () => {
  const [countryCode, setCountryCode] = useState("IN");
  const [country, setCountry] = useState(null);

  const onSelect = (country) => {
    setCountryCode(country.cca2);
    setCountry(country);
  };

  return (
    <Background>
      <CountryList
        {...{
          countryCode,
          renderCountryFilter: (props) => {
            return (
              <View
                style={{
                  marginTop: SCREEN_HEIGHT * 0.08,
                  width: SCREEN_WIDTH * 0.9,
                  right: SCREEN_WIDTH * 0.1,
                }}
              >
                <Text style={styles.title}>Select a Country</Text>
                <TextInput
                  containerStyle={{
                    marginTop: 20,
                  }}
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
        visible
      />
    </Background>
  );
};

export default CountryPicker;

const styles = StyleSheet.create({
  title: {
    fontSize: FontSizes.xxLarge,
    fontFamily: FontFamilies.sfBold,
  },
});
