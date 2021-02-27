import React from "react";
import { View, StyleSheet, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRecoilValue } from "recoil";
import { nav } from "../../assets/images";
import { Background, globalStyles, Map, Text } from "../../common";
import { SCREEN_WIDTH } from "../../config/Layout";
import { Colors, FontFamilies, FontSizes } from "../../config/Theme";
import { userInfo } from "../../store/atoms/auth";

const TrackingDetails = ({
  route: {
    params: { orderDetails },
  },
}) => {
  const userDetails = useRecoilValue(userInfo);
  const {
    location: { coordinates },
  } = userDetails;
  const {
    location,
    address,
    user_name: userName,
    profilePicture,
  } = orderDetails;
  console.log(orderDetails);
  return (
    <Background contentStyle={styles.contentStyle}>
      <View style={globalStyles.flexOne}>
        <View style={{ flex: 6, backgroundColor: "pink" }}>
          <Map
            initialLocation={{
              latitude: location[1],
              longitude: location[0],
              latitudeDelta: 0.001,
              longitudeDelta: 0.001,
            }}
            from={{
              latitude: location[1],
              longitude: location[0],
            }}
            to={{
              latitude: coordinates[1],
              longitude: coordinates[0],
            }}
          />
          <View style={styles.actionIcons}>
            <Ionicons
              name="call"
              size={22}
              color={Colors.blue}
              style={styles.icon}
            />
            <Ionicons
              name="chatbox-ellipses"
              size={22}
              color={Colors.blue}
              style={styles.icon}
            />
          </View>
        </View>
        <View style={styles.bottomView}>
          <View style={[styles.wrapAddress, styles.wrapImage]}>
            <Image
              resizeMode="cover"
              source={
                profilePicture?.thumbnail
                  ? {
                      uri: profilePicture.thumbnail,
                    }
                  : nav
              }
              style={styles.image}
            />
            <View>
              <Text style={styles.CustomerLabel}>Customer Name</Text>
              <Text style={styles.CustomerName}>{userName}</Text>
            </View>
          </View>
          <View style={styles.wrapAddress}>
            <Text style={styles.addressLabel}>Address</Text>
            <Text style={styles.addressText}>{address}</Text>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default TrackingDetails;

const styles = StyleSheet.create({
  actionIcons: {
    position: "absolute",
    right: 20,
    bottom: 50,
    height: 120,
    justifyContent: "space-between",
  },
  icon: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "rgba(65, 213, 251, 0.2)",
  },
  contentStyle: {
    paddingHorizontal: 0,
  },
  bottomView: {
    backgroundColor: "#41d5fb",
    paddingHorizontal: SCREEN_WIDTH * 0.08,
    paddingTop: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 3.5,
  },
  wrapAddress: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 8,
  },
  addressLabel: {
    color: Colors.black,
    fontFamily: FontFamilies.sfMedium,
    lineHeight: 40,
  },
  addressText: {
    fontSize: FontSizes.medium,
  },
  CustomerLabel: {
    color: Colors.gray,
    fontFamily: FontFamilies.sfMedium,
    lineHeight: 30,
  },
  CustomerName: {
    color: Colors.black,
    fontFamily: FontFamilies.sfMedium,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginHorizontal: 20,
  },
  wrapImage: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});
