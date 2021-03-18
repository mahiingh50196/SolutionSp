import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import Header from "./Header";
import { SCREEN_WIDTH } from "../config/Layout";

const Background = ({
  children,
  contentStyle,
  options = {
    headerShown: false,
  },
  statusBarColor,
}) => {
  const { headerShown } = options;
  const contentViewStyle = Array.isArray(contentStyle)
    ? [styles.containerView, ...contentStyle]
    : [styles.containerView, contentStyle];

  const statusBarStyle = statusBarColor
    ? {
        backgroundColor: statusBarColor,
      }
    : {
        backgroundColor: "#eee",
      };

  return (
    <SafeAreaView style={[styles.container, statusBarStyle]}>
      <SafeAreaView style={styles.statusBar} />
      {headerShown && <Header />}
      <View style={contentViewStyle}>{children}</View>
    </SafeAreaView>
  );
};

export default Background;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
  statusBar: {
    flex: 0,
  },
  containerView: {
    flex: 1,
    paddingHorizontal: SCREEN_WIDTH * 0.04,
    backgroundColor: "#fff",
  },
});
