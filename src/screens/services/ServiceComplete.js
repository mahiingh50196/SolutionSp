import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Success } from "../../assets/images";
import { Background, Button, Text } from "../../common";
import { Colors, FontFamilies, FontSizes } from "../../config/Theme";

const OrderSuccess = ({ navigation }) => {
  const onPressDetail = () => {
    // navigation.reset({ index: 0, routes: [{ name: "Orders" }] });
  };
  return (
    <Background>
      <Image resizeMode="contain" source={Success} style={styles.logo} />
      <View>
        <Text style={styles.title}>Service Completed</Text>
        <Text style={styles.desc}>
          Your service has been completed, Please submit your feedback
        </Text>
        <Button title="Submit Feedback" onPress={onPressDetail} />
      </View>
    </Background>
  );
};

export default OrderSuccess;

const styles = StyleSheet.create({
  logo: {
    height: 240,
    width: 240,
    alignSelf: "center",
    marginVertical: 40,
  },
  title: {
    color: Colors.primary,
    fontSize: FontSizes.larger,
    fontFamily: FontFamilies.sfBold,
    textAlign: "center",
  },
  desc: {
    color: Colors.gray,
    fontSize: FontSizes.large,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 40,
    fontFamily: FontFamilies.sfRegular,
  },
});
