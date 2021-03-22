import { AsyncStorage } from "react-native";
import { atom } from "recoil";

export const signUpInfo = atom({
  key: "signUpInfo",
  default: null,
});

export const userInfo = atom({
  key: "userInfo",
  default: null,
  effects_UNSTABLE: [
    ({ onSet, node }) => {
      onSet((newValue) => {
        AsyncStorage.setItem(node.key, JSON.stringify(newValue));
      });
    },
  ],
});

export const rCategoryData = atom({
  key: "categoryData",
  default: [{ label: "", value: "" }],
});
