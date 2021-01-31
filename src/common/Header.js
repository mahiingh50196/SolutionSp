import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Touchable from "./Touchable";
import { Back, drawer, menu, Off, On } from "../assets/images";
import { FontFamilies, FontSizes, Colors } from "../config/Theme";

const Header = ({
  navigation,
  Offswitcher,
  Onswitcher,
  withDrawermenuIcon,
  textcolor,
  handleStatusData,
  title,
  withDrawerIcon = false,
  withBack = true,
  headerStyle = {},
  backgroundColor,
}) => {
  const [isOnline, setStatus] = useState(true);
  const { goBack, toggleDrawer, props } = useNavigation();

  const handleStatus = (value) => {
    let data;
    if (value === true) {
      data = true;
    } else {
      data = false;
    }
    handleStatusData(data);
    setStatus(data);
  };

  return (
    <View style={[styles.container, headerStyle, backgroundColor]}>
      {withDrawerIcon && (
        <Touchable onPress={() => toggleDrawer()} style={styles.back}>
          <Image style={styles.menu} source={drawer} />
        </Touchable>
      )}
      {withDrawermenuIcon && (
        <Touchable onPress={() => toggleDrawer()} style={styles.back}>
          <Image source={menu} />
        </Touchable>
      )}
      {withBack && (
        <Touchable style={styles.back} onPress={goBack}>
          <Image source={Back} resizeMode="contain" />
        </Touchable>
      )}

      {!!title && (
        <Text
          style={[
            styles.text,
            {
              color: !!textcolor && Colors.white,
              fontFamily: !!textcolor && FontFamilies.sfBold,
            },
          ]}
        >
          {title}
        </Text>
      )}
      {!isOnline ? (
        <Touchable style={styles.off} onPress={() => handleStatus(true)}>
          <Image source={Off} />
        </Touchable>
      ) : (
        <Touchable style={styles.off} onPress={() => handleStatus(false)}>
          <Image source={On} />
        </Touchable>
      )}

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

    alignItems: "center",
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
  off: {
    // backgroundColor: "red",
  },
});
