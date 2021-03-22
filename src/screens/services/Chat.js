import React, { useState, useCallback, useEffect } from "react";
import { View, Image, Text, StyleSheet, Linking } from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import {
  GiftedChat,
  Send,
  Bubble,
  Actions,
  ActionsProps,
  Chat,
} from "react-native-gifted-chat";
import { Colors, FontFamilies, FontSizes } from "../../config/Theme";
import Icon from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import { onlineImg, PhoneCall, Send as SendIcon } from "../../assets/images";
import { Touchable, Background } from "../../common";
import { api } from "../../services";
import { SCREEN_WIDTH } from "../../config/Layout";
import { useNavigation } from "@react-navigation/core";

const imagePickerOptions = {
  width: 600,
  height: 800,
  cropping: true,
  includeBase64: true,
  compressImageQuality: 0.7,
};

export default function App({
  route: {
    params: { order },
  },
}) {
  const [messages, setMessages] = useState([]);
  const [responseImage, setResponseImage] = React.useState(null);

  useEffect(() => {
    api({
      method: "get",
      url: `/Provider/MessagesListing?bookingId=${order._id}`,
      showLoader: true,
    }).then((res) => {
      const {
        data: { data },
      } = res;
      const updatedMessages = data.map((each) => ({
        id: each._id,
        text: each.message,
        // image: each.picture,
        user: {
          _id: each.userId,
        },
      }));
      setMessages(updatedMessages);
    });
  }, []);

  const onSend = useCallback(
    async (messages = []) => {
      const chatItem = {
        ...messages[0],
        image: responseImage,
      };
      const info = {
        bookingId: order._id,
        message: chatItem.text,
      };
      if (responseImage) {
        info.picture = responseImage;
      }
      const {
        data: { data },
      } = await api({
        method: "post",
        url: "Provider/SendMessages",
        data: info,
        showLoader: true,
      });
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, chatItem)
      );
      setResponseImage(null);
    },
    [order, responseImage]
  );

  function renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: Colors.primary,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 0,
            padding: 15,

            width: SCREEN_WIDTH * 0.65,
          },
        }}
      />
    );
  }

  const navigation = useNavigation();

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

  function renderActions(props) {
    return (
      <Actions
        {...props}
        options={{
          ["Send Image"]: () => {
            ImagePicker.openPicker(imagePickerOptions).then((image) => {
              // onPickSuccess(image);
              uploadImage(image);
            });
          },
        }}
        icon={() => (
          <Entypo name={"attachment"} size={28} color={Colors.primary} />
        )}
      />
    );
  }

  return (
    // <View style={{ flex: 1, backgroundColor: Colors.white }}>
    <Background
      contentStyle={styles.containerStyle}
      statusBarColor={Colors.primary}
    >
      <View style={styles.parentContainer}>
        <View style={styles.header}>
          <Touchable onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={30} color="white" />
          </Touchable>
          <View style={styles.row}>
            <Image source={onlineImg} style={styles.onlineImage} />
            <View style={{ marginLeft: 20 }}>
              <Text style={styles.guyName}>{order.user_name}</Text>
              {/* <Text style={styles.onlineText}>online</Text> */}
            </View>
          </View>
          <Touchable
            onPress={() => Linking.openURL(`tel:${order.phoneNumber}`)}
          >
            <Image
              source={PhoneCall}
              // style={{ height: 30, width: 30, borderRadius: 15 }}
            />
          </Touchable>
        </View>
      </View>

      <GiftedChat
        style={{}}
        messages={messages}
        renderBubble={renderBubble}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: order.user_id,
        }}
        listViewProps={styles.listViewProps}
        renderActions={renderActions}
        renderSend={(props) => (
          <Send {...props} containerStyle={styles.sendContainer}>
            <Image source={SendIcon} style={styles.sendIcon} />
          </Send>
        )}
      />
    </Background>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    paddingTop: 35,
    paddingBottom: 35,
    paddingHorizontal: SCREEN_WIDTH * 0.04,
    backgroundColor: Colors.primary,
  },
  sendIcon: {
    width: 40,
    height: 40,
  },
  sendContainer: {
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  listViewProps: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  row: { flexDirection: "row" },
  containerStyle: { paddingHorizontal: 0 },
  onlineImage: { height: 30, width: 30, borderRadius: 15 },
  onlineText: {
    color: Colors.white,
    fontFamily: FontFamilies.sfRegular,
    fontSize: FontSizes.large,
  },
  guyName: {
    color: Colors.white,
    fontFamily: FontFamilies.sfRegular,
    fontSize: FontSizes.large,
  },
});
