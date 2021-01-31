import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Touchable from "./Touchable";
import { Back, drawer } from "../assets/images";
import { FontFamilies, FontSizes, Colors } from "../config/Theme";

const Header = ({
  title,
  withDrawerIcon = false,
  withBack = true,
  headerStyle = {},
  backgroundColor,
}) => {
  const { goBack, toggleDrawer } = useNavigation();
  return (
    <View style={[styles.container, headerStyle, backgroundColor]}>
      {withDrawerIcon && (
        <Touchable onPress={() => toggleDrawer()} style={styles.back}>
          <Image style={styles.menu} source={drawer} />
        </Touchable>
      )}
      {withBack && (
        <Touchable style={styles.back} onPress={goBack}>
          <Image source={Back} resizeMode="contain" />
        </Touchable>
      )}

      {!!title && <Text style={styles.text}>{title}</Text>}
      <View style={styles.back} />
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
    // backgroundColor: "pink",
    width: "60%",
    textAlign: "center",
  },
  menu: {
    height: 100,
    width: 100,
    right: 8,
  },
});
