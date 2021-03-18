import React from "react";
import { View, StyleSheet, SectionList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import { Background, Empty, Text, Touchable } from "../../common";
import { Colors, FontFamilies, FontSizes } from "../../config/Theme";
import { api } from "../../services";
import { SCREEN_WIDTH } from "../../config/Layout";

const Order = ({ item }) => {
  const { navigate } = useNavigation();
  return (
    <Touchable
      style={styles.card}
      onPress={() =>
        navigate("ServiceDetails", {
          orderId: item._id,
        })
      }
    >
      <View style={styles.top}>
        <Text style={styles.name}>{item.user_Name}</Text>
        <Text style={styles.date}>
          {dayjs(new Date(item.booking_Date)).format("MMM DD, YYYY")}
        </Text>
      </View>
      <Text style={styles.bookId}>Booking Id - {item.booking_id}</Text>
      <View style={styles.top}>
        <View style={styles.serviceDetail}>
          <Text style={styles.serviceName}>{item.category}</Text>
          <Text style={styles.address}>{item.address}</Text>
        </View>
        <Text style={styles.status}>{item.status}</Text>
      </View>
    </Touchable>
  );
};

const OrderList = ({ navigation }) => {
  const [orders, setOrders] = React.useState([]);

  const Data = Object.keys(orders).reduce((acc, cv) => {
    if (cv === "Ongoing_Service") {
      if (orders[cv].length) {
        acc.push({
          title: "Ongoing Services",
          data: orders[cv],
        });
      }
    }
    if (cv === "Last_Services") {
      if (orders[cv].length) {
        acc.push({
          title: "Last Services",
          data: orders[cv],
        });
      }
    }
    return acc;
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getOrders();
    });
    return unsubscribe;
  }, [navigation]);

  async function getOrders() {
    const {
      data: { data },
    } = await api({
      url: "/Provider/OrderList",
      showLoader: true,
    });
    setOrders(data);
  }

  return (
    <Background
      contentStyle={{
        paddingHorizontal: 0,
      }}
    >
      <SectionList
        onRefresh={getOrders}
        refreshing={false}
        contentContainerStyle={styles.scrollContainer}
        sections={Data}
        keyExtractor={(item, index) => item._id + index}
        renderItem={({ item }) => <Order item={item} />}
        ListEmptyComponent={
          <Empty title="No services awaiting to be completed" />
        }
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.headerSection}>{title}</Text>
        )}
      />
    </Background>
  );
};

export default OrderList;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 70,
    paddingHorizontal: SCREEN_WIDTH * 0.04,
  },
  navstyle: {
    height: 100,
    width: 100,
    right: 14,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    shadowOffset: {
      width: -4,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowColor: "black",
    borderWidth: 1,
    borderColor: Colors.graySecondary,
    padding: 12,
    marginBottom: 12,
  },
  name: {
    fontSize: 15,
    color: "#000",
    fontFamily: FontFamilies.sfRegular,
  },
  date: {
    fontSize: FontSizes.small,
    color: Colors.black,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bookId: {
    color: Colors.gray,
    fontSize: FontSizes.medium,
    marginTop: 8,
  },
  serviceDetail: {
    marginTop: 20,
    width: SCREEN_WIDTH * 0.6,
  },
  serviceName: {
    color: Colors.blue,
    fontFamily: FontFamilies.sfRegular,
  },
  address: {
    fontFamily: FontFamilies.sfMedium,
    marginTop: 6,
    fontSize: FontSizes.medium,
  },
  status: {
    color: "#ff0045",
    marginTop: 20,
  },
  headerSection: {
    fontSize: FontSizes.xLarge,
    fontFamily: FontFamilies.medium,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
});
