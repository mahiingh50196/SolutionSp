import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import RNSwipeVerify from "react-native-swipe-verify";
import { SCREEN_WIDTH } from "../config/Layout";
import { Colors, FontFamilies, FontSizes } from "../config/Theme";
import { Swiper as SwiperIcon } from "../assets/images";

const Swiper = ({ title, onSwipe }) => {
  const swiperRef = React.useRef(null);
  return (
    <View style={styles.swipeContainer}>
      <RNSwipeVerify
        ref={swiperRef}
        width={SCREEN_WIDTH * 0.6}
        buttonSize={44}
        borderColor="#fff"
        buttonColor="#fff"
        backgroundColor="#fff"
        textColor="#37474F"
        okButton={{ visible: true, duration: 400 }}
        onSwipe={() => alert("hey")}
        onVerified={() => {
          // onSwipe(swiperRef);
        }}
        icon={
          <Image
            source={SwiperIcon}
            resizeMode="contain"
            style={{ width: 50, height: 44 }}
          />
        }
      >
        <Text style={styles.swiperText}>{title}</Text>
      </RNSwipeVerify>
    </View>
  );
};

export default Swiper;

const styles = StyleSheet.create({
  swipeContainer: {
    padding: 4,
    borderColor: Colors.primary,
    borderWidth: 1,
    marginTop: 20,
    borderRadius: 12,
  },
  swiperText: {
    color: Colors.primary,
    fontFamily: FontFamilies.poppinsMedium,
    fontSize: FontSizes.medium,
  },
});
