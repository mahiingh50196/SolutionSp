import React from "react";
import { StyleSheet } from "react-native";
import { Background, Text, Header } from "../../common";
import { userInfo } from "../../store/atoms/auth";
import { useRecoilValue } from "recoil";

export default function Home({ navigation }) {
  const info = useRecoilValue(userInfo);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (info && !info.isDocumentUploaded) {
        navigation.navigate("DocsUpload");
      }
    });

    return unsubscribe;
  }, [navigation, info]);

  return (
    <Background contentStyle={styles.contentStyle}>
      <Header withDrawerIcon withBack={false} />
      <Text>Welcome</Text>
    </Background>
  );
}

const styles = StyleSheet.create({
  contentStyle: {
    paddingHorizontal: 0,
  },
});
