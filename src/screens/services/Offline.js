import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Switch,
  Alert,
} from "react-native";
import dayjs from "dayjs";
import { Background, Touchable, Empty, globalStyles } from "../../common";
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
import { useRecoilState } from "recoil";

export default function Offline(props) {
  const { navigation } = props;

  const [info, setUserInfo] = useRecoilState(userInfo);
  const isOnline = info?.isOnline;
  const [refreshing, setRefreshing] = React.useState(false);

  const [orderList, setOrderList] = useState([]);

  const updateAvailability = React.useCallback(async () => {
    const newStatus = !isOnline;
    setUserInfo({
      ...info,
      isOnline: newStatus,
    });
    try {
      const {
        data: { data },
      } = await api({
        method: "put",
        url: "/Provider/OnlineOffline",
        data: { online: !isOnline === true ? "true" : "false" },
        showLoader: true,
      });
    } catch (error) {
      setUserInfo({
        ...info,
        isOnline: !newStatus,
      });
    }
  }, [isOnline, setUserInfo, info]);

  React.useEffect(() => {
    navigation.setOptions({
      title: isOnline ? "Your are Online!" : "Offline!",
      headerRight: () => (
        <View style={styles.switchContainer}>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isOnline ? Colors.white : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={updateAvailability}
            value={isOnline}
          />
        </View>
      ),
    });
  }, [navigation, isOnline, updateAvailability]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (info && !info.documentUploaded) {
        navigation.navigate("DocsUpload");
      } else if (info && info.documentUploaded) {
        getOrderList();
      }
    });
    return unsubscribe;
  }, [navigation, info, getOrderList]);

  const getOrderList = React.useCallback(async () => {
    setRefreshing(true);
    try {
      const {
        data: { data },
      } = await api({
        url: "/Provider/HomePage",
        showLoader: true,
      });
      setOrderList(data);
      setRefreshing(false);
    } catch (error) {
      setRefreshing(false);
      if (error?.response?.data?.type === "NO_LOCATION") {
        Alert.alert(
          "No Location",
          "Please Enable Location to get services",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Enable Now",
              onPress: () => navigation.navigate("Location"),
            },
          ],
          { cancelable: false }
        );
      }
    }
  }, []);

  const renderItem = (item) => {
    const serviceDate = new Date(item.date);
    return (
      <Touchable
        style={styles.flatlistwrap}
        onPress={() =>
          props.navigation.navigate("ServiceDetails", {
            orderId: item._id,
          })
        }
      >
        <View style={styles.imgnamerightarrowwrap}>
          <Touchable style={styles.flatlistimg}>
            {item.ProfilePicture && item.ProfilePicture.thumbnail ? (
              <Image
                resizeMode="cover"
                style={styles.profilePicture}
                source={{ uri: item.ProfilePicture.thumbnail }}
              />
            ) : (
              <Image
                source={onlineImg}
                style={styles.profilePicture}
                resizeMode="cover"
              />
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
          <Text style={styles.time}>
            {dayjs(serviceDate).format("ddd, MMM D, YYYY h:mm A")}
          </Text>
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
    <Background contentStyle={styles.contentStyle}>
      <View style={styles.container}>
        {!isOnline ? (
          <View style={styles.belowheader}>
            <Touchable style={styles.Imagestyle}>
              <Image source={offline} />
              <Text style={styles.offlinetext}>You are offline!</Text>
            </Touchable>
          </View>
        ) : (
          <View>
            <FlatList
              onRefresh={getOrderList}
              refreshing={refreshing}
              data={orderList}
              renderItem={({ item }) => renderItem(item)}
              keyExtractor={(item) => item._id}
              ListEmptyComponent={<Empty title="No Services available" />}
            />
          </View>
        )}
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 30,
    flex: 1,
  },
  contentStyle: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 0,
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
    marginLeft: 4,
  },
  switchContainer: {
    paddingRight: 10,
  },
  profileImage: {
    height: 40,
    width: 40,
    borderRadius: 30,
  },
  profilePicture: {
    height: 44,
    width: 44,
    borderRadius: 22,
  },
});
