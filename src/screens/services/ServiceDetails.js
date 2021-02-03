import React from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import { Header, Background, Touchable, Button } from "../../common";
import { onlineImg, date, clock, Mask } from "../../assets/images";
import { Colors, FontFamilies, FontSizes } from "../../config/Theme";

export default function ServiceDetails() {
  const itemList = [1, 2];

  const renderItem = (item) => {
    return (
      <Touchable>
        <View style={styles.mainflatlistwrapper}>
          <Image source={Mask} />

          <View>
            <Text style={styles.self}>Self-Service Car Wash</Text>
            <Text style={styles.deleteall}>including delete all</Text>
            <Text style={styles.self}>$ 40</Text>
          </View>
          <View style={styles.flatlistdirection}>
            <View style={styles.addsubWrap}>
              <Text style={styles.text1}>-</Text>
            </View>
            <View style={{ paddingHorizontal: 12, paddingVertical: 8 }}>
              <Text style={styles.text1}>1</Text>
            </View>
            <View style={styles.addtextwrap}>
              <Text style={styles.text1}>+</Text>
            </View>
          </View>
        </View>
      </Touchable>
    );
  };

  return (
    <Background>
      <Header title="Service Details" commonHeaderColor={true} />
      <View style={styles.mainview}>
        <Touchable style={styles.profile}>
          <Image source={onlineImg} />
        </Touchable>
        <View style={styles.profilename}>
          <Text style={styles.profiletext}>Evan Ezuma</Text>
          <View style={styles.ratingView}>
            <Image source={clock} />
            <Text style={styles.ratingtext}>4.8</Text>
          </View>
          <View style={styles.dateview}>
            <Image source={date} />
            <Text style={styles.datetext}>7th, oct 2020</Text>
            <Image source={clock} />
            <Text style={styles.timeText}>7:30 A.M</Text>
          </View>
        </View>
        <Touchable style={styles.pendingview}>
          <Text style={styles.pendingtext}>Pending</Text>
        </Touchable>
      </View>
      <Text style={styles.service}>Services</Text>
      <FlatList data={itemList} renderItem={renderItem} />
      <Text
        style={[
          styles.service,
          { paddingVertical: 10, fontSize: FontSizes.default },
        ]}
      >
        Special Instructions
      </Text>
      <Text style={styles.longtext}>
        Our classes is thought by our best selected teachers who are experts in
        their subject.
      </Text>

      <View style={styles.buttonStyle}>
        <Button width={180} title="Accept" />
        <Button
          type="transparent"
          width={110}
          title="Ignore"
          style={{ borderWidth: 1, borderColor: Colors.primary }}
        />
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  mainview: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  profile: {
    width: "20%",
  },
  pendingview: {
    borderRadius: 10,
    padding: 8,
    backgroundColor: Colors.purple,
    paddingHorizontal: 10,
  },
  pendingtext: {
    color: Colors.white,
  },
  service: {
    color: Colors.navy_blue,
    fontSize: FontSizes.large,
    fontFamily: FontFamilies.sfSemiBold,
  },
  mainflatlistwrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 10,
    backgroundColor: Colors.off_White,
  },
  text1: {
    color: Colors.navy_blue,
  },
  buttonStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 40,
  },
  longtext: {
    color: "grey",
    fontFamily: FontFamilies.sfSemiBold,
  },
  profiletext: {
    fontSize: FontSizes.default,
    fontFamily: FontFamilies.sfBold,
  },
  profilename: {
    width: "60%",
  },
  ratingView: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  ratingtext: {
    marginLeft: 5,
    color: "grey",
    fontFamily: FontFamilies.sfSemiBold,
  },
  dateview: {
    flexDirection: "row",
    alignItems: "center",
  },
  datetext: {
    marginHorizontal: 5,
    color: "grey",
    fontFamily: FontFamilies.sfSemiBold,
  },
  timeText: {
    marginLeft: 5,
    color: "grey",
    fontFamily: FontFamilies.sfSemiBold,
  },
  flatlistdirection: {
    flexDirection: "row",
    alignItems: "center",
  },
  addsubWrap: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addtextwrap: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  self: {
    color: Colors.blue,
    fontFamily: FontFamilies.sfSemiBold,
  },
  deleteall: {
    paddingVertical: 5,
    color: "grey",
    fontFamily: FontFamilies.sfSemiBold,
  },
});
