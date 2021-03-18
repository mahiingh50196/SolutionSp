import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../config/Layout";

const FullScreenLoader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default FullScreenLoader;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: "rgba(0,0,0,0.2)",
    zIndex: 5,
    justifyContent: "center",
  },
});
