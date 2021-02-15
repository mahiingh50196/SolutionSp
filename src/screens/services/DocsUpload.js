import React, { useState } from "react";
import {
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { Background, Button, Toast } from "../../common";
import { Drivinglicence, Tick } from "../../assets/images";
import { Colors, FontFamilies, FontSizes } from "../../config/Theme";
import { SCREEN_WIDTH } from "../../config/Layout";
import { api } from "../../services";
import { useRecoilState } from "recoil";
import { userInfo } from "../../store/atoms/auth";

export default function DocsUpload({ navigation: { navigate, popToTop } }) {
  const [docs, setDocs] = useState([
    {
      type: "address",
      title: "Address Proof",
    },
    {
      type: "id",
      title: "Identity Proof",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useRecoilState(userInfo);

  const handleCallBack = (info) => {
    const updatedDocs = docs.map((doc) => {
      if (doc.type === info.type) {
        return {
          ...info,
        };
      }
      return doc;
    });
    setDocs(updatedDocs);
  };

  async function handleDocsUpload() {
    const addressDoc = docs.find((each) => each.type === "address");
    const idDoc = docs.find((each) => each.type === "id");
    if (!addressDoc.docUri) {
      Toast.show({ text: `Please upload ${addressDoc.title}`, type: "error" });
      return;
    } else if (!idDoc.docUri) {
      Toast.show({ text: `Please upload ${idDoc.title}`, type: "error" });
      return;
    }
    try {
      setLoading(true);
      const result = await api({
        method: "post",
        url: "/Provider/DocumentsUpload",
        data: {
          addressProofPicture: addressDoc.docUri,
          addressProofNumber: addressDoc.docNumber,
          addressExpiryDate: addressDoc.docDate,
          identyPicture: idDoc.docUri,
          identyNumber: idDoc.docNumber,
          identyExpiryDate: idDoc.docDate,
        },
      });
      setUser({
        ...user,
        documentUploaded: true,
      });
      popToTop();
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <Background>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {docs.map((doc, idx) => {
          return (
            <TouchableOpacity
              key={idx}
              style={styles.touchable}
              onPress={() =>
                navigate("IdUpload", {
                  docData: doc,
                  callback: handleCallBack,
                })
              }
            >
              {!doc.docUri && <View style={styles.overLay} />}
              {doc.docUri ? (
                <View style={styles.doc}>
                  <Image
                    resizeMode="contain"
                    source={{ uri: doc.docUri }}
                    style={styles.docImage}
                  />
                  <View style={styles.docContainer}>
                    <Text style={styles.docImageTitle}>{doc.title}</Text>
                    <Image source={Tick} style={styles.tick} />
                  </View>
                </View>
              ) : (
                <View style={styles.doc}>
                  <Text style={styles.uploadText}>Upload</Text>
                  <Image
                    resizeMode="cover"
                    source={Drivinglicence}
                    style={styles.image}
                  />
                  <Text style={styles.label}>{doc.title}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <View style={{ marginTop: 50 }}>
        <Button
          style={styles.submit}
          isLoading={loading}
          title="Submit"
          onPress={handleDocsUpload}
        />
      </View>
    </Background>
  );
}
const styles = StyleSheet.create({
  image: {
    alignSelf: "center",
    opacity: 0.4,
    height: 200,
    width: "100%",
  },
  label: {
    position: "absolute",
    bottom: 20,
    left: 20,
    fontSize: FontSizes.xLarge,
    color: Colors.primary,
    fontFamily: FontFamilies.sfBold,
  },
  overLay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 8,
  },
  touchable: {
    marginTop: 20,
    borderRadius: 8,
  },
  uploadText: {
    color: Colors.white,
    position: "absolute",
    fontSize: FontSizes.xxLarge,
    fontFamily: FontFamilies.sfBold,
    top: 80,
    left: SCREEN_WIDTH * 0.3,
    elevation: 4,
    zIndex: 4,
  },
  docImage: {
    height: 160,
  },
  docImageTitle: {
    fontSize: FontSizes.xLarge,
    color: Colors.primary,
    fontFamily: FontFamilies.sfBold,
  },
  tick: {
    height: 30,
    width: 30,
  },
  docContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: SCREEN_WIDTH * 0.04,
    paddingVertical: 8,
  },
  doc: {
    borderColor: "rgb(228, 233, 242)",
    borderWidth: 1,
    borderRadius: 8,
  },
  submit: { height: 60, justifyContent: "center", borderRadius: 15 },
  scrollContainer: {
    paddingVertical: 50,
  },
});
