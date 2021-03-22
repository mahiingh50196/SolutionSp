import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, TextInput } from "../common";

import Modal from "react-native-modal";

function UpdateModal({
  isModalVisible,
  handleModalVisible,
  updatingData,
  updatedValue,
}) {
  const [handleUserData, setData] = useState(Object.values(updatingData)[0]);

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
        onBackButtonPress={handleModalVisible}
      >
        <View style={styles.modalView}>
          <View style={styles.modalContainer}>
            <TextInput
              autoFocus
              label={"Update " + Object.keys(updatingData)[0]}
              value={handleUserData}
              onChangeText={(e) => setData(e)}
            />
            <Button title="save" style={{ marginTop: 30 }} onPress={sendData} />
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
    width: "100%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    justifyContent: "space-between",
  },
});
