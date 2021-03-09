import { atom } from "recoil";

export const signUpInfo = atom({
  key: "signUpInfo",
  default: null,
});

export const userInfo = atom({
  key: "userInfo",
  default: null,
});

export const rCategoryData = atom({
  key: "categoryData",
  default: [{ label: "", value: "" }],
});
