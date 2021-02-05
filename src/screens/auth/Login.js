import React from "react";
import { StyleSheet, View, ScrollView, Platform } from "react-native";
import { Background, Text, Button, Touchable, TextInput } from "../../common";
import { Colors, FontFamilies, FontSizes } from "../../config/Theme";
import { SocialLogin } from "../../components";
import { api } from "../../services";
import { useSetRecoilState } from "recoil";
import { userInfo } from "../../store/atoms/auth";
import { validateEmail } from "../../common/Validation";
import { NoAuthAPI } from "../../config/apiServices";
// import messaging from "@react-native-firebase/messaging";

export default function Signup({ navigation: { navigate } }) {
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const setUserInfo = useSetRecoilState(userInfo);
  console.log("userinfo..", setUserInfo);

  const login = async () => {
    // const fcmToken = await messaging().getToken();
    const deviceType = Platform.OS === "android" ? "ANDROID" : "IPHONE";

    setLoading(true);

    if (validateEmail(email)) {
      let url = `/Provider/Login?email=${email}&password=${password}`;

      let json = await NoAuthAPI(url, "GET");
      if (Object.keys(json).length) {
        console.warn("res of login", json);
        setUserInfo(json.data);
        setLoading(false);
        setEmail("");
        setPassword("");
      } else {
        alert("failed");
        setEmail("");
        setPassword("");
        setLoading(false);
      }
    }
  };

  return (
    <Background options={{ headerShown: true }}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Welcome back, Guy!</Text>
        <View style={styles.desc}>
          <Text style={styles.alreadyAccountLabel}>
            Sign in to your Account
          </Text>
        </View>
        <View>
          <TextInput
            onChangeText={(val) => {
              setEmail(val);
            }}
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
          />
          <View style={styles.space} />
          <TextInput
            onChangeText={(val) => {
              setPassword(val);
            }}
            withEye
            label="Password"
            placeholder="Enter your password"
          />
          <Touchable
            style={styles.wrapForgotPass}
            onPress={() => navigate("ForgetPassword")}
          >
            <Text style={styles.forgotPassword}>Forgot your password?</Text>
          </Touchable>
        </View>
        <View style={styles.space} />
        <View style={styles.space} />
        <Button
          style={styles.signUp}
          title="Sign In"
          onPress={login}
          isLoading={loading}
        />
        <SocialLogin desc="or Sign in with social account" />
        <View style={styles.desc1}>
          <Text style={styles.alreadyAccountLabel}>
            Don't have an account?
            <Touchable onPress={() => navigate("Signup")}>
              <Text style={styles.loginLabel}>Sign up</Text>
            </Touchable>
          </Text>
        </View>
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: FontSizes.xxLarge,
    fontFamily: FontFamilies.sfBold,
    marginTop: 20,
    color: Colors.black,
  },
  alreadyAccountLabel: {
    color: "#8f9bb3",
    fontSize: FontSizes.small,
  },
  desc: {
    marginTop: 10,
    marginBottom: 40,
  },
  avatar: {
    alignSelf: "center",
    marginTop: 20,
    width: 103,
    height: 94,
  },
  space: {
    height: 20,
  },
  signUp: { height: 60, justifyContent: "center", borderRadius: 15 },
  wrapForgotPass: {
    alignSelf: "flex-end",
    marginTop: 20,
  },
  forgotPassword: {
    color: Colors.primary,
    fontFamily: FontFamilies.sfSemiBold,
  },
  loginLabel: {
    color: Colors.primary,
    fontSize: FontSizes.small,
    top: 3,
    left: 10,
  },
  desc1: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    alignSelf: "center",
  },
});
