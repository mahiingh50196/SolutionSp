import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Avatar } from "../../assets/images";
import { Background, Button, globalStyles } from "../../common";
import { Rating } from "react-native-ratings";
import { Colors, FontFamilies, FontSizes } from "../../config/Theme";
import { SCREEN_WIDTH } from "../../config/Layout";

const RateOrder = () => {
  return (
    <Background>
      <View>
        <Text style={styles.title}>Last Service</Text>
        <Image resizeMode="contain" source={Avatar} style={styles.profilePic} />
        <View style={styles.customerDetails}>
          <Text style={{ color: Colors.white }}>Customer Name</Text>
          <View style={[globalStyles.row, globalStyles.spaceBetween]}>
            <Text style={styles.customerName}>Name</Text>
            <View style={styles.wrapRating}>
              <Text>4.4</Text>
            </View>
          </View>
        </View>
        <Rating
          showRating
          type="custom"
          ratingColor="#fea41d"
          imageSize={44}
          tintColor={Colors.graySecondary}
          //   onFinishRating={this.ratingCompleted}
          style={{ paddingTop: 20 }}
        />
      </View>
      <View
        style={[globalStyles.flexOne, globalStyles.flexEnd, globalStyles.pbxl]}
      >
        <Button />
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
    height: 290,
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
