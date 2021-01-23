import React, { useState } from "react";
import { Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Background } from "../../common";
import { Drivinglicence } from "../../assets/images";
import { Colors, FontFamilies, FontSizes } from "../../config/Theme";
import { SCREEN_WIDTH } from "../../config/Layout";

export default function DocsUpload({ navigation: { navigate } }) {
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

  const handleCallBack = (info) => {
    const updatedDocs = docs.map((doc) => {
      if (doc.type === info.type) {
        return {
          ...info,
        };
      }
      return doc;
    });
    console.log(updatedDocs);
    setDocs(updatedDocs);
  };

  return (
    <Background options={{ headerShown: true, title: "Document Management" }}>
      {docs.map((doc) => (
        <TouchableOpacity
          style={styles.touchable}
          onPress={() =>
            navigate("IdUpload", {
              docData: doc,
              callback: handleCallBack,
            })
          }
        >
          <Text style={styles.uploadText}>Upload</Text>
          <Image
            resizeMode="cover"
            source={doc.docUri ? { source: doc.docUri } : Drivinglicence}
            style={styles.image}
          />
          <Text style={styles.label}>Address Proof</Text>
        </TouchableOpacity>
      ))}
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
  touchable: {
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 4,
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
});
