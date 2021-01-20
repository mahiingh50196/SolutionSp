import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Background } from "../../common";
import { Drivinglicence } from "../../assets/images";

export default function Docshare() {
  return (
    <Background options={{ headerShown: true, title: "Address Proof" }}>
      <View style={styles.uploadimage}>
        <View>
          <Image source={Drivinglicence} />
        </View>
        <View style={styles.uploadtext}>
          <Text>Update photo</Text>
        </View>
      </View>
    </Background>
  );
}
const styles = StyleSheet.create({
  uploadimage: {
    padding: 10,
    marginTop: 30,
  },
  uploadtext: {
    justifyContent: "center",
    alignItems: "center",
  },
});
