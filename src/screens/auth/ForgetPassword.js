import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import {
  Background,
  TextInput,
  Button,
  Touchable,
  HeaderTitle,
  Toast,
} from "../../common";

import { FontSizes, FontFamilies, Colors } from "../../config/Theme";
import { validateEmail } from "../../common/Validation";
import { api } from "../../services";

export default function ForgetPassword({ navigation: { navigate, goBack } }) {
  const [email, setEmail] = useState(null);

  function sent() {
    if (validateEmail(email)) {
      api({
        method: "put",
        url: "/Provider/FogotPassword",
        data: { email },
        showLoader: true,
      }).then((res) => {
        const {
          data: { data },
        } = res;
        goBack();
        Toast.show({ text: "confirmation link sent to email" });
      });
    }
  }

  return (
    <Background contentStyle={{ paddingTop: 50 }}>
      <HeaderTitle childTitle="Please enter your email address below to receive your password reset instructions. " />
      <View style={styles.textinput}>
        <TextInput
          label="Email"
          onChangeText={(val) => setEmail(val)}
          placeholder="Enter your email"
          keyboardType="email-address"
        />
      </View>
      <Button title="Sent" style={styles.Button} onPress={sent} />
      <Touchable onPress={() => navigate("Login")}>
        <Text style={styles.backTosingin}>Back To Sign in</Text>
      </Touchable>
    </Background>
  );
}
const styles = StyleSheet.create({
  textinput: {
    marginTop: 40,
  },
  Button: {
    marginVertical: 30,
  },
  backTosingin: {
    alignSelf: "center",
    color: Colors.primary,
    fontSize: FontSizes.small,
    fontFamily: FontFamilies.sfRegular,
    marginTop: 20,
    textDecorationLine: "underline",
    textDecorationColor: Colors.primary,
  },
});
