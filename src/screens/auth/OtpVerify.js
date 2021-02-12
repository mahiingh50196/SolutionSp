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
    <Background options={{ headerShown: true }}>
      <View>
        <Text style={styles.title}>Verify phone number</Text>
        <View style={styles.desc}>
          <Text style={styles.alreadyAccountLabel}>
            Check your SMS messages. We've sent you the PIN at
            <Touchable>
              <Text style={styles.loginLabel}>{phone}</Text>
            </Touchable>
          </Text>
        </View>
        <View style={styles.codeInput}>
          <CodeInput codeLength={4} onFullFill={(val) => {}} />
        </View>
        <Button style={styles.signUp} title="Verify" onPress={onVerify} />
        <View style={styles.wrapResend}>
          <Text style={styles.resendCode}>
            Didn't receive SMS?
            <Touchable onPress={() => navigate("Login")}>
              <Text style={styles.resendLabel}>Resend Code</Text>
            </Touchable>
          </Text>
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
    marginTop: 20,
  },
  alreadyAccountLabel: {
    color: "#8f9bb3",
    fontSize: FontSizes.small,
    lineHeight: 18,
  },
  desc: {
    marginTop: 10,
    marginBottom: 40,
  },
  loginLabel: {
    color: Colors.primary,
    fontSize: FontSizes.small,
    top: 6,
    left: 8,
  },
  resendLabel: {
    color: Colors.primary,
    fontSize: FontSizes.small,
    top: 4,
    left: 8,
  },
  signUp: { height: 60, justifyContent: "center", borderRadius: 15 },
  codeInput: {
    marginBottom: SCREEN_HEIGHT * 0.1,
  },
  resendCode: {
    color: "#8f9bb3",
    fontSize: FontSizes.small,
    lineHeight: 18,
  },
  wrapResend: {
    marginTop: SCREEN_HEIGHT * 0.05,
    alignSelf: "center",
  },
});
