import React, { useState } from "react";
import { Image, StyleSheet } from "react-native";

import { Background, Button, Text } from "../../common";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Touchable } from "../../common";
import { Map } from "../../assets/images";
import { FontSizes, Colors, FontFamilies } from "../../config/Theme";
import * as Location from "expo-location";
import { userInfo } from "../../store/atoms/auth";
import { useRecoilState } from "recoil";
import { api } from "../../services";
import { AuthStates } from "../../config/Constants";

export const getAddressString = ({
  city,
  country,
  district,
  name,
  region,
  street,
  subregion,
  postalCode,
}) => {
  const address = [
    name,
    street,
    subregion,
    region,
    postalCode,
    district,
    city,
    country,
  ];
  const nonNullAddress = address.filter((each) => !!each);
  const addressString = nonNullAddress.join(", ");
  return addressString;
};

const GetLocation = ({ navigation: { navigate, goBack } }) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [userData, setUserInfo] = useRecoilState(userInfo);

  const getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const {
      coords: { latitude, longitude },
    } = location;
    const coordinates = {
      latitude,
      longitude,
    };
    const addressArray = await Location.reverseGeocodeAsync(coordinates);
    const addressObject = addressArray?.length ? addressArray[0] : null;
    const address = getAddressString(addressObject);
    const {
      data: { data },
    } = await api({
      method: "put",
      url: "/Provider/AddAddress",
      data: { lat: latitude, lng: longitude, address },
    });
    setUserInfo({
      ...data,
      authState: AuthStates.COMPLETE,
    });
  };

  return (
    <Background>
      <Touchable onPress={goBack}>
        <Ionicons name="close" size={40} />
      </Touchable>
      <Image style={styles.map} source={Map} />
      <Text style={styles.title}>Enable Location</Text>
      <Text style={styles.desc}>
        Choose your location to start find the request around you.
      </Text>
      <Button
        style={styles.signUp}
        title="Allow access"
        onPress={getLocation}
      />
      <Button
        type="transparent"
        title="Skip for now"
        onPress={() => {
          setUserInfo({
            ...userData,
            authState: AuthStates.COMPLETE,
          });
        }}
      />
      {/* <Text>{text}</Text> */}
    </Background>
  );
};

export default GetLocation;

const styles = StyleSheet.create({
  map: {
    alignSelf: "center",
    height: 220,
    width: 220,
    marginVertical: 50,
  },
  title: {
    fontSize: FontSizes.xxLarge,
    textAlign: "center",
    color: Colors.black,
    fontFamily: FontFamilies.sfBold,
  },
  desc: {
    fontSize: FontSizes.small,
    textAlign: "center",
    color: Colors.gray,
    marginTop: 10,
    fontFamily: FontFamilies.sfBold,
    width: "70%",
    alignSelf: "center",
  },
  signUp: {
    height: 60,
    justifyContent: "center",
    borderRadius: 15,
    marginTop: 40,
    marginBottom: 20,
  },
});
