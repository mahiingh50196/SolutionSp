import React from "react";
import { View, Text, StyleSheet, Image, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Touchable from "./Touchable";
import { Back } from "../assets/images";

const Header = ({ title }) => {
  const { goBack } = useNavigation();
  return (
    <View style={styles.container}>
      <Touchable style={styles.back} onPress={goBack}>
        <Image source={Back} resizeMode="contain" />
      </Touchable>
      {!!title && <Text>{title}</Text>}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  back: {
    paddingLeft: 8,
  },
});
