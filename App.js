import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Navigation from "./src/navigation";
import { RecoilRoot, useRecoilState } from "recoil";
import { RootSiblingParent } from "react-native-root-siblings";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import ErrorBoundary from "react-native-error-boundary";
import { userInfo } from "./src/store/atoms/auth";
import { api } from "./src/services";
import { Colors } from "./src/config/Theme";
import { Toast } from "./src/common";
import { SCREEN_HEIGHT } from "./src/config/Layout";

const Interceptor = () => {
  const [user, setUser] = useRecoilState(userInfo);
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
      // if (error?.response?.data?.statusCode === 401) {
      //   setUser(null);
      // }
      if (error?.response?.data?.message) {
        Toast.show({
          text: error.response.data.message,
          type: "error",
        });
      }
      return Promise.reject(error);
    }
  );

  return (
    <View>
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator
            animating={true}
            color={Colors.black}
            size="large"
          />
        </View>
      )}
    </View>
  );
};

const errorHandler = (error: Error, stackTrace: string) => {
  /* Log the error to an error reporting service */
  alert(error.message + stackTrace);
};

export default function App() {
  return (
    <View style={styles.container}>
      <ErrorBoundary onError={errorHandler}>
        <BottomSheetModalProvider>
          <RootSiblingParent>
            <RecoilRoot>
              <>
                <Interceptor />
                <Navigation />
              </>
            </RecoilRoot>
          </RootSiblingParent>
        </BottomSheetModalProvider>
      </ErrorBoundary>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  statusBar: {
    flex: 0,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 100,
    justifyContent: "center",
    marginTop: SCREEN_HEIGHT * 0.44,
  },
});
