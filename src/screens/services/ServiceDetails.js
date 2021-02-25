import React from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import AntDesign from "react-native-vector-icons/AntDesign";
import dayjs from "dayjs";
import {
  Background,
  Touchable,
  Button,
  Swiper,
  Toast,
  Map,
} from "../../common";
import { onlineImg, date, clock, Mask, Pin } from "../../assets/images";
import { Colors, FontFamilies, FontSizes } from "../../config/Theme";
import { api } from "../../services";
import { OrderStates } from "../../config/Constants";
import { SCREEN_WIDTH } from "../../config/Layout";

const getTime = (val) => {
  const hours = val / 60;
  const minutes = val % 60;
  return `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`;
};

const ActionIconButton = ({ title, renderIcon, type, onPress }) => {
  const getButtonBackground = () => {
    switch (type) {
      case "call":
        return Colors.primary;
      case "message":
        return Colors.blue;
      default:
        return "#bec2ce";
    }
  };

  return (
    <Touchable
      onPress={onPress}
      style={[
        styles.actionButtonContainer,
        { backgroundColor: getButtonBackground() },
      ]}
    >
      {renderIcon && renderIcon()}
      <Text style={styles.actionButtonIconText}>{title}</Text>
    </Touchable>
  );
};

const Header = ({ orderDetails }) => {
  const {
    user_name: userName,
    ratings,
    Date: booking_Date,
    Time: booking_Time,
    status,
  } = orderDetails;
  const bookingDate = new Date(booking_Date);

  return (
    <>
      <View style={styles.mainview}>
        <Touchable style={styles.profile}>
          <Image source={onlineImg} />
        </Touchable>
        <View style={styles.profilename}>
          <Text style={styles.profiletext}>{userName}</Text>
          <View style={styles.ratingView}>
            <FontAwesome name="star" size={10} color={Colors.rating} />
            <Text style={styles.ratingtext}>{ratings || "not available"}</Text>
          </View>
          <View style={styles.dateview}>
            <Image source={date} />
            <Text style={styles.datetext}>
              {dayjs(bookingDate).format("DD MMM, YYYY")}
            </Text>
            <Image source={clock} />
            <Text style={styles.timeText}>{getTime(booking_Time)}</Text>
          </View>
        </View>
        <View style={styles.pendingview}>
          <Text style={styles.pendingtext}>{status}</Text>
        </View>
      </View>
      <Text style={styles.servicesText}>Services</Text>
    </>
  );
};

const ManageOrderStates = ({ orderDetails, callback }) => {
  const { _id, status } = orderDetails;

  const { goBack } = useNavigation();

  const renderSwipeButtons = () => {
    switch (orderDetails.status) {
      case OrderStates.Accepted:
      case OrderStates.Confirmed:
        return (
          <Swiper
            title="Swipe Right to Reached"
            onSwipe={async (swiperRef) => {
              await updateOrderStatus(OrderStates.Reached);
              swiperRef.current.reset();
              callback();
              Toast.show({ text: "Service started" });
            }}
          />
        );
      case OrderStates.Reached:
        return (
          <Swiper
            title="Swipe Right To Start"
            onSwipe={async (swiperRef) => {
              await updateOrderStatus(OrderStates.Started);
              swiperRef.current.reset();
              callback();
              Toast.show({ text: "marked as reached" });
            }}
          />
        );
      case OrderStates.Started:
        return (
          <Swiper
            title="Swipe Right To Complete"
            onSwipe={async (swiperRef) => {
              await updateOrderStatus(OrderStates.Completed);
              swiperRef.current.reset();
              callback();
              Toast.show({ text: "marked as complete" });
            }}
          />
        );
      default:
        break;
    }
  };

  const updateOrderStatus = async (orderState) => {
    const {
      data: { data },
    } = await api({
      method: "put",
      url: "/Provider/BookingManaged",
      data: {
        orderId: _id,
        status: orderState,
      },
      showLoader: true,
    });
    return true;
  };

  const handleAccept = async () => {
    const isUpdated = await updateOrderStatus(OrderStates.Accepted);
    if (isUpdated) {
      goBack();
    }
  };

  const handleReject = async () => {
    const isUpdated = await updateOrderStatus(OrderStates.Rejected);
    if (isUpdated) {
      goBack();
    }
  };

  const handleCancel = async () => {
    const isUpdated = await updateOrderStatus(OrderStates.Canceled);
    if (isUpdated) {
      goBack();
    }
  };

  if (status === OrderStates.Pending) {
    return (
      <View style={styles.buttonStyle}>
        <Button width={180} title="Accept" onPress={handleAccept} />
        <Button
          type="transparent"
          width={110}
          title="Ignore"
          style={{ borderWidth: 1, borderColor: Colors.primary }}
          onPress={handleReject}
        />
      </View>
    );
  }
  return (
    <View>
      <View style={styles.actionIconsContainer}>
        <ActionIconButton
          title="Call"
          type="call"
          renderIcon={() => (
            <FontAwesome name="phone" color={Colors.white} size={20} />
          )}
        />
        <ActionIconButton
          title="Message"
          type="message"
          renderIcon={() => (
            <AntDesign name="message1" color={Colors.white} size={20} />
          )}
        />
        {status !== OrderStates.Canceled ||
          (status !== OrderStates.Rejected && (
            <ActionIconButton
              title="Cancel"
              type="cancel"
              renderIcon={() => (
                <AntDesign name="delete" color={Colors.white} size={20} />
              )}
              onPress={handleCancel}
            />
          ))}
      </View>
      {renderSwipeButtons()}
    </View>
  );
};

