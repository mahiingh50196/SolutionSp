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
          <Text style={styles.title}>Select An Image</Text>
          <View style={styles.buttonContainer}>
            <View style={globalStyles.hLine} />
            <TouchableOpacity style={styles.button} onPress={openCamera}>
              <Text style={styles.bottomText}>Camera</Text>
            </TouchableOpacity>
            <View style={globalStyles.hLine} />
            <TouchableOpacity style={styles.button} onPress={openGalary}>
              <Text style={styles.bottomText}>Galary</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ImagePick;

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: Colors.white,
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
    fontFamily: FontFamilies.sfSemiBold,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
});
