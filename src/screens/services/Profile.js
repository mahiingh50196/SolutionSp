/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Background, Text, Header, Touchable } from "../../common";
import { ImagePick } from "../../components";
import { userInfo } from "../../store/atoms/auth";
import { useRecoilState, useRecoilValue } from "recoil";
import { Colors, FontFamilies, FontSizes } from "../../config/Theme";
import { SCREEN_WIDTH } from "../../config/Layout";
import {
  profiledetail,
  san,
  phone,
  message,
  Tick,
  Avatar,
} from "../../assets/images";
import { api } from "../../services";
import { UpdateModal } from "../../components";

const tabNames = ["Personal Details", "Documents"];

const PersonalDetails = ({ updateUser }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [updatingData, setUpdateData] = useState("");
  const [profileInfo, setProfileInfo] = useRecoilState(userInfo);

  const updatkey = (value) => {
    setUpdateData(value);

    setModalVisible(true);
  };
  const handleModalVisible = () => {
    setModalVisible(false);
  };
  const updatedValue = (updatedData) => {
    api({
      url: "/Provider/ProfileUpdate",
      method: "put",
      data: updatedData,
      showLoader: true,
    }).then((res) => {
      const {
        data: { data },
      } = res;
      setProfileInfo({
        ...profileInfo,
        ...data,
      });
    });
    setModalVisible(false);
  };

  const onPickSuccess = async (image) => {
    const formData = new FormData();
    formData.append("image", {
      uri: image.path,
      type: image.mime,
      name: "image.jpg",
    });

    const {
      data: { data },
    } = await api({
      baseURL: "http://52.39.158.82:8001",
      url: "/api/uploadImage",
      method: "post",
      data: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
    updatedValue({
      profilePicture: data.original,
    });
  };

  const renderOpenModalButton = (handlePresentModalPress) => {
    return (
      <Touchable onPress={handlePresentModalPress}>
        <Image
          resizeMode="cover"
          source={
            profileInfo && profileInfo?.profilePicture?.thumbnail
              ? { uri: profileInfo.profilePicture.thumbnail }
              : Avatar
          }
          style={styles.avatar}
        />
      </Touchable>
    );
  };

  if (profileInfo) {
    const { fullName, email, phoneNumber, address } = profileInfo;

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
            <ImagePick
              renderOpenModalButton={renderOpenModalButton}
              onPickSuccess={onPickSuccess}
            />
          </Touchable>
        </View>
        <View style={[styles.userinfowrapper]}>
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
const DocumentList = ({ onPress }) => {
  const profileInfo = useRecoilValue(userInfo);
  const [image, setImage] = useState("");
  const [viewDocument, setViewDocument] = useState(false);
  const openModal = ({ data }) => {
    setImage(data);
    setViewDocument(true);
  };

  const closeModal = () => {
    setViewDocument(true);
  };
  console.log(profileInfo, "yoo");
  return (
    <View>
      <View style={{ paddingTop: 10 }}>
        <View style={styles.userinfowrapper}>
          <TouchableOpacity
            onPress={() => {
              setImage(profileInfo?.addproof?.original);
              setViewDocument(true);
            }}
          >
            <Image
              style={styles.docImage}
              resizeMode="contain"
              source={{ uri: profileInfo?.addproof?.original }}
            />
          </TouchableOpacity>
          <View style={styles.tickproofview}>
            <Text>Address Proof</Text>
            <Image source={Tick} />
          </View>
          <TouchableOpacity
            onPress={() => {
              setImage(profileInfo?.identicard?.original);
              setViewDocument(true);
            }}
          >
            <Image
              style={styles.docImage}
              resizeMode="contain"
              source={{ uri: profileInfo?.identicard?.original }}
            />
          </TouchableOpacity>
          <View style={styles.tickproofview}>
            <Text>Identification cards</Text>
            <Image source={Tick} />
          </View>
        </View>
      </View>
      <Modal
        onRequestClose={() => setViewDocument(false)}
        visible={viewDocument}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setViewDocument(false)}
        >
          <Image
            source={{ uri: image }}
            resizeMode="contain"
            style={{ height: "100%", width: "100%" }}
          />
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={closeModal}></TouchableOpacity> */}
      </Modal>
    </View>
  );
};

export default function Home({ navigation }) {
  const [activeTab, setActiveTab] = useState(tabNames[0]);
  const [profileInfo, setProfileInfo] = useRecoilState(userInfo);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    if (profileInfo && profileInfo._id) {
      api({
        url: `/Provider/GetProviderDetails?providerId=${profileInfo._id}`,
        method: "GET",
      }).then((res) => {
        const registrationData = Array.isArray(res.data.data)
          ? res.data.data[0]
          : res.data.data;
        setProfileInfo({
          ...profileInfo,
          ...registrationData,
        });
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
          <View>
            {activeTab === tabNames[0] ? (
              <PersonalDetails updateUser={updateUser} />
            ) : (
              <DocumentList />
            )}
          </View>
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
  avatar: {
    alignSelf: "center",
    marginTop: 20,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  docImage: {
    height: 100,
    width: SCREEN_WIDTH * 0.8,
  },
});
