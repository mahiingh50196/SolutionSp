import React from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import { Header, Background, Touchable, Button } from "../../common";
import { onlineImg, date, clock, Mask } from "../../assets/images";
import { Colors, FontFamilies, FontSizes } from "../../config/Theme";

export default function Notification() {
  return (
    <Background>
      <Header
        withBack={false}
        withDrawerIcon={true}
        headerStyle={{ backgroundColor: "red" }}
      />
    </Background>
  );
}

const styles = StyleSheet.create({
  mainview: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
});
