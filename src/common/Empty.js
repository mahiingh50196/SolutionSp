import React from "react";
import { View, StyleSheet } from "react-native";
import { FontFamilies } from "../config/Theme";
import Text from "./Text";

const Empty = ({ title = "No Data" }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

export default Empty;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    fontFamily: FontFamilies.poppinsMedium,
  },
});
