import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  StatusBar,
} from "react-native";
import { Background, Header, Touchable } from "../../common";
import { Colors, FontFamilies, FontSizes } from "../../config/Theme";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../config/Layout";
import {
  offline,
  onlineImg,
  Right_arrow,
  circle,
  location1,
  aeroplane,
} from "../../assets/images";

export default function Offline(props) {
  const itemList = [1, 2, 3, 4, 5, 6, 7];
  const [isOnlne, setStatus] = useState(true);
  const handleStatusData = (value) => {
    setStatus(value);
  };

  const renderItem = (item) => {
    return (
      <Touchable style={styles.flatlistwrap}>
        <View style={styles.imgnamerightarrowwrap}>
          <Touchable style={styles.flatlistimg}>
            <Image source={onlineImg} />
          </Touchable>
          <View style={styles.nametext}>
            <Text style={styles.name}>Jennie Vin</Text>
            <Text style={styles.belowname}>Self Service Car Wash</Text>
          </View>
          <Touchable style={styles.flatlistrightarrowimg}>
            <Image source={Right_arrow} />
          </Touchable>
        </View>
        <View style={[styles.direction, { paddingVertical: 15 }]}>
          <Touchable style={styles.circle}>
            <Image source={circle} />
          </Touchable>
          <Text style={styles.time}>sat,19jan 2019, 10;00 Am</Text>
        </View>
        <View style={styles.direction}>
          <Touchable style={styles.circle}>
            <Image source={location1} />
          </Touchable>
          <Text style={styles.time}>los angles,california</Text>
          <Touchable style={styles.circle}>
            <Image source={aeroplane} />
          </Touchable>
        </View>
      </Touchable>
    );
  };

  return (
    <Background
      contentStyle={styles.contentStyle}
      witNotchstyle={Colors.primary}
    >
      <Header
        title={isOnlne ? "You are Online!" : "offline"}
        textcolor={true}
        withDrawermenuIcon
        withBack={false}
        withDrawerIcon={false}
        Offswitcher={true}
        handleStatusData={handleStatusData}
        backgroundColor={{
          backgroundColor: Colors.primary,
          paddingVertical: 25,
        }}
      />
      <View style={{ flex: 1 }}>
        {!isOnlne ? (
          <View style={styles.belowheader}>
            <Touchable style={styles.Imagestyle}>
              <Image source={offline} />
              <Text style={styles.offlinetext}>You are offline!</Text>
              <Text style={styles.belowofflinetext}>
                Our classes is thaught by our best selected teachers who are
                experts in their subject
              </Text>
            </Touchable>
          </View>
        ) : (
          <View>
            <FlatList
              data={itemList}
              renderItem={renderItem}
              //  keyExtractor={item => item.id}
            />
          </View>
        )}
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  contentStyle: {
    paddingHorizontal: 0,
    flex: 1,
  },
  belowheader: {
    backgroundColor: "white",

    marginTop: -10,
    borderTopRightRadius: SCREEN_WIDTH * 0.05,
    borderTopLeftRadius: SCREEN_WIDTH * 0.05,
  },
  Imagestyle: {
    justifyContent: "center",
    alignItems: "center",

    marginVertical: 120,
  },
  offlinetext: {
    color: Colors.navy_blue,
    fontSize: FontSizes.xxLarge,
    fontFamily: FontFamilies.sfSemiBold,
    paddingVertical: 20,
  },
  belowofflinetext: {
    paddingHorizontal: 30,
    width: "90%",
    fontSize: FontSizes.medium,
    fontFamily: FontFamilies.poppinsLight,
    color: "grey",
  },
  flatlistwrap: {
    backgroundColor: Colors.off_White,
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 20,

    borderRadius: 10,
  },
  imgnamerightarrowwrap: {
    flexDirection: "row",
    borderBottomColor: "#e2e2e2",
    borderBottomWidth: 0.5,
    paddingBottom: 20,
  },
  flatlistimg: {
    width: "20%",
  },
  nametext: {
    width: "70%",
  },
  name: {
    fontSize: FontSizes.large,
    color: Colors.navy_blue,
    fontFamily: FontFamilies.sfSemiBold,
  },
  flatlistrightarrowimg: {
    width: "10%",
    alignItems: "center",
  },
  direction: {
    flexDirection: "row",
  },
  circle: {
    width: "10%",
    alignItems: "center",
  },
  belowname: {
    fontSize: FontSizes.xSmall,
    color: Colors.light_grey,
  },
  time: {
    width: "80%",
    color: Colors.dark_navyblue,
    fontSize: FontSizes.xSmall,
  },
});
