import React, { useState, useCallback, useEffect } from "react";
import { View, Image, Text } from "react-native";
import { GiftedChat, Send, Bubble } from "react-native-gifted-chat";
import { Colors, FontFamilies, FontSizes } from "../../config/Theme";
import Icon from "react-native-vector-icons/Ionicons";
import { onlineImg, PhoneCall, Send as SendIcon } from "../../assets/images";
import { Touchable, Background } from "../../common";
import { SCREEN_WIDTH } from "../../config/Layout";
import { useNavigation } from "@react-navigation/core";

export default function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello mahi",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

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

  return (
    // <View style={{ flex: 1, backgroundColor: Colors.white }}>
    <Background
      contentStyle={{ paddingHorizontal: 0 }}
      statusBarColor={Colors.primary}
    >
      <View
        style={{
          paddingTop: 35,
          paddingBottom: 35,
          paddingHorizontal: SCREEN_WIDTH * 0.04,
          backgroundColor: Colors.primary,
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Touchable onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={30} color="white" />
          </Touchable>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={onlineImg}
              style={{ height: 30, width: 30, borderRadius: 15 }}
            />
            <View style={{ marginLeft: 20 }}>
              <Text
                style={{
                  color: Colors.white,
                  fontFamily: FontFamilies.sfRegular,
                  fontSize: FontSizes.large,
                }}
              >
                Evan
              </Text>
              <Text
                style={{
                  color: Colors.white,
                  fontFamily: FontFamilies.sfRegular,
                  fontSize: FontSizes.large,
                }}
              >
                online
              </Text>
            </View>
          </View>
          <Image
            source={PhoneCall}
            // style={{ height: 30, width: 30, borderRadius: 15 }}
          />
        </View>
      </View>

      <GiftedChat
        style={{}}
        messages={messages}
        renderBubble={renderBubble}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        listViewProps={{
          backgroundColor: "white",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
        renderSend={(props) => (
          <Send
            {...props}
            containerStyle={{
              height: 60,
              width: 60,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={SendIcon}
              style={{
                width: 40,
                height: 40,
              }}
            />
          </Send>
        )}
      />
    </Background>
  );
}
