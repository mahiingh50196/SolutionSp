import React, { useEffect } from "react";
import { AsyncStorage, View, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import {
  useRecoilValue,
  useRecoilTransactionObserver_UNSTABLE,
  useSetRecoilState,
} from "recoil";

import { NavigationContainer } from "@react-navigation/native";
import {
  Login,
  Signup,
  Welcome,
  OtpVerify,
  Location,
  ForgetPassword,
} from "../screens/auth";
import { CountryPicker } from "../components";
import { Home, DocsUpload, IdUpload } from "../screens/services";
import { userInfo } from "../store/atoms/auth";
import { Text, Touchable } from "../common";
import { api } from "../services";

const auth = createStackNavigator();
const home = createStackNavigator();
// const services = createStackNavigator();
const drawer = createDrawerNavigator();

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
      <auth.Screen name="Location" component={Location} />
    </auth.Navigator>
  );
}

function HomeStack() {
  return (
    <home.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <home.Screen name="Home" component={Home} />
      <home.Screen name="DocsUpload" component={DocsUpload} />
      <home.Screen name="IdUpload" component={IdUpload} />
    </home.Navigator>
  );
}

function DrawerNav() {
  const setUser = useSetRecoilState(userInfo);

  function CustomDrawerContent(props) {
    function logout() {
      api({
        method: "PUT",
        url: "/Provider/Logout",
      }).then((res) => {
        setUser(null);
      });
    }
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <View style={styles.logout}>
          <Touchable style={styles.logoutButton} onPress={logout}>
            <Text>Logout</Text>
          </Touchable>
        </View>
      </DrawerContentScrollView>
    );
  }

  return (
    <drawer.Navigator drawerContent={CustomDrawerContent}>
      <drawer.Screen name="Home" component={HomeStack} />
    </drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  logout: {
    marginTop: 100,
  },
  logoutButton: {
    padding: 8,
    alignSelf: "center",
  },
});

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

    console.log(newConfig.headers);
    return newConfig;
  });

  return (
    <root.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {!user ? (
        <root.Screen name="auth" component={AuthStack} />
      ) : (
        <root.Screen name="Drawer" component={DrawerNav} />
      )}
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
