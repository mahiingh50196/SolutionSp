import React from "react";
import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";
import { nav } from "../assets/images";
import { Touchable } from "../common";
import { api } from "../services";
import { userInfo } from "../store/atoms/auth";
import { Colors, FontSizes, FontFamilies } from "../config/Theme";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { DrawerItemList } from "@react-navigation/drawer";

export default function CustomeDrawer(props) {
  const user = useRecoilValue(userInfo);

  const {
    navigation: { navigate },
  } = props;
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
        <Touchable onPress={() => navigate("Profile")}>
          <View style={styles.imgtextwrap}>
            {!!user &&
            Object.keys(user).length &&
            user?.profilePicture.thumbnail ? (
              <Image
                source={{ uri: user?.profilePicture.thumbnail }}
                style={{ width: 50, height: 50, borderRadius: 25 }}
              />
            ) : (
              <Image source={nav} />
            )}
            <View>
              <Text style={styles.profiletext}>{user?.fullName}</Text>
              <Text style={styles.editprofiletext}>Edit Profile</Text>
            </View>
          </View>
        </Touchable>
        <DrawerItemList {...props} />
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
    paddingHorizontal: 10,
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
