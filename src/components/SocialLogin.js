import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import * as GoogleSignIn from "expo-google-sign-in";
import Modal from "react-native-modal";
import FacebookIcon from "../assets/images/Facebook.png";
import Twitter from "../assets/images/Twitter.png";
import { Touchable } from "../common";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { rCategoryData, userInfo } from "../store/atoms/auth";
import { FontSizes, FontFamilies, Colors } from "../config/Theme";
import { api } from "../services";
import * as Facebook from "expo-facebook";
import { AuthStates } from "../config/Constants";

let preSignUpData;

export default function SocialLogin({ desc }) {
  const setUserInfo = useSetRecoilState(userInfo);
  const categories = useRecoilValue(rCategoryData);
  const [showCategoryPicker, setShowPicker] = React.useState(false);
  useEffect(() => {
    GoogleSignIn.initAsync();
  }, []);

  const login = (authData, category) => {
    const userAuthData = {
      ...authData,
    };
    if (category) {
      axios({
        baseURL: "http://35.175.195.75:8001",
        method: "put",
        url: "/Provider/selectCategoryId",
        data: {
          categoryId: category.value,
        },
        headers: {
          Authorization: `Bearer ${authData?.accessToken}`,
        },
      }).then((res) => {
        const {
          data: { data },
        } = res;

        const authData = data;
        if (authData.location && authData.location.coordinates?.length) {
          setUserInfo({
            ...userAuthData,
            authState: AuthStates.COMPLETE,
          });
        } else {
          setUserInfo({
            ...userAuthData,
            authState: AuthStates.NO_LOCATION,
          });
        }
      });
    } else if (authData.location && authData.location.coordinates?.length) {
      setUserInfo({
        ...userAuthData,
        authState: AuthStates.COMPLETE,
      });
    } else {
      setUserInfo({
        ...userAuthData,
        authState: AuthStates.NO_LOCATION,
      });
    }
  };

  const handleSocialLogin = (authData) => {
    if (!authData?.categoryId) {
      preSignUpData = authData;
      setShowPicker(true);
    } else {
      login(authData);
    }
  };

  const signInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === "success") {
        const { displayName, email, uid } = user;
        api({
          method: "post",
          url: "/Provider/LoginGmail",
          data: {
            socialKey: uid,
            email,
            fullName: displayName,
          },
          showLoader: true,
        }).then((res) => {
          const {
            data: { data },
          } = res;

          const registrationData = Array.isArray(data) ? data[0] : data;
          handleSocialLogin(registrationData);
        });
      }
    } catch (err) {
      console.warn(err);
    }
  };

  async function facebookLogin() {
    await Facebook.initializeAsync({
      appId: "410420650170978",
    });
    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ["public_profile"],
    });
    if (type === "success") {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`
      );

      const result = await response.json();
      const formData = new FormData();
      formData.append("socialKey", token);
      formData.append("fullName", result.name);
      api({
        method: "post",
        url: "/Provider/LoginGmail",
        data: formData,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      }).then((res) => {
        const {
          data: { data },
        } = res;
        const registrationData = Array.isArray(data) ? data[0] : data;
        handleSocialLogin(registrationData);
      });
    } else {
    }
  }

  return (
    <View style={styles.container}>
      <Modal
        isVisible={showCategoryPicker}
        onBackButtonPress={() => setShowPicker(false)}
      >
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <View style={styles.modalHeader}>
            <Text style={styles.categoryTitle}>Choose Category</Text>
            <Touchable onPress={() => setShowPicker(false)}>
              <Icon
                name="close"
                size={24}
                color={Colors.gray}
                style={{ padding: 8 }}
              />
            </Touchable>
          </View>
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 100,
            }}
          >
            {categories.map((category) => {
              return (
                <Touchable
                  key={category.value}
                  style={styles.categoryWrap}
                  onPress={() => {
                    setShowPicker(false);
                    login(preSignUpData, category);
                  }}
                >
                  <Text style={styles.categoryLabel}>{category.label}</Text>
                </Touchable>
              );
            })}
          </ScrollView>
        </View>
      </Modal>
      <Text style={styles.text}>{desc}</Text>
      <View style={styles.socialiconwrapper}>
        <Touchable onPress={facebookLogin}>
          <Image source={FacebookIcon} />
        </Touchable>
        <Touchable onPress={signInAsync}>
          <Image source={Twitter} />
        </Touchable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  text: {
    color: "#8f9bb3",
    fontSize: FontSizes.small,
    textAlign: "center",
    fontFamily: FontFamilies.sfMedium,
  },
  socialiconwrapper: {
    flexDirection: "row",
    //    paddingHorizontal:10,
    justifyContent: "space-evenly",
    marginTop: 30,
  },
  categoryWrap: {
    padding: 12,
    backgroundColor: Colors.graySecondary,
    marginHorizontal: 8,
    marginVertical: 4,
  },
  categoryTitle: {
    color: Colors.black,
    fontFamily: FontFamilies.poppinsMedium,
    padding: 12,
    fontSize: FontSizes.large,
  },
  categoryLabel: {
    color: Colors.gray,
    fontFamily: FontFamilies.poppinsMedium,
    fontSize: FontSizes.medium,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
