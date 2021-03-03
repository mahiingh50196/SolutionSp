import React, { useCallback, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import { globalStyles, Text, Modal } from "../common";
import { Colors, FontFamilies } from "../config/Theme";

const ImagePick = ({ renderOpenModalButton, onPickSuccess }) => {
  const [visible, setVisible] = useState(false);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    setVisible(true);
  }, []);

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      setVisible(false);
      onPickSuccess(image);
    });
  };

  const openGalary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      setVisible(false);
      onPickSuccess(image);
    });
  };

  return (
    <>
      {renderOpenModalButton(handlePresentModalPress)}
      <Modal
        style={styles.modal}
        isVisible={visible}
        onBackButtonPress={() => setVisible(false)}
        onBackdropPress={() => setVisible(false)}
      >
        <View style={styles.contentContainer}>
          <View style={styles.buttonContainer}>
            <View style={styles.topButtons}>
              <TouchableOpacity style={styles.button} onPress={openCamera}>
                <Text style={styles.bottomText}>Take a Picture</Text>
              </TouchableOpacity>
              <View style={globalStyles.hLine} />
              <TouchableOpacity style={styles.button} onPress={openGalary}>
                <Text style={styles.bottomText}>Choose a picture</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.wrapCancel}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setVisible(false)}
              >
                <Text
                  style={[
                    styles.bottomText,
                    {
                      fontFamily: FontFamilies.sfBold,
                    },
                  ]}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ImagePick;

const styles = StyleSheet.create({
  contentContainer: {
    marginHorizontal: 12,
    marginBottom: 20,
  },
  buttonContainer: {
    justifyContent: "flex-end",
  },
  button: {
    paddingVertical: 14,
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    marginVertical: 20,
    color: Colors.black,
  },
  bottomText: {
    color: Colors.primary,
    fontFamily: FontFamilies.sfRegular,
    fontSize: 20,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  topButtons: { backgroundColor: "#fff", borderRadius: 12 },
  wrapCancel: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginTop: 20,
  },
});
