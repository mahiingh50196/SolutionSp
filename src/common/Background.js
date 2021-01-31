import React from "react";
import { SafeAreaView, StyleSheet, View, StatusBar } from "react-native";
import Header from "./Header";
import { SCREEN_WIDTH } from "../config/Layout";

const Background = ({
  witNotchstyle,
  children,
  contentStyle,
  options = {
    headerShown: false,
    withBack: true,
    headerStyle: {},
  },
}) => {
  const { headerShown, title, withBack, headerStyle } = options;
  const contentViewStyle = Array.isArray(contentStyle)
    ? [styles.contentView, ...contentStyle]
    : [styles.contentView, contentStyle];

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={witNotchstyle} barStyle="dark-content" />
      <SafeAreaView
        style={[styles.statusBar, { backgroundColor: witNotchstyle }]}
      />
      {headerShown && (
        <Header title={title} withBack={withBack} headerStyle={headerStyle} />
      )}
      <View style={contentViewStyle}>{children}</View>
    </View>
  );
};

export default Background;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingVertical: 8,
  },
  statusBar: {
    flex: 0,
    backgroundColor: "#fff",
  },
  contentView: {
    paddingHorizontal: SCREEN_WIDTH * 0.04,
  },
});
