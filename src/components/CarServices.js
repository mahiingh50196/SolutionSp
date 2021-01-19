import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import {
  general,
  painting,
  spa,
  acservice,
  wheelalign,
  scratch,
} from "../assets/images";
import { FontFamilies, FontSizes, Colors } from "../config/Theme";

export default function CarServices() {
  return (
    <View style={styles.container}>
      <View style={styles.generalpaintingwrapper}>
        <View style={styles.generalwrap}>
          <Image source={general} />
          <Text style={styles.text}>General Service</Text>
        </View>
        <View style={styles.generalwrap}>
          <Image source={painting} />
          <Text style={styles.text}>Full Body Painting</Text>
        </View>
      </View>
      <View style={styles.spaacservicewrapper}>
        <View style={styles.generalwrap}>
          <Image source={spa} />
          <Text style={styles.spatext}>Complete Car Spa </Text>
        </View>
        <View style={styles.generalwrap}>
          <Image source={acservice} />
          <Text style={styles.text}>Ac Service</Text>
        </View>
      </View>
      <View style={styles.wheelscratchwrapper}>
        <View style={styles.generalwrap}>
          <Image source={wheelalign} />
          <Text style={styles.spatext}>Wheel Alignment </Text>
        </View>
        <View style={styles.generalwrap}>
          <Image source={scratch} />
          <Text style={styles.text}>Scratch Removal</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
  },
  generalpaintingwrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 10,
  },
  generalwrap: {
    flexDirection: "row",
    borderWidth: 2,
    borderRadius: 25,
    borderColor: "rgb(245, 245, 245)",
  },
  text: {
    alignSelf: "center",
    fontSize: FontSizes.medium,
    fontFamily: FontFamilies.sfMedium,
    color: Colors.blue,
    width: 100,
    marginLeft: 10,
  },
  spaacservicewrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 10,
    paddingVertical: 20,
  },
  spatext: {
    alignSelf: "center",
    fontSize: FontSizes.medium,
    fontFamily: FontFamilies.sfMedium,
    color: Colors.blue,
    width: 90,
    marginLeft: 10,
  },
  wheelscratchwrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 10,
    paddingVertical: 20,
  },
});
