import React from "react";
import { StyleSheet, View } from "react-native";
import Navigation from "./src/navigation";
import { RecoilRoot } from "recoil";
import { RootSiblingParent } from "react-native-root-siblings";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export default function App() {
  return (
    <View style={styles.container}>
      <BottomSheetModalProvider>
        <RootSiblingParent>
          <RecoilRoot>
            <Navigation />
          </RecoilRoot>
        </RootSiblingParent>
      </BottomSheetModalProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  statusBar: {
    flex: 0,
  },
});
