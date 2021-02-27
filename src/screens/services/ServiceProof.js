import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TakePhoto } from "../../assets/images";
import { Background, Button, Touchable } from "../../common";
import { ImagePick } from "../../components";
import { SCREEN_HEIGHT } from "../../config/Layout";
import { Colors } from "../../config/Theme";
import { api } from "../../services";

const ServiceProof = ({
  route: {
    params: { orderId, callback },
  },
}) => {
  const [responseImage, setResponseImage] = React.useState(null);
  const { goBack } = useNavigation();

  const uploadImage = (image) => {
    const formData = new FormData();
    formData.append("image", {
      uri: image.path,
      type: image.mime,
      name: "image.jpg",
    });
    api({
      baseURL: "http://52.39.158.82:8001",
      url: "/api/uploadImage",
      method: "post",
      data: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      showLoader: true,
    }).then((res) => {
      if (res.data?.data) {
        setResponseImage(res.data?.data.original);
      }
    });
  };

  const onPickSuccess = (image) => {
    uploadImage(image);
  };

  const uploadServiceProof = async () => {
    api({
      url: "/Provider/UploadServiceProof",
      method: "post",
      data: {
        image: responseImage,
        orderId,
      },
      showLoader: true,
    }).then((res) => {
      callback();
      goBack();
    });
  };

  const renderOpenModalButton = (handlePresentModalPress) => (
    <View style={styles.imageContainer}>
      {responseImage ? (
        <Image
          resizeMode="contain"
          source={{ uri: responseImage }}
          style={styles.proofOfService}
        />
      ) : (
        <Touchable onPress={handlePresentModalPress}>
          <Image
            resizeMode="contain"
            source={TakePhoto}
            style={styles.takePhoto}
          />
        </Touchable>
      )}
    </View>
  );

  return (
    <Background contentStyle={{ backgroundColor: Colors.dark_navyblue }}>
      <ImagePick
        renderOpenModalButton={renderOpenModalButton}
        onPickSuccess={onPickSuccess}
      />
      {!!responseImage && (
        <Button onPress={uploadServiceProof} style={styles.submit}>
          Submit
        </Button>
      )}
    </Background>
  );
};

export default ServiceProof;

const styles = StyleSheet.create({
  takePhoto: {
    height: 60,
    width: 60,
    borderRadius: 30,
    alignSelf: "center",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 50,
  },
  proofOfService: {
    height: SCREEN_HEIGHT * 0.6,
    width: "100%",
    alignSelf: "flex-start",
    flex: 1,
  },
  submit: {
    marginBottom: 40,
  },
});
