import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Touchable from "./Touchable";
import { Back, drawer, menu, Off, On } from "../assets/images";
import { FontFamilies, FontSizes, Colors } from "../config/Theme";

const Header = ({
  commonHeaderColor,

  withDrawermenuIcon = false,
  titleColor = Colors.navy_blue,
  titleFontfamily = FontFamilies.sfMedium,
  handleStatusData,
  title,
  withDrawerIcon = false,
  withBack = true,
  headerStyle = {},
  showStatusIcon = false,
  backgroundColor,
}) => {
  const [isOnline, setStatus] = useState("true");
  const { goBack, toggleDrawer } = useNavigation();

  const handleStatus = (value) => {
    let data;
    if (value === "true") {
      data = "true";
    } else {
      data = "false";
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
          <Image
            source={Back}
            resizeMode="contain"
            // style={{ tintColor: !!commonHeaderColor && Colors.navy_blue }}
          />
        </Touchable>
      )}

      {!!title && (
        <Text
          style={[
            styles.text,
            {
              color: titleColor,
              fontFamily: titleFontfamily,
            },
          ]}
        >
          {title}
        </Text>
      )}
      {showStatusIcon && isOnline == "false" ? (
        <Touchable style={styles.off} onPress={() => handleStatus("true")}>
          <Image source={Off} />
        </Touchable>
      ) : showStatusIcon && isOnline == "true" ? (
        <Touchable style={styles.off} onPress={() => handleStatus("false")}>
          <Image source={On} />
        </Touchable>
      ) : null}

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

    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: FontSizes.large,
    color: Colors.blue,
    fontFamily: FontFamilies.sfMedium,
    width: "60%",
    textAlign: "center",
  },
  menu: {
    height: 100,
    width: 100,
    right: 8,
  },
  off: {},
});
