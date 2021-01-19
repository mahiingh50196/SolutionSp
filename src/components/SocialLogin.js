import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Facebook from "../assets/images/Facebook.png";
import Twitter from "../assets/images/Twitter.png";
import { Touchable } from "../common";

import { FontSizes } from "../config/Theme";

export default function SocialLogin({ desc }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{desc}</Text>
      <View style={styles.socialiconwrapper}>
        <Touchable>
          <Image source={Facebook} />
        </Touchable>
        <Image source={Twitter} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  text: {
    color: "#8f9bb3",
    fontSize: FontSizes.small,
    textAlign: "center",
  },
  socialiconwrapper: {
    flexDirection: "row",
    //    paddingHorizontal:10,
    justifyContent: "space-evenly",
    marginTop: 30,
  },
});
