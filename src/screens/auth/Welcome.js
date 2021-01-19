import React from "react";
import { ImageBackground, View, StyleSheet, Image } from "react-native";
import { globalStyles, Button } from "../../common";
import { Welcome as WelcomeBG, WelcomeLogo } from "../../assets/images";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../config/Layout";

const Welcome = ({ navigation: { navigate } }) => (
  <View style={globalStyles.flexOne}>
    <ImageBackground
      source={WelcomeBG}
      style={styles.imgBackground}
      resizeMode="cover"
    >
      <Image source={WelcomeLogo} resizeMode="contain" style={styles.logo} />
      <View style={styles.bottom}>
        <Button title="Signup" width={140} onPress={() => navigate("Signup")} />
        <View style={styles.space} />
        <Button
          title="Login"
          type="secondary"
          width={140}
          onPress={() => navigate("Login")}
        />
      </View>
    </ImageBackground>
  </View>
);

export default Welcome;

const styles = StyleSheet.create({
  imgBackground: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  logo: {
    alignSelf: "center",
    marginTop: SCREEN_HEIGHT * 0.12,
  },
  bottom: {
    flexDirection: "row",
    position: "absolute",
    bottom: SCREEN_HEIGHT * 0.1,
    justifyContent: "space-between",
    alignSelf: "center",
  },
  space: {
    width: 30,
  },
});
