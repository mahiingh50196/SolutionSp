import React, { useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Background, Text, Button, Touchable, TextInput } from "../../common";
import { Colors, FontFamilies, FontSizes } from "../../config/Theme";
import { SocialLogin } from "../../components";
import { api } from "../../services";
import { useSetRecoilState } from "recoil";
import { rCategoryData, userInfo } from "../../store/atoms/auth";
import { validateEmail } from "../../common/Validation";
import { AuthStates } from "../../config/Constants";
// import messaging from "@react-native-firebase/messaging";

export default function Login({ navigation: { navigate } }) {
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const setCategoryData = useSetRecoilState(rCategoryData);

  const setUserInfo = useSetRecoilState(userInfo);

  useEffect(() => {
    api({
      method: "GET",
      url: "/Provider/ListCategories",
      headers: {
        Accept: "application/json",
      },
    }).then((res) => {
      if (res.data && res.data.data.length) {
        const categories = res.data.data.map((item) => {
          return {
            label: item.name,
            value: item._id,
          };
        });
        setCategoryData(categories);
      }
    });
  }, [setCategoryData]);

  const login = async () => {
    // const fcmToken = await messaging().getToken();
    // const deviceType = Platform.OS === "android" ? "ANDROID" : "IPHONE";

    if (validateEmail(email)) {
      const {
        data: { data },
      } = await api({
        method: "get",
        url: `/Provider/Login?email=${email}&password=${password}`,
        showLoader: true,
      });
      const registrationData = Array.isArray(data) ? data[0] : data;
      if (
        registrationData.location &&
        registrationData.location.coordinates?.length
      ) {
        setUserInfo({
          ...registrationData,
          authState: AuthStates.COMPLETE,
        });
      } else {
        setUserInfo({
          ...registrationData,
          authState: AuthStates.NO_LOCATION,
        });
      }
    }
  };

  return (
    <Background>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
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
        <Button style={styles.signUp} title="Sign In" onPress={login} />
        <SocialLogin desc="or Sign in with social account" />
        <View style={styles.desc1}>
          <Text style={styles.alreadyAccountLabel}>Don't have an account?</Text>
          <Touchable onPress={() => navigate("Signup")}>
            <Text style={styles.loginLabel}>Sign up</Text>
          </Touchable>
        </View>
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: FontSizes.xxLarge,
    fontFamily: FontFamilies.sfBold,
    marginTop: 60,
    color: Colors.black,
  },
  alreadyAccountLabel: {
    color: "#8f9bb3",
    fontSize: FontSizes.small,
    fontFamily: FontFamilies.sfMedium,
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
    left: 10,
    fontFamily: FontFamilies.sfMedium,
    textDecorationLine: "underline",
  },
  desc1: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    alignSelf: "center",
  },
});
