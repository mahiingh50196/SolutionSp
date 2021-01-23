import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Drivinglicence } from "../../assets/images";
import {
  Background,
  FullScreenLoader,
  Touchable,
  Text,
  Button,
  TextInput,
} from "../../common";
import { ImagePick } from "../../components";
import { Colors, FontSizes } from "../../config/Theme";
import { api } from "../../services";

const IdUpload = ({ route, navigation: { goBack } }) => {
  const [uploadLoading, setUploadLoading] = React.useState(false);
  const [responseImage, setResponseImage] = React.useState(null);
  const [docNumber, setDocNumber] = React.useState(null);
  const [docDate, setDocDate] = React.useState(null);
  const { title, callback } = route.params;
  function renderOpenModalButton(handlePresentModalPress) {
    return (
      <Touchable onPress={handlePresentModalPress}>
        <Image
          resizeMode="cover"
          source={responseImage ? { uri: responseImage } : Drivinglicence}
          style={styles.image}
        />
        <Text style={styles.upload}>Upload</Text>
      </Touchable>
    );
  }

  const uploadImage = (image) => {
    const formData = new FormData();
    formData.append("image", {
      uri: image.path,
      type: image.mime,
      name: "image.jpg",
    });
    setUploadLoading(true);
    api({
      baseURL: "http://52.39.158.82:8001",
      url: "/api/uploadImage",
      method: "post",
      data: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        if (res.data?.data) {
          setResponseImage(res.data?.data.original);
        }
      })
      .finally(() => {
        setUploadLoading(false);
      });
  };

  const onPickSuccess = (image) => {
    uploadImage(image);
  };

  const handleSubmit = () => {
    callback();
    goBack();
  };

  return (
    <Background options={{ headerShown: true, title }}>
      {uploadLoading && <FullScreenLoader />}
      <ImagePick
        renderOpenModalButton={renderOpenModalButton}
        onPickSuccess={onPickSuccess}
      />
      <TextInput
        onChangeText={(val) => setDocNumber(val)}
        label={`${title} Number`}
        placeholder="12345678XXXXXXXXXXXX"
      />
      <TextInput
        onChangeText={(val) => setDocDate(val)}
        label="Expiration Date"
        placeholder="MM/DD/YYYY"
      />
      <View style={styles.space} />
      <Button onPress={handleSubmit} />
    </Background>
  );
};

export default IdUpload;

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: "100%",
    marginTop: 20,
  },
  upload: {
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
    color: Colors.primary,
    fontSize: FontSizes.xxLarge,
  },
  space: {
    height: 20,
  },
});
