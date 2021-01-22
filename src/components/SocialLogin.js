import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, Alert } from "react-native";
import * as GoogleSignIn from "expo-google-sign-in";
import FacebookIcon from "../assets/images/Facebook.png";
import Twitter from "../assets/images/Twitter.png";
import { Touchable } from "../common";
import { useSetRecoilState } from "recoil";

import { userInfo } from "../store/atoms/auth";
import { FontSizes } from "../config/Theme";
import { api } from "../services";
import * as Facebook from "expo-facebook";

export default function SocialLogin({ desc }) {
  const setUserInfo = useSetRecoilState(userInfo);
  useEffect(() => {
    GoogleSignIn.initAsync();
  }, []);

  const signInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === "success") {
        const {
          auth: { accessToken },
          displayName,
          email,
        } = user;
        const formData = new FormData();
        formData.append("socialKey", accessToken);
        formData.append("fullName", displayName);
        formData.append("email", email);
        api({
          method: "post",
          url: "/Provider/LoginGmail",
          data: formData,
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }).then((res) => {
          const {
            data: { data },
          } = res;
          if (data) {
            setUserInfo(res.data?.data);
          }
        });
      }
    } catch ({ message }) {
      alert("login: Error:" + message);
    }
  };

  async function facebookLogin() {
    await Facebook.initializeAsync({
      appId: "410420650170978",
    });
    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ["public_profile"],
    });
    if (type === "success") {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`
      );

      const result = await response.json();
      const formData = new FormData();
      formData.append("socialKey", token);
      formData.append("fullName", result.name);
      api({
        method: "post",
        url: "/User/LoginGmail",
        data: formData,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      }).then((res) => {
        const {
          data: { data },
        } = res;
        if (data) {
          setUserInfo(res.data?.data);
        }
      });
    } else {
      // type === 'cancel'
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{desc}</Text>
      <View style={styles.socialiconwrapper}>
        <Touchable onPress={facebookLogin}>
          <Image source={FacebookIcon} />
        </Touchable>
        <Touchable onPress={signInAsync}>
          <Image source={Twitter} />
        </Touchable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  text: {
    color: "#8f9bb3",
    fontSize: FontSizes.small,
    textAlign: "center",
  },
  socialiconwrapper: {
    flexDirection: "row",
    //    paddingHorizontal:10,
    justifyContent: "space-evenly",
    marginTop: 30,
  },
});
