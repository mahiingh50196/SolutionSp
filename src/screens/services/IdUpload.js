import React from "react";
import { Image, StyleSheet, View, Platform } from "react-native";
import { Drivinglicence } from "../../assets/images";
import {
  Background,
  FullScreenLoader,
  Touchable,
  Text,
  Button,
  TextInput,
  Toast,
} from "../../common";
import { ImagePick } from "../../components";
import { Colors, FontSizes } from "../../config/Theme";
import { api } from "../../services";
import dayjs from "dayjs";
import DateTimePicker from "@react-native-community/datetimepicker";

const IdUpload = ({ route, navigation: { goBack } }) => {
  const [uploadLoading, setUploadLoading] = React.useState(false);
  const [pickerVisibility, setPickerVisibility] = React.useState(false);
  const [responseImage, setResponseImage] = React.useState(null);
  const [docNumber, setDocNumber] = React.useState(null);
  const [docDate, setDocDate] = React.useState();
  const { docData, callback } = route.params;
  const { title } = docData;

  React.useEffect(() => {
    console.log(docData);
    if (docData) {
      if (docData.docUri) {
        setResponseImage(docData.docUri);
      }
      if (docData.docNumber) {
        setDocNumber(docData.docNumber);
      }
    }
  }, [docData]);

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

  const validateForm = () => {
    if (!responseImage) {
      return "Document Image is required";
    }
    if (!docNumber) {
      return "Document Number is required";
    }
    if (!docDate) {
      return "Document Expiration date is required";
    }
  };

  const handleSubmit = () => {
    const errorMessage = validateForm();
    if (errorMessage) {
      Toast.show({ text: errorMessage, type: "error" });
      return;
    }
    const data = {
      ...docData,
      docDate,
      docNumber,
      docUri: responseImage,
    };
    callback(data);
    goBack();
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || docDate;
    setPickerVisibility(Platform.OS === "ios");
    setDocDate(currentDate);
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
        keyboardType="number-pad"
        defaultValue={docNumber}
      />
      <Touchable onPress={() => setPickerVisibility(!pickerVisibility)}>
        <TextInput
          editable={false}
          onChangeText={setDocDate}
          label="Expiration Date"
          placeholder="MM/DD/YYYY"
          value={docDate ? dayjs(docDate).format("MM/DD/YYYY") : null}
        />
        {pickerVisibility && (
          <DateTimePicker
            testID="dateTimePicker"
            value={docDate ? dayjs(docDate).format("MM/DD/YYYY") : new Date()}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChangeDate}
          />
        )}
      </Touchable>
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
    marginVertical: 20,
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
