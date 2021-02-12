import React from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import { Header, Background, Touchable, Button } from "../../common";
import { Booking } from "../../assets/images";
import { Colors, FontFamilies, FontSizes } from "../../config/Theme";
import { ScrollView } from "react-native-gesture-handler";

export default function MyServices(props) {
  const listItem2 = [1, 2, 3, 4];
  const listItem1 = [1];

  const renderItem = (item) => {
    return (
      <Touchable
        style={styles.boxShadow}
        onPress={() =>
          props.navigation.navigate("ServiceDetails", {
            itemData: item,
          })
        }
      >
        <View style={styles.direction}>
          <Text style={styles.name}>Evan Guzman</Text>
          <Text style={[styles.name, { fontSize: FontSizes.xSmall }]}>
            Oct 29, 2020
          </Text>
        </View>
        <View style={[styles.direction, { paddingVertical: 10 }]}>
          <Text style={styles.booking}>Booking ID - AT345FGT</Text>
          <Image source={Booking} />
        </View>
        <View style={[styles.direction, { alignItems: "center" }]}>
          <View>
            <Text style={styles.selfService}>Self-Service Car Wash</Text>
            <Text style={styles.name}>Los Angeles, California, US</Text>
          </View>
          <Text style={styles.pending}>Pending</Text>
        </View>
      </Touchable>
    );
  };

  return (
    <Background contentStyle={styles.contentStyle}>
      <Header
        titleColor={Colors.navy_blue}
        title="My Services"
        withDrawerIcon
        withBack={false}
      />
      <ScrollView>
        <Text style={styles.onGoingText}>Ongoing Service</Text>
        <FlatList
          data={listItem1}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={(item) => item._id}
        />
        <Text style={styles.onGoingText}>Last Service</Text>
        <FlatList
          data={listItem2}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={(item) => item._id}
        />
      </ScrollView>
    </Background>
  );
}
const styles = StyleSheet.create({
  contentStyle: {
    paddingHorizontal: 0,
    flex: 1,
  },
  onGoingText: {
    fontSize: FontSizes.larger,
    fontFamily: FontFamilies.sfRegular,
    padding: 20,
  },
  direction: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  boxShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    backgroundColor: "white",
    margin: 20,
    padding: 20,
    borderRadius: 20,
  },
  booking: {
    color: Colors.lightes_Grey,
    fontSize: FontSizes.xSmall,
    fontFamily: FontFamilies.sfRegular,
  },
  selfService: {
    color: Colors.navy_blue,
    fontSize: FontSizes.mediums,
    fontFamily: FontFamilies.sfRegular,
    paddingBottom: 10,
  },
  pending: {
    color: Colors.dark_Pink,
    fontSize: FontSizes.xSmall,
    fontFamily: FontFamilies.mediums,
  },
});
