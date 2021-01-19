import React, { useState, useEffect, useRef } from "react";
import { View, Image, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { drawer, nav } from "../assets/images";
import { Touchable } from "../common";
import { useNavigation } from "@react-navigation/native";
import { userInfo } from "../store/atoms/auth";
import { useRecoilValue } from "recoil";

import MapView from "react-native-maps";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../config/Layout";

let defaultLocation = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.001,
  longitudeDelta: 0.001,
};

export default function Home() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const user = useRecoilValue(userInfo);
  const navigation = useNavigation();

  const locationRef = useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      //   console.warn("hi", location);
      if (locationRef) {
        const newCoords = {
          ...defaultLocation,
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };

        // console.warn("newcorrds", newCoords);
        locationRef.current.animateToRegion(newCoords, 1000);
      }
      setLocation(location);
      //   console.warn(location);
    })();
  }, []);

  return (
    <View>
      <View style={styles.drwaernaviconwrapper}>
        <Touchable onPress={() => navigation.toggleDrawer()}>
          <Image style={styles.menu} source={drawer} />
        </Touchable>
        <Touchable>
          <Image
            source={
              user?.profilePicture?.original
                ? {
                    uri: user.profilePicture.original,
                  }
                : nav
            }
            resizeMode="cover"
            style={styles.navstyle}
          />
        </Touchable>
      </View>
      <MapView
        initialRegion={defaultLocation}
        ref={locationRef}
        style={styles.mapView}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  contentStyle: {
    paddingHorizontal: 0,
  },
  drwaernaviconwrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    top: 0,
    zIndex: 5,
    width: SCREEN_WIDTH,
  },
  navstyle: {
    margin: 20,
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  menu: {
    height: 100,
    width: 100,
  },
  mapView: {
    height: SCREEN_HEIGHT * 0.5,
  },
});
