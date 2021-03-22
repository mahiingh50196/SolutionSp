import React, { useEffect, useCallback } from "react";
import { ActivityIndicator, AsyncStorage } from "react-native";
import { useSetRecoilState } from "recoil";

import { userInfo } from "./atoms/auth";

const Persister = ({ children }) => {
  const [loaded, setLoaded] = React.useState(false);
  const setUserInfo = useSetRecoilState(userInfo);

  const hydrateRecoil = useCallback(async () => {
    const value = await AsyncStorage.getItem(userInfo.key);
    if (value) {
      setUserInfo(JSON.parse(value));
    }
    setLoaded(true);
  }, [setUserInfo]);

  useEffect(() => {
    hydrateRecoil();
  }, [hydrateRecoil]);

  return <>{loaded ? children : <ActivityIndicator />}</>;
};

export default Persister;
