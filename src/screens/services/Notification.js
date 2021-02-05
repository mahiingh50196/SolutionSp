import React from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import { Header, Background, Touchable, Button } from "../../common";
import { notification, NotificationClock } from "../../assets/images";
import { Colors, FontFamilies, FontSizes } from "../../config/Theme";

export default function Notification() {
  const listItem = [1, 2, 3, 4, 5, 6];

  const renderItem = (item) => {
    return (
      <Touchable>
        <View style={styles.direction}>
          <Image source={notification} />
          <View>
            <Text style={styles.notificationText}>
              Cameron Blake Your Order Placed
            </Text>
            <View style={styles.direction}>
              <Image source={NotificationClock} />
              <Text style={styles.time}>25 Mints ago</Text>
            </View>
          </View>
        </View>
        <View style={styles.border} />
      </Touchable>
    );
  };

  return (
    <Background>
      <Header withBack={false} withDrawerIcon={true} title="Notification" />

      <Text style={styles.date}>Today - 26/11/2020</Text>

      <FlatList data={listItem} renderItem={(item) => renderItem(item)} />
    </Background>
  );
}

const styles = StyleSheet.create({
  date: {
    fontSize: FontSizes.default,
    fontFamily: FontFamilies.sfMedium,
  },
  direction: {
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
  },
  notificationText: {
    paddingHorizontal: 20,
  },
  time: {
    paddingHorizontal: 5,
    color: Colors.input,
    fontSize: FontSizes.xSmall,
    fontFamily: FontFamilies.sfRegular,
  },
  border: {
    borderBottomWidth: 0.3,
    borderColor: Colors.blue,
    marginHorizontal: 10,
    borderBottomColor: "#328da8",
  },
});
