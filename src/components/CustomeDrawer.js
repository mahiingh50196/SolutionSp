import React from "react";
import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";
import { nav } from "../assets/images";
import { Touchable } from "../common";
import { api } from "../services";
import { userInfo } from "../store/atoms/auth";
import { Colors, FontSizes, FontFamilies } from "../config/Theme";
import { useSetRecoilState } from "recoil";

export default function CustomeDrawer() {
  const setUser = useSetRecoilState(userInfo);
  function logout() {
    api({
      method: "PUT",
      url: "/Provider/logout",
    }).then((res) => {
      setUser(null);
    });
  }
  return (
    <SafeAreaView>
      <View style={styles.maindrawerView}>
        <View style={styles.imgtextwrap}>
          <Image source={nav} />
          <View>
            <Text style={styles.profiletext}>Travis Ravees</Text>
            <Text style={styles.editprofiletext}>Edit Profile</Text>
          </View>
        </View>
        <View style={styles.belowprofiletextwrapper}>
          <Text style={styles.profiletext}>My Service</Text>
          <Text style={styles.profiletext}>Payment</Text>
          <Text style={styles.profiletext}>Notifications </Text>
          <Text style={styles.profiletext}>Privacy Policy</Text>
          <Text style={styles.profiletext}>Terms and conditions</Text>
        </View>
      </View>

      <View style={styles.logout}>
        <Touchable style={styles.logoutButton} onPress={logout}>
          <Text>Logout</Text>
        </Touchable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logout: {
    marginTop: 100,
  },
  logoutButton: {
    padding: 8,
    alignSelf: "center",
  },
  maindrawerView: {
    padding: 10,
  },
  imgtextwrap: {
    flexDirection: "row",

    alignItems: "center",
  },
  profiletext: {
    color: Colors.dark_black,
    fontFamily: FontFamilies.sfSemiBold,
    fontSize: FontSizes.xLarge,
    paddingVertical: 15,
  },
  editprofiletext: {
    color: Colors.primary,
    // marginLeft: 5,
    fontSize: FontSizes.small,
  },
  belowprofiletextwrapper: {
    paddingVertical: 55,
    paddingHorizontal: 12,
  },
});
