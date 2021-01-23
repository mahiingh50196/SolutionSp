import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Background, Text, Header } from "../../common";
import { userInfo } from "../../store/atoms/auth";
import { useRecoilValue } from "recoil";

export default function Home({ navigation: { navigate } }) {
  const info = useRecoilValue(userInfo);

  useEffect(() => {
    const { isDocumentUploaded } = info;
    if (!isDocumentUploaded) {
      navigate("DocsUpload");
    }
  }, [info]);

  return (
    <Background contentStyle={styles.contentStyle}>
      <Header withDrawerIcon />
      <Text>Welcome</Text>
    </Background>
  );
}

const styles = StyleSheet.create({
  contentStyle: {
    paddingHorizontal: 0,
  },
});
