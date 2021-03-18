import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontSizes, FontFamilies, Colors } from "../config/Theme";

export default function HeaderTitle({ childTitle }) {
  return (
    <View>
      <Text style={styles.title}>Forgot your password</Text>
      {!!childTitle && <Text style={styles.childtitle}>{childTitle}</Text>}
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: FontSizes.xxLarge,
    fontFamily: FontFamilies.sfBold,
    marginTop: 20,
  },
  childtitle: {
    marginTop: 10,
    fontSize: FontSizes.small,
    color: Colors.gray,
    width: "80%",
  },
});
