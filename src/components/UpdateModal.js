import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Touchable, Button } from "../common";

import Modal from "react-native-modal";

function UpdateModal({
  isModalVisible,
  handleModalVisible,
  updatingData,
  updatedValue,
}) {
  const [handleUserData, setData] = useState(Object.values(updatingData)[0]);

  useEffect(() => {
    console.warn("updatingData", updatingData);
  });

  const sendData = () => {
    let key = Object.keys(updatingData)[0];
    let data = {};
    data[key] = handleUserData;
    updatedValue(data);
  };

  return (
    <View style={{ flex: 1 }}>
      <Modal
        isVisible={isModalVisible}
        animationIn="bounceIn"
        onBackdropPress={handleModalVisible}
      >
        <View style={styles.modalView}>
          <View style={styles.modalContainer}>
            <Text>{"Enter " + Object.keys(updatingData)[0]}</Text>
            <TextInput
              value={handleUserData}
              onChangeText={(e) => setData(e)}
            />
            <Button
              title="save"
              style={{ marginHorizontal: 40 }}
              onPress={() => sendData()}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
export default UpdateModal;

const styles = StyleSheet.create({
  modalView: {
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    height: "70%",
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
  },
});
