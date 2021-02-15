import React from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import dayjs from "dayjs";
import { Background, Touchable, Button } from "../../common";
import { onlineImg, date, clock, Mask } from "../../assets/images";
import { Colors, FontFamilies, FontSizes } from "../../config/Theme";
import { api } from "../../services";

const Header = ({ orderDetails }) => {
  const { user_name: userName, ratings, booking_Date, status } = orderDetails;
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
            <Image source={clock} />
            <Text style={styles.ratingtext}>{ratings || "not available"}</Text>
          </View>
          <View style={styles.dateview}>
            <Image source={date} />
            <Text style={styles.datetext}>
              {dayjs(bookingDate).format("DD MMM, YYYY")}
            </Text>
            <Image source={clock} />
            <Text style={styles.timeText}>
              {dayjs(bookingDate).format("h:mm A")}
            </Text>
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

const Footer = ({ orderDetails }) => {
  const { special_instruction: instructions } = orderDetails;
  return (
    <View>
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
      <View style={styles.buttonStyle}>
        <Button width={180} title="Accept" />
        <Button
          type="transparent"
          width={110}
          title="Ignore"
          style={{ borderWidth: 1, borderColor: Colors.primary }}
        />
      </View>
    </View>
  );
};

export default function ServiceDetails({
  route: {
    params: { orderId },
  },
}) {
  const [orderDetails, setOrderDetails] = React.useState(null);
  React.useEffect(() => {
    (async () => {
      const {
        data: { data },
      } = await api({
        method: "get",
        url: `/Provider/BookingDetails?orderId=${orderId}`,
        showLoader: true,
      });
      setOrderDetails(data[0]);
    })();
  }, [orderId]);

  const renderItem = ({
    item: { category, price, productName, quentity, subcategory },
    item,
  }) => {
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

  if (!orderDetails) {
    return <></>;
  }

  return (
    <Background>
      <FlatList
        contentContainerStyle={styles.contentStyle}
        data={orderDetails.product}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        ListHeaderComponent={<Header orderDetails={orderDetails} />}
        ListFooterComponent={<Footer orderDetails={orderDetails} />}
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
    width: "60%",
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
});
