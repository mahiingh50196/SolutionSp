/* eslint-disable react-native/no-inline-styles */
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
import { UpdateModal } from "../../components";

const tabNames = ["Personal Details", "Documents"];

const PersonalDetails = ({ profileInfo, updateUser }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [updatingData, setUpdateData] = useState("");

  const updatkey = (value) => {
    setUpdateData(value);

    setModalVisible(true);
  };
  const handleModalVisible = () => {
    setModalVisible(false);
  };
  const updatedValue = (val) => {
    const userData = val;
    api({
      url: "/Provider/ProfileUpdate",
      method: "PUT",
      data: userData,
    }).then((res) => {
      updateUser();
    });

    setModalVisible(false);
  };

  if (profileInfo) {
    const {
      fullName,
      email,
      phoneNumber,
      address,
      profilePicture,
    } = profileInfo;
    return (
      <View>
        <View style={styles.personalDetailsContainer}>
          <Touchable
            style={{
              alignItems: "center",
              marginVertical: 50,
              height: 150,
              width: 150,
            }}
          >
            {profilePicture ? (
              <Image
                source={{ uri: profilePicture.thumbnail }}
                style={{ width: "100%", height: "100%", borderRadius: 75 }}
              />
            ) : (
              <Image
                source={profile}
                style={{ width: "100%", height: "100%", borderRadius: 75 }}
              />
            )}
            <Touchable style={{ position: "absolute", right: -60 }}>
              <Image source={Camera} />
            </Touchable>
          </Touchable>
        </View>
        <View style={styles.userinfowrapper}>
          <Text style={styles.profiledetailtext}>Profile Detail </Text>
          <View style={styles.userinfowrap}>
            <Touchable style={styles.userinfoimg}>
              <Image source={profiledetail} />
            </Touchable>
            <Text style={styles.userifonamewidth}>{fullName}</Text>
            <Text
              style={styles.editwidth}
              onPress={() => updatkey({ fullName: fullName })}
            >
              edit
            </Text>
          </View>
          <View style={styles.userinfowrap}>
            <Touchable style={styles.userinfoimg}>
              <Image source={message} />
            </Touchable>
            <Text style={styles.userifonamewidth}>{email}</Text>
            <Text
              style={styles.editwidth}
              onPress={() => updatkey({ email: email })}
            >
              edit
            </Text>
          </View>
          <View style={styles.userinfowrap}>
            <Touchable style={styles.userinfoimg}>
              <Image source={phone} />
            </Touchable>
            <Text style={styles.userifonamewidth}>{phoneNumber}</Text>
            <Text
              style={styles.editwidth}
              onPress={() => updatkey({ phoneNumber: phoneNumber })}
            >
              edit
            </Text>
          </View>
          <View style={styles.userinfowrap}>
            <Touchable style={styles.userinfoimg}>
              <Image source={san} />
            </Touchable>
            <Text style={styles.userifonamewidth}>{address}</Text>
            <Text
              style={styles.editwidth}
              onPress={() => updatkey({ address: address })}
            >
              edit
            </Text>
          </View>
        </View>
        {isModalVisible ? (
          <UpdateModal
            isModalVisible={isModalVisible}
            handleModalVisible={handleModalVisible}
            updatingData={updatingData}
            updatedValue={updatedValue}
          />
        ) : null}
      </View>
    );
  } else {
    return <Text>No Data</Text>;
  }
};

const DocumentList = () => {
  return (
    <View>
      <View style={{ paddingTop: 10 }}>
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
    </View>
  );
};

export default function Home({ navigation }) {
  const info = useRecoilValue(userInfo);

  const [activeTab, setActiveTab] = useState(tabNames[0]);
  const [profileInfo, setProfileInfo] = useState(null);

  // React.useEffect(() => {
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     getUserDetails();
  //     // if (info && !info.documentUploaded) {
  //     //   navigation.navigate("DocsUpload");
  //     // }
  //   });

  //   return unsubscribe;
  // }, [navigation, info]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    if (info && info._id) {
      api({
        url: `/Provider/GetProviderDetails?providerId=${info._id}`,
        method: "GET",
      }).then((res) => {
        setProfileInfo(res.data.data);
      });
    }
  };

  const updateUser = () => {
    getData();
  };

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
        <View style={styles.personalDocTextWrap}>
          <View style={styles.tabContainer}>
            {tabNames.map((tab, index) => {
              const borderStyle =
                index === 0 ? styles.tabLeftStyle : styles.tabRightStyle;

              return (
                <View style={styles.tabwrap}>
                  <Touchable
                    style={[
                      styles.personaldetailcontainer,
                      {
                        backgroundColor:
                          activeTab === tab ? Colors.navy_blue : Colors.white,
                      },
                      borderStyle,
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
              );
            })}
          </View>
          {activeTab === tabNames[0] ? (
            <PersonalDetails
              profileInfo={profileInfo}
              updateUser={updateUser}
            />
          ) : (
            <DocumentList />
          )}
        </View>
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  contentStyle: {
    paddingHorizontal: 0,
  },
  personalDocTextWrap: {
    backgroundColor: Colors.primary,
    paddingBottom: 20,
    paddingTop: 5,
    borderTopEndRadius: 40,
    borderTopLeftRadius: 40,
    // alignSelf: "center",
  },
  tabContainer: {
    // backgroundColor: "red",
    flexDirection: "row",
    alignSelf: "center",
  },
  personalDetailsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  profiledetaildocumentwrapper: {
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
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
    paddingVertical: 10,
    width: SCREEN_WIDTH * 0.495,
  },
  tabLeftStyle: {
    borderTopLeftRadius: 50,
  },
  tabRightStyle: {
    borderTopRightRadius: 50,
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