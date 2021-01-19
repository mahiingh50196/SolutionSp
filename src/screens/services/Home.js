import React from "react";
import { StyleSheet } from "react-native";
import { Background } from "../../common";
import { Map, CarServices } from "../../components";
import { userInfo } from "../../store/atoms/auth";
import { useRecoilValue } from "recoil";

export default function Home() {
  const info = useRecoilValue(userInfo);
  console.log(info);

  return (
    <Background contentStyle={styles.contentStyle}>
      <Map />
      <CarServices />
    </Background>
  );
}

const styles = StyleSheet.create({
  contentStyle: {
    paddingHorizontal: 0,
  },
});
