import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Background, Text, Header, Touchable } from "../../common";
import { userInfo } from "../../store/atoms/auth";
import { useRecoilValue } from "recoil";
import { Colors, FontFamilies, FontSizes } from "../../config/Theme";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../config/Layout";
import {
  Camera,
  profile,
  profiledetail,
  san,
  phone,
  message,
} from "../../assets/images";

export default function Home({ navigation }) {
  const info = useRecoilValue(userInfo);
  const [activeStatus, setactivestatus] = useState(1);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (info && !info.isDocumentUploaded) {
        navigation.navigate("DocsUpload");
      }
    });

    return unsubscribe;
  }, [navigation, info]);

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
                { color: activeStatus == 1 ? Colors.white : Colors.navy_blue },
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
          <Text style={styles.userifonamewidth}>Smittty werber</Text>
          <Text style={styles.editwidth}>edit</Text>
        </View>
        <View style={styles.userinfowrap}>
          <Touchable style={styles.userinfoimg}>
            <Image source={message} />
          </Touchable>
          <Text style={styles.userifonamewidth}>Smittty@gmail.com</Text>
          <Text style={styles.editwidth}>edit</Text>
        </View>
        <View style={styles.userinfowrap}>
          <Touchable style={styles.userinfoimg}>
            <Image source={phone} />
          </Touchable>
          <Text style={styles.userifonamewidth}>0967643455</Text>
          <Text style={styles.editwidth}>edit</Text>
        </View>
        <View style={styles.userinfowrap}>
          <Touchable style={styles.userinfoimg}>
            <Image source={san} />
          </Touchable>
          <Text style={styles.userifonamewidth}>San francissco, ca 14A</Text>
          <Text style={styles.editwidth}>edit</Text>
        </View>
      </View>
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
    width: "50%",
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
    marginTop: -30,
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
});
