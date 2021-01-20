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
}) => {
  const { headerShown, title } = options;
  const contentViewStyle = Array.isArray(contentStyle)
    ? [styles.contentView, ...contentStyle]
    : [styles.contentView, contentStyle];

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.statusBar} />
      {headerShown && <Header title={title} />}
      <View style={contentViewStyle}>{children}</View>
    </SafeAreaView>
  );
};

export default Background;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  statusBar: {
    flex: 0,
    backgroundColor: "#fff",
  },
  contentView: {
    paddingHorizontal: SCREEN_WIDTH * 0.04,
  },
});
