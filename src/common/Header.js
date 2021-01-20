import React from "react";
import { View, Text, StyleSheet, Image, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Touchable from "./Touchable";
import { Back } from "../assets/images";
import { FontFamilies, FontSizes, Colors } from "../config/Theme";

const Header = ({ title }) => {
  const { goBack } = useNavigation();
  return (
    <View style={styles.container}>
      <Touchable style={styles.back} onPress={goBack}>
        <Image source={Back} resizeMode="contain" />
      </Touchable>
      {!!title && <Text style={styles.text}>{title}</Text>}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  back: {
    paddingLeft: 8,
    width: "20%",
    alignItems: "flex-start",
  },
  text: {
    fontSize: FontSizes.large,
    color: Colors.blue,
    fontFamily: FontFamilies.sfMedium,
    width: "80%",
    paddingLeft: "15%",
  },
});