const Footer = ({ orderDetails, callback }) => {
  const { specialInstruction: instructions, location } = orderDetails;
  // console.warn(location);
  return (
    <View>
      <Text
        style={[
          styles.service,
          { paddingVertical: 10, fontSize: FontSizes.default },
        ]}
      >
        Tracking Details
      </Text>
      <Touchable
        style={styles.mapContainer}
        onPress={() => navigate("TrackingDetails", { orderDetails })}
      >
        <Map
          initialLocation={{
            latitude: location[1],
            longitude: location[0],
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          }}
          renderPin={() => (
            <Image resizeMode="contain" source={Pin} style={styles.pin} />
          )}
        />
      </Touchable>
      <Text
        style={[
          styles.service,
          { paddingVertical: 10, fontSize: FontSizes.default },
        ]}
      >
        Special Instructions
      </Text>
      <Text style={styles.longtext}>
        {instructions || "No special instructions"}
      </Text>
      <ManageOrderStates orderDetails={orderDetails} callback={callback} />
    </View>
  );
};

export default function ServiceDetails({
  route: {
    params: { orderId },
  },
}) {
  const [orderDetails, setOrderDetails] = React.useState(null);

  const fetchOrderDetails = React.useCallback(async () => {
    const {
      data: { data },
    } = await api({
      method: "get",
      url: `/Provider/OrderDetails?orderId=${orderId}`,
      showLoader: true,
    });
    setOrderDetails(data[0]);
  }, [orderId]);

  React.useEffect(() => {
    fetchOrderDetails();
  }, [fetchOrderDetails]);

  if (!orderDetails) {
    return <></>;
  }

  const renderItem = ({ item: { productName, subcategory } }) => {
    return (
      <View style={styles.mainflatlistwrapper}>
        <Image source={Mask} />
        <View style={styles.right}>
          <Text style={styles.self}>{productName}</Text>
          <Text style={styles.deleteall}>{subcategory}</Text>
          <Text style={styles.self}>$ 40</Text>
        </View>
      </View>
    );
  };

  return (
    <Background>
      <FlatList
        contentContainerStyle={styles.contentStyle}
        data={orderDetails.product}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        ListHeaderComponent={<Header orderDetails={orderDetails} />}
        ListFooterComponent={
          <Footer orderDetails={orderDetails} callback={fetchOrderDetails} />
        }
      />
    </Background>
  );
}

const styles = StyleSheet.create({
  mainview: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  profile: {
    width: "20%",
  },
  pendingview: {
    borderRadius: 10,
    padding: 8,
    backgroundColor: Colors.purple,
  },
  pendingtext: {
    color: Colors.white,
  },
  service: {
    color: Colors.navy_blue,
    fontSize: FontSizes.large,
    fontFamily: FontFamilies.sfSemiBold,
  },
  mainflatlistwrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: Colors.off_White,
  },
  text1: {
    color: Colors.navy_blue,
  },
  buttonStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 40,
  },
  longtext: {
    color: "grey",
    fontFamily: FontFamilies.sfSemiBold,
  },
  profiletext: {
    fontSize: FontSizes.default,
    fontFamily: FontFamilies.sfBold,
  },
  profilename: {
    width: "55%",
  },
  ratingView: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  ratingtext: {
    marginLeft: 5,
    color: "grey",
    fontFamily: FontFamilies.sfSemiBold,
  },
  dateview: {
    flexDirection: "row",
    alignItems: "center",
  },
  datetext: {
    marginHorizontal: 5,
    color: "grey",
    fontFamily: FontFamilies.sfSemiBold,
  },
  timeText: {
    marginLeft: 5,
    color: "grey",
    fontFamily: FontFamilies.sfSemiBold,
  },
  flatlistdirection: {
    flexDirection: "row",
    alignItems: "center",
  },
  addsubWrap: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addtextwrap: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  self: {
    color: Colors.blue,
    fontFamily: FontFamilies.sfSemiBold,
  },
  deleteall: {
    paddingVertical: 5,
    color: "grey",
    fontFamily: FontFamilies.sfSemiBold,
  },
  contentStyle: {
    paddingTop: 50,
  },
  right: {
    paddingLeft: 12,
  },
  servicesText: {
    color: Colors.blue,
    fontFamily: FontFamilies.poppinsMedium,
    fontSize: FontSizes.large,
  },
  actionIconsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
  },
  actionButtonIconText: {
    color: Colors.white,
    marginTop: 8,
  },
  actionButtonContainer: {
    height: 70,
    width: 90,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  swipeContainer: {
    padding: 4,
    borderColor: Colors.primary,
    borderWidth: 1,
    marginTop: 20,
    borderRadius: 12,
  },
  swiperText: {
    color: Colors.primary,
    fontFamily: FontFamilies.poppinsMedium,
    fontSize: FontSizes.medium,
  },
  pin: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    height: 80,
    marginLeft: SCREEN_WIDTH * 0.33,
    top: 8,
  },
  mapContainer: {
    height: 100,
    width: SCREEN_WIDTH,
  },
});
