import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import {
  Background,
  TextInput,
  Button,
  Touchable,
  HeaderTitle,
} from "../../common";

import { FontSizes, FontFamilies, Colors } from "../../config/Theme";
import { validateEmail } from "../../common/Validation";
import { api } from "../../services";

export default function ForgetPassword({ navigation: { navigate } }) {
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = React.useState(false);

  function sent() {
    if (validateEmail(email)) {
      setLoading(true);
      api({
        method: "GET",
        url: "/User/FogotPassword",
        data: {
          email,
        },
      })
        .then((res) => {})
        .catch((err) => {
          console.warn("hi", err?.response?.data?.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  return (
    <Background options={{ headerShown: true }}>
      <HeaderTitle childTitle="Please enter your email address below to receive your password reset instructions. " />
      <View style={styles.textinput}>
        <TextInput
          label="Email"
          onChangeText={(val) => setEmail(val)}
          placeholder="Enter your email"
          keyboardType="email-address"
        />
      </View>
      <Button
        title="Sent"
        style={styles.Button}
        onPress={sent}
        isLoading={loading}
      />
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
