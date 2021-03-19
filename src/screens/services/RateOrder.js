import React from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { Avatar } from "../../assets/images";
import {
  Background,
  Button,
  globalStyles,
  TextInput,
  Toast,
} from "../../common";
import { Rating } from "react-native-ratings";
import { Colors, FontFamilies, FontSizes } from "../../config/Theme";
import { api } from "../../services";

const RateOrder = ({
  navigation,
  route: {
    params: { orderDetails },
  },
}) => {
  const [ratingText, setRatingText] = React.useState("");
  const [ratingValue, setRatingValue] = React.useState(4);

  const onRatingFinish = (val) => {
    setRatingValue(val);
  };

  const submitRating = () => {
    const info = {
      userId: orderDetails.user_id,
      orderId: orderDetails._id,
      rating: ratingValue.toString(),
    };

    if (ratingText) {
      info.message = ratingText;
    }
    api({
      method: "put",
      url: "/Provider/GiveRating",
      data: {
        userId: orderDetails.user_id,
        orderId: orderDetails._id,
        rating: ratingValue.toString(),
        message: ratingText || "",
      },
      showLoader: true,
    }).then(() => {
      Toast.show({ text: "rating successfully submitted" });
      navigation.reset({ index: 0, routes: [{ name: "Services" }] });
    });
  };

  return (
    <Background>
      <ScrollView
        contentContainerStyle={
          {
            // paddingBottom: 100,
          }
        }
      >
        <Text style={styles.title}>Last Service</Text>
        <Image
          resizeMode="contain"
          source={
            orderDetails?.profilePicture?.thumbnail
              ? {
                  uri: orderDetails?.profilePicture?.thumbnail,
                }
              : Avatar
          }
          style={styles.profilePic}
        />
        <View style={styles.customerDetails}>
          <Text style={{ color: Colors.white }}>Customer Name</Text>
          <View style={[globalStyles.row, globalStyles.spaceBetween]}>
            <Text style={styles.customerName}>{orderDetails.user_name}</Text>
            <View style={styles.wrapRating}>
              <Text>{orderDetails?.ratings || "Not Rated"}</Text>
            </View>
          </View>
        </View>
        <Rating
          // showRating
          startingValue={4}
          type="custom"
          ratingColor="#fea41d"
          imageSize={44}
          tintColor={Colors.graySecondary}
          onFinishRating={onRatingFinish}
          style={{ paddingTop: 30 }}
        />
        <View style={{ marginTop: 30 }}>
          <TextInput
            label="Message"
            multiline
            onChangeText={(val) => setRatingText(val)}
            inputStyle={{}}
          />
        </View>
      </ScrollView>
      <View
        style={[
          globalStyles.flexOne,
          globalStyles.flexEnd,
          {
            bottom: 50,
          },
        ]}
      >
        <Button onPress={submitRating} />
      </View>
    </Background>
  );
};

export default RateOrder;

const styles = StyleSheet.create({
  title: {
    color: Colors.blue,
    textAlign: "center",
    paddingVertical: 20,
    fontSize: FontSizes.large,
    fontFamily: FontFamilies.poppinsMedium,
  },
  profilePic: {
    alignSelf: "center",
    width: 240,
    height: 200,
    borderRadius: 20,
  },
  customerDetails: {
    backgroundColor: Colors.primary,
    padding: 12,
  },
  customerName: {
    fontSize: FontSizes.larger,
    color: Colors.blue,
    paddingTop: 4,
    fontFamily: FontFamilies.sfMedium,
  },
  wrapRating: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 3,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 10,
  },
});
