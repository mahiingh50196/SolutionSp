import React, { useEffect } from "react";
import { AsyncStorage, Image } from "react-native";
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
} from "../screens/services";
import { userInfo } from "../store/atoms/auth";
import { api } from "../services";
import { CustomeDrawer } from "../components";
import { AuthStates } from "../config/Constants";
import { Touchable, globalStyles } from "../common";
import { drawer as MenuIcon } from "../assets/images";

const auth = createStackNavigator();
const home = createStackNavigator();
const drawer = createDrawerNavigator();

const HeaderMenuIcon = () => {
  const { toggleDrawer } = useNavigation();
  return (
    <Touchable onPress={toggleDrawer}>
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
        headerShown: false,
      }}
    >
      <auth.Screen name="Welcome" component={Welcome} />
      <auth.Screen name="Login" component={Login} />
      <auth.Screen name="ForgetPassword" component={ForgetPassword} />
      <auth.Screen name="Signup" component={Signup} />
      <auth.Screen name="CountryPicker" component={CountryPicker} />
      <auth.Screen name="OtpVerify" component={OtpVerify} />
      {/* <auth.Screen name="Location" component={Location} /> */}
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
      <home.Screen name="DocsUpload" component={DocsUpload} />
      <home.Screen name="IdUpload" component={IdUpload} />
      <home.Screen name="ServiceDetails" component={ServiceDetails} />
    </home.Navigator>
  );
}

function DrawerNav() {
  return (
    <drawer.Navigator
      drawerContent={(props) => <CustomeDrawer {...props} />}
      drawerType="slide"
    >
      <drawer.Screen name="Home" component={HomeStack} />
      <drawer.Screen name="MyServices" component={MyServices} />
      <drawer.Screen name="Notification" component={Notification} />
      <drawer.Screen name="Profile" component={Profile} />
    </drawer.Navigator>
  );
}

const root = createStackNavigator();

function RootStack() {
  const user = useRecoilValue(userInfo);

  api.interceptors.request.use((config) => {
    const newConfig = { ...config };
    if (user) {
      newConfig.headers = {
        ...newConfig.headers,
        Authorization: `Bearer ${user?.accessToken}`,
      };
    }
    return newConfig;
  });

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
    <root.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {renderRoutes(user?.authState)}
    </root.Navigator>
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
