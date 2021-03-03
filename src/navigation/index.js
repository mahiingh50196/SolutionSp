import React, { useEffect } from "react";
import {
  AsyncStorage,
  Image,
  ActivityIndicator,
  View,
  StyleSheet,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  useRecoilValue,
  useRecoilTransactionObserver_UNSTABLE,
  useSetRecoilState,
} from "recoil";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
  Login,
  Signup,
  Welcome,
  OtpVerify,
  Location,
  ForgetPassword,
  TermsInfo,
} from "../screens/auth";
import { CountryPicker } from "../components";
import {
  Profile,
  DocsUpload,
  IdUpload,
  Offline,
  Notification,
  MyServices,
  ServiceDetails,
  TrackingDetails,
  ServiceProof,
} from "../screens/services";
import { userInfo } from "../store/atoms/auth";
import { api } from "../services";
import { CustomeDrawer } from "../components";
import { AuthStates } from "../config/Constants";
import { Touchable, globalStyles, Toast } from "../common";
import { menu as MenuIcon } from "../assets/images";
import { Colors, FontFamilies, FontSizes } from "../config/Theme";

const auth = createStackNavigator();
const home = createStackNavigator();
const drawer = createDrawerNavigator();
const services = createStackNavigator();

const HeaderMenuIcon = () => {
  const { toggleDrawer } = useNavigation();
  return (
    <Touchable
      hitSlop={{ top: 4, left: 20, right: 20, bottom: 10 }}
      onPress={toggleDrawer}
    >
      <Image
        source={MenuIcon}
        resizeMode="contain"
        style={[globalStyles.headerMenuIcon]}
      />
    </Touchable>
  );
};

function AuthStack() {
  return (
    <auth.Navigator
      screenOptions={{
        headerShown: true,
        headerTitle: "",
        headerTransparent: true,
      }}
    >
      <auth.Screen name="Welcome" component={Welcome} />
      <auth.Screen name="Login" component={Login} />
      <auth.Screen name="ForgetPassword" component={ForgetPassword} />
      <auth.Screen name="Signup" component={Signup} />
      <auth.Screen name="CountryPicker" component={CountryPicker} />
      <auth.Screen name="OtpVerify" component={OtpVerify} />
      <auth.Screen name="TermsInfo" component={TermsInfo} />
    </auth.Navigator>
  );
}

function HomeStack() {
  return (
    <home.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <home.Screen
        name="Offline"
        component={Offline}
        options={{
          headerTransparent: true,
          headerShown: true,
          headerTitleAlign: "center",
          headerBackTitleStyle: {},
          headerTintColor: "#fff",
          headerLeft: () => <HeaderMenuIcon />,
          // headerRight: () => <HeaderProfileRightIcon />,
        }}
      />
      <home.Screen
        name="DocsUpload"
        component={DocsUpload}
        options={{
          headerTransparent: true,
          title: "Document Management",
          headerTintColor: Colors.blue,
        }}
      />
      <home.Screen
        name="IdUpload"
        component={IdUpload}
        options={{
          headerTransparent: true,
          // title: "Document Management",
          headerTintColor: Colors.blue,
        }}
      />
      <home.Screen
        name="ServiceDetails"
        component={ServiceDetails}
        options={{
          headerTransparent: true,
          headerTintColor: Colors.blue,
          title: "Service Details",
        }}
      />
      <home.Screen
        name="TrackingDetails"
        component={TrackingDetails}
        options={{
          headerTransparent: true,
          headerTintColor: Colors.blue,
          title: "Tracking Details",
        }}
      />
      <home.Screen
        name="ServiceProof"
        component={ServiceProof}
        options={{
          headerTransparent: true,
          headerTintColor: Colors.blue,
          title: "Upload proof of service",
        }}
      />
    </home.Navigator>
  );
}

function ServicesStack() {
  return (
    <services.Navigator>
      <services.Screen
        name="Services"
        component={MyServices}
        options={{
          headerTransparent: true,
          headerTintColor: Colors.blue,
          title: "My Services",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: FontSizes.larger,
            fontFamily: FontFamilies.sfMedium,
          },
          headerLeft: () => <HeaderMenuIcon />,
        }}
      />
      <services.Screen
        name="ServiceDetails"
        component={ServiceDetails}
        options={{
          headerTransparent: true,
          headerTintColor: Colors.blue,
          title: "Service Details",
        }}
      />
      <services.Screen
        name="TrackingDetails"
        component={TrackingDetails}
        options={{
          headerTransparent: true,
          headerTintColor: Colors.blue,
          title: "Tracking Details",
        }}
      />
      <services.Screen
        name="ServiceProof"
        component={ServiceProof}
        options={{
          headerTransparent: true,
          headerTintColor: Colors.blue,
          title: "Upload proof of service",
        }}
      />
    </services.Navigator>
  );
}

function DrawerNav() {
  return (
    <drawer.Navigator
      drawerContent={(props) => <CustomeDrawer {...props} />}
      drawerType="slide"
    >
      <drawer.Screen name="Home" component={HomeStack} />
      <drawer.Screen name="MyServices" component={ServicesStack} />
      <drawer.Screen name="Notifications" component={Notification} />
      <drawer.Screen name="Profile" component={Profile} />
    </drawer.Navigator>
  );
}

const root = createStackNavigator();

function RootStack() {
  const user = useRecoilValue(userInfo);
  const [loading, setLoading] = React.useState();

  api.interceptors.request.use((config) => {
    const newConfig = { ...config };
    if (newConfig.showLoader) {
      setLoading(true);
    }
    if (user) {
      newConfig.headers = {
        ...newConfig.headers,
        Authorization: `Bearer ${user?.accessToken}`,
      };
    }
    return newConfig;
  });

  api.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      setLoading(false);
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      setLoading(false);
      if (error?.response?.data?.message) {
        Toast.show({
          text: error.response.data.message,
          type: "error",
        });
      }
      return Promise.reject(error);
    }
  );

  const renderRoutes = (authState) => {
    const { COMPLETE, NO_LOCATION, NONE } = AuthStates;
    switch (authState) {
      case COMPLETE:
        return <root.Screen name="Drawer" component={DrawerNav} />;
      case NO_LOCATION:
        return <root.Screen name="Location" component={Location} />;
      case NONE:
      default:
        return <root.Screen name="auth" component={AuthStack} />;
    }
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator
            animating={true}
            color={Colors.black}
            size="large"
          />
        </View>
      )}
      <root.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {renderRoutes(user?.authState)}
      </root.Navigator>
    </View>
  );
}

function PersistenceObserver() {
  useRecoilTransactionObserver_UNSTABLE(({ snapshot }) => {
    const loadable = snapshot.getLoadable(userInfo);
    if (loadable.state === "hasValue") {
      AsyncStorage.setItem(
        userInfo.key,
        JSON.stringify({ value: loadable.contents })
      );
    }
  });
}

const Navigation = ({ userPersistedInfo }) => {
  PersistenceObserver();
  const setUserInfo = useSetRecoilState(userInfo);

  useEffect(() => {
    AsyncStorage.getItem(userInfo.key).then((res) => {
      if (res) {
        setUserInfo(JSON.parse(res).value);
      }
    });
  }, [setUserInfo]);

  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 1,
    justifyContent: "center",
  },
});
