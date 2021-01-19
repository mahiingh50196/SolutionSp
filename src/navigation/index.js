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
  useRecoilState,
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
import { Home } from "../screens/services";
import { userInfo } from "../store/atoms/auth";
import { Text, Touchable } from "../common";
import { api } from "../services";

const auth = createStackNavigator();
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

// function ServicesStack() {
//   return (
//     <services.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}
//     >
//       <services.Screen name="Home" component={Home} />
//     </services.Navigator>
//   );
// }

function DrawerNav() {
  const [user, setUser] = useRecoilState(userInfo);

  function CustomDrawerContent(props) {
    function logout() {
      api({
        method: "post",
        url: "/User/Logout",
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      })
        .then((res) => {
          setUser(null);
        })
        .catch((er) => {
          console.warn(er);
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
      <drawer.Screen name="Home" component={Home} />
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
