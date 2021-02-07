import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View, ScrollView } from "react-native";
import { Background, Text, Header, Touchable } from "../../common";
import { userInfo } from "../../store/atoms/auth";
import { useRecoilValue } from "recoil";
import { Colors, FontFamilies, FontSizes } from "../../config/Theme";
import { SCREEN_WIDTH } from "../../config/Layout";
import {
  Camera,
  profile,
  profiledetail,
  san,
  phone,
  message,
  License,
  Tick,
} from "../../assets/images";
import { api } from "../../services";

const tabNames = ["Personal Details", "Documents"];

export default function Home({ navigation }) {
  const info = useRecoilValue(userInfo);

  const [activeTab, setActiveTab] = useState(tabNames[0]);
  const [state, setState] = useState({ profileData: {} });

  useEffect(() => {
    if (info && info._id) {
      api({
        url: `/Provider/GetProviderDetails?providerId=${info._id}`,
        method: "GET",
      })
        .then((res) => {
          setState({ ...state, profileData: res.data.data });
        })
        .finally((err) => {
          console.warn("err", err);
        });
    }
  }, [info]);

  return (
    <Background
      contentStyle={styles.contentStyle}
      witNotchstyle={Colors.off_White}
    >
      <Header
        withDrawerIcon
        withBack={false}
        title="Account"
        backgroundColor={{ backgroundColor: Colors.off_White }}
      />
      <ScrollView>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {tabNames.map((tab, index) => (
            <View>
              <Touchable
                style={[
                  styles.personaldetailcontainer,
                  {
                    backgroundColor:
                      activeTab === tab ? Colors.navy_blue : Colors.white,
                  },
                ]}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  style={[
                    styles.text,
                    {
                      color:
                        activeTab === tab ? Colors.white : Colors.navy_blue,
                    },
                  ]}
                >
                  {tab}
                </Text>
              </Touchable>
            </View>
          ))}
        </View>
        {/* {activeStatus == 1 ? (
          <View>
            <View style={styles.profiledetaildocumentwrapper}>
              <View style={styles.detailsdoctextwrapper}>
                <Touchable
                  style={[
                    styles.personaldetailcontainer,
                    {
                      backgroundColor:
                        activeStatus == 1 ? Colors.navy_blue : Colors.white,
                    },
                  ]}
                  onPress={() => setactivestatus(1)}
                >
                  <Text
                    style={[
                      styles.text,
                      {
                        color:
                          activeStatus == 1 ? Colors.white : Colors.navy_blue,
                      },
                    ]}
                  >
                    Personal Details
                  </Text>
                </Touchable>
                <Touchable
                  style={[
                    styles.personaldetailcontainer1,
                    {
                      backgroundColor:
                        activeStatus == 2 ? Colors.navy_blue : Colors.white,
                    },
                  ]}
                  onPress={() => setactivestatus(2)}
                >
                  <Text
                    style={[
                      styles.text,
                      { color: activeStatus == 2 ? Colors.white : "grey" },
                    ]}
                  >
                    Documents{" "}
                  </Text>
                </Touchable>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Touchable style={{ marginLeft: SCREEN_WIDTH * 0.3 }}>
                  <Image source={profile} />
                </Touchable>
                <Touchable style={{ right: 120 }}>
                  <Image source={Camera} />
                </Touchable>
              </View>
            </View>
            <View style={styles.userinfowrapper}>
              <Text style={styles.profiledetailtext}>Profile Detail </Text>
              <View style={styles.userinfowrap}>
                <Touchable style={styles.userinfoimg}>
                  <Image source={profiledetail} />
                </Touchable>
                <Text style={styles.userifonamewidth}>
                  {state.profileData.fullName}
                </Text>
                <Text style={styles.editwidth}>edit</Text>
              </View>
              <View style={styles.userinfowrap}>
                <Touchable style={styles.userinfoimg}>
                  <Image source={message} />
                </Touchable>
                <Text style={styles.userifonamewidth}>
                  {state.profileData.email}
                </Text>
                <Text style={styles.editwidth}>edit</Text>
              </View>
              <View style={styles.userinfowrap}>
                <Touchable style={styles.userinfoimg}>
                  <Image source={phone} />
                </Touchable>
                <Text style={styles.userifonamewidth}>
                  {state.profileData.phoneNumber}
                </Text>
                <Text style={styles.editwidth}>edit</Text>
              </View>
              <View style={styles.userinfowrap}>
                <Touchable style={styles.userinfoimg}>
                  <Image source={san} />
                </Touchable>
                <Text style={styles.userifonamewidth}>
                  {state.profileData.address}
                </Text>
                <Text style={styles.editwidth}>edit</Text>
              </View>
            </View>
          </View>
        ) : (
          <View>
            <View style={styles.profiledetaildocumentwrapper}>
              <View style={styles.detailsdoctextwrapper}>
                <Touchable
                  style={[
                    styles.personaldetailcontainer,
                    {
                      backgroundColor:
                        activeStatus == 1 ? Colors.navy_blue : Colors.white,
                    },
                  ]}
                  onPress={() => setactivestatus(1)}
                >
                  <Text
                    style={[
                      styles.text,
                      {
                        color:
                          activeStatus == 1 ? Colors.white : Colors.navy_blue,
                      },
                    ]}
                  >
                    Personal Details
                  </Text>
                </Touchable>
                <Touchable
                  style={[
                    styles.personaldetailcontainer1,
                    {
                      backgroundColor:
                        activeStatus == 2 ? Colors.navy_blue : Colors.white,
                    },
                  ]}
                  onPress={() => setactivestatus(2)}
                >
                  <Text
                    style={[
                      styles.text,
                      { color: activeStatus == 2 ? Colors.white : "grey" },
                    ]}
                  >
                    Documents{" "}
                  </Text>
                </Touchable>
              </View>
            </View>
            <View style={styles.userinfowrapper}>
              <Image source={License} />
              <View style={styles.tickproofview}>
                <Text>Adress Proof</Text>
                <Image source={Tick} />
              </View>

              <Image source={License} />
              <View style={styles.tickproofview}>
                <Text>Identification cards</Text>
                <Image source={Tick} />
              </View>
              <Image source={License} />
            </View>
          </View>
        )} */}
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  contentStyle: {
    paddingHorizontal: 0,
  },
  profiledetaildocumentwrapper: {
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 10,
  },
  detailsdoctextwrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: SCREEN_WIDTH * 0.02,
  },

  text: {
    color: Colors.white_dark,
    textAlign: "center",
  },
  personaldetailcontainer: {
    padding: 10,
    width: SCREEN_WIDTH * 0.5,
    borderTopLeftRadius: 20,
  },
  personaldetailcontainer1: {
    backgroundColor: Colors.white,
    padding: 10,
    width: "50%",
    borderTopRightRadius: 30,
  },
  userinfowrapper: {
    backgroundColor: "white",
    padding: 30,
    borderTopRightRadius: SCREEN_WIDTH * 0.1,
    borderTopLeftRadius: SCREEN_WIDTH * 0.1,
    alignSelf: "center",
  },
  profiledetailtext: {
    color: Colors.navy_blue,
    fontFamily: FontFamilies.sfMedium,
  },
  userinfowrap: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  userinfoimg: {
    width: "20%",
  },
  userifonamewidth: {
    width: "70%",
    color: Colors.grey,
    fontFamily: FontFamilies.sfRegular,
  },
  editwidth: {
    width: "10%",
    fontSize: FontSizes.default,
    color: "grey",
  },
  tickproofview: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
});
