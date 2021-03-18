import React from "react";
import { StyleSheet, View } from "react-native";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { userInfo, signUpInfo } from "../../store/atoms/auth";
import { Background, Text, Touchable, Button, CodeInput } from "../../common";
import { SCREEN_HEIGHT } from "../../config/Layout";
import { FontFamilies, FontSizes, Colors } from "../../config/Theme";
import { AuthStates } from "../../config/Constants";

const OtpVerify = ({
  navigation: { navigate },
  route: {
    params: { phone },
  },
  route: {
    params: { code },
  },
}) => {
  const authInfo = useRecoilValue(signUpInfo);
  const setUserInfo = useSetRecoilState(userInfo);

  const onVerify = () => {
    setUserInfo({
      ...authInfo,
      authState: AuthStates.NO_LOCATION,
    });
  };

  return (
    <Background>
      <View style={{ marginVertical: 50 }}>
        <Text style={styles.title}>Verify phone number</Text>
        <View style={styles.desc}>
          <Text style={styles.alreadyAccountLabel}>
            Check your SMS messages. We've sent you the PIN
            <Touchable>
              <Text style={styles.loginLabel}>
                <Text style={styles.alreadyAccountLabel}>at</Text> +{code}
                {phone}
              </Text>
            </Touchable>
          </Text>
        </View>
        <View style={styles.codeInput}>
          <CodeInput codeLength={4} onFullFill={(val) => {}} />
        </View>
        <Button style={styles.signUp} title="Verify" onPress={onVerify} />
        <View style={styles.wrapResend}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.resendCode}>Didn't receive SMS?</Text>
            <Touchable onPress={() => navigate("Login")}>
              <Text style={styles.resendLabel}>Resend Code</Text>
            </Touchable>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default OtpVerify;

const styles = StyleSheet.create({
  title: {
    fontSize: FontSizes.xxLarge,
    fontFamily: FontFamilies.sfBold,
    color: Colors.dark_black,
    marginTop: 20,
  },
  alreadyAccountLabel: {
    color: "#8f9bb3",
    fontSize: FontSizes.small,
    fontFamily: FontFamilies.sfSemiBold,
    lineHeight: 20,
  },
  desc: {
    marginTop: 10,
    marginBottom: 40,
  },
  loginLabel: {
    color: Colors.primary,
    fontSize: FontSizes.small,
  },
  resendLabel: {
    color: Colors.primary,
    fontSize: FontSizes.small,
    marginLeft: 4,
  },
  signUp: { height: 60, justifyContent: "center", borderRadius: 15 },
  codeInput: {
    marginBottom: SCREEN_HEIGHT * 0.1,
  },
  resendCode: {
    // color: "#8f9bb3",
    color: "#222b45",
    fontSize: FontSizes.small,
    lineHeight: 18,
    fontFamily: FontFamilies.sfRegular,
  },
  wrapResend: {
    marginTop: SCREEN_HEIGHT * 0.05,
    alignSelf: "center",
  },
});
