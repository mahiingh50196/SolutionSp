import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import dayjs from "dayjs";
import { Background, Header, Touchable } from "../../common";
import { Colors, FontFamilies, FontSizes } from "../../config/Theme";
import { SCREEN_WIDTH } from "../../config/Layout";
import {
  offline,
  onlineImg,
  Right_arrow,
  circle,
  location1,
  aeroplane,
} from "../../assets/images";
import { api } from "../../services";
import { userInfo } from "../../store/atoms/auth";
import { useRecoilValue } from "recoil";

export default function Offline(props) {
  const [isOnline, setStatus] = useState("true");
  const { navigation } = props;

  const info = useRecoilValue(userInfo);

  const [orderList, setOrderList] = useState([]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (info && !info.documentUploaded) {
        navigation.navigate("DocsUpload");
      }
    });
    return unsubscribe;
  }, [navigation, info]);

  useEffect(() => {
    if (info && info.documentUploaded) {
      getOrderList();
      api({
        method: "PUT",
        url: "/Provider/OnlineOffline",
        data: { online: isOnline },
      })
        .then((res) => {})
        .finally(() => {});
    }
  }, [isOnline, info, getOrderList]);

  const handleStatusData = (value) => {
    setStatus(value);
  };

  const getOrderList = React.useCallback(async () => {
    const {
      data: { data },
    } = await api({
      method: "GET",
      url: "/Provider/HomePage",
    });
    setOrderList(data);
  }, []);

  const renderItem = (item) => {
    return (
      <Touchable
        style={styles.flatlistwrap}
        onPress={() =>
          props.navigation.navigate("ServiceDetails", {
            itemData: item,
          })
        }
      >
        <View style={styles.imgnamerightarrowwrap}>
          <Touchable style={styles.flatlistimg}>
            {item.profilePicture && item.profilePicture.original ? (
              <Image source={{ uri: item.profilePicture.original }} />
            ) : (
              <Image source={onlineImg} />
            )}
          </Touchable>
          <View style={styles.nametext}>
            <Text style={styles.name}>{item.username}</Text>
            <Text style={styles.belowname}>{item.category}</Text>
          </View>
          <Touchable style={styles.flatlistrightarrowimg}>
            <Image source={Right_arrow} />
          </Touchable>
        </View>
        <View style={[styles.direction, { paddingVertical: 15 }]}>
          <Touchable style={styles.circle}>
            <Image source={circle} />
          </Touchable>
          <Text style={styles.time}>{dayjs(item.date).format("llll")}</Text>
        </View>
        <View style={styles.direction}>
          <Touchable style={styles.circle}>
            <Image source={location1} />
          </Touchable>
          <Text style={styles.time}>{item.address}</Text>
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
        titleColor={Colors.white}
        title={isOnline ? "You are Online!" : "offline"}
        withDrawermenuIcon
        withBack={false}
        withDrawerIcon={false}
        showStatusIcon={true}
        handleStatusData={handleStatusData}
        backgroundColor={{
          backgroundColor: Colors.primary,
          paddingVertical: 25,
        }}
      />
      <View style={{ flex: 1 }}>
        {isOnline === "false" ? (
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
              data={orderList}
              renderItem={({ item }) => renderItem(item)}
              keyExtractor={(item) => item._id}
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
    alignItems: "center",
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
