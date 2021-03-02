import React from "react";
import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";
import { nav } from "../assets/images";
import { Touchable } from "../common";
import { api } from "../services";
import { userInfo } from "../store/atoms/auth";
import { Colors, FontSizes, FontFamilies } from "../config/Theme";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { DrawerItemList } from "@react-navigation/drawer";
import { SCREEN_WIDTH } from "../config/Layout";

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
                resizeMode="cover"
                source={{ uri: user?.profilePicture.thumbnail }}
                style={{ width: 80, height: 80, borderRadius: 40 }}
              />
            ) : (
              <Image
                source={nav}
                resizeMode="cover"
                style={{ width: 80, height: 80, borderRadius: 40 }}
              />
            )}
            <View
              style={{
                bottom: 8,
              }}
            >
              <Text style={styles.profiletext}>{user?.fullName}</Text>
              <Text style={styles.editprofiletext}>Edit Profile</Text>
            </View>
          </View>
          <View style={styles.line} />
        </Touchable>
        <DrawerItemList
          {...{
            ...props,
            labelStyle: {
              fontSize: FontSizes.xLarge,
              color: Colors.black,
              fontFamily: FontFamilies.sfSemiBold,
            },
          }}
        />
      </View>
      <Touchable style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </Touchable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    padding: 8,
    alignSelf: "flex-start",
    marginLeft: SCREEN_WIDTH * 0.06,
  },
  logoutText: {
    fontFamily: FontFamilies.sfSemiBold,
    fontSize: FontSizes.default,
  },
  maindrawerView: {
    padding: 10,
    paddingBottom: 100,
  },
  imgtextwrap: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
  },
  profiletext: {
    color: Colors.dark_black,
    fontFamily: FontFamilies.sfSemiBold,
    fontSize: FontSizes.xLarge,
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
  line: {
    elevation: 1,
    height: 0.5,
    marginBottom: 20,
  },
});
