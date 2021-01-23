import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Touchable from "./Touchable";
import { Back, drawer } from "../assets/images";
import { FontFamilies, FontSizes, Colors } from "../config/Theme";
import { SCREEN_WIDTH } from "../config/Layout";

const Header = ({ title, withDrawerIcon }) => {
  const { goBack, toggleDrawer } = useNavigation();
  return (
    <View style={styles.container}>
      {withDrawerIcon ? (
        <Touchable onPress={() => toggleDrawer()}>
          <Image style={styles.menu} source={drawer} />
        </Touchable>
      ) : (
        <Touchable style={styles.back} onPress={goBack}>
          <Image source={Back} resizeMode="contain" />
        </Touchable>
      )}

      {!!title && <Text style={styles.text}>{title}</Text>}
      <View />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  },
  menu: {
    height: 100,
    width: 100,
    right: 8,
  },
});
