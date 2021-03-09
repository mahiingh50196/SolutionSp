import React, { useEffect } from "react";
import { StyleSheet, View, Image, ScrollView } from "react-native";
import { Avatar } from "../../assets/images";
import {
  Background,
  Text,
  Button,
  Touchable,
  TextInput,
  PhoneInput,
  FullScreenLoader,
  Dropdown,
} from "../../common";
import { ImagePick, SocialLogin } from "../../components";
import { Colors, FontFamilies, FontSizes } from "../../config/Theme";
import { SCREEN_WIDTH } from "../../config/Layout";
import { api } from "../../services";
import { useRecoilState, useSetRecoilState } from "recoil";
import { rCategoryData, signUpInfo } from "../../store/atoms/auth";
import { validateEmail } from "../../common/Validation";

export default function Signup({ navigation: { navigate } }) {
  const [name, setName] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [errorInfo, setErrorInfo] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [phone, setPhone] = React.useState(null);
  const [code, setCode] = React.useState(91);
  const [CategoryData, setCategoryData] = useRecoilState(rCategoryData);
  const [categoryId, setCategoryId] = React.useState("");
  const [uploadLoading, setUploadLoading] = React.useState(false);
  const [responseImage, setResponseImage] = React.useState(null);
  const setAuthInfo = useSetRecoilState(signUpInfo);
  const [termsInfo, setTermsInfo] = React.useState(null);

  const getTerms = React.useCallback(async () => {
    const {
      data: { data },
    } = await api.get("/Provider/PolicyTermsCondtions");
    setTermsInfo(data);
  }, [setTermsInfo]);

  React.useEffect(() => {
    getTerms();
  }, [getTerms]);

  const getErrorInfo = () => {
    if (!name) {
      return {
        message: "Name is required",
        type: "name",
      };
    }
    if (!email) {
      return {
        message: "Email is required",
        type: "email",
      };
    }
    if (!validateEmail(email)) {
      return {
        message: "Email is not valid",
        type: "email",
      };
    }
    if (!password) {
      return {
        message: "Password is required",
        type: "password",
      };
    }
    setErrorInfo(null);
  };

  useEffect(() => {
    api({
      method: "GET",
      url: "/Provider/ListCategories",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (res.data && res.data.data.length) {
          const categories = res.data.data.map((item) => {
            return {
              label: item.name,
              value: item._id,
            };
          });
          setCategoryData(categories);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setCategoryData]);

  function initSignUp() {
    const error = getErrorInfo();
    if (error) {
      setErrorInfo(error);
      return;
    } else {
      setLoading(true);
      const userData = {
        fullName: name,
        email: email,
        password,
        phoneNumber: phone,
        countrycode: `+${code}`,
        categoryId,
      };
      if (responseImage) {
        userData.profilePicture = responseImage;
      }
      api({
        method: "post",
        url: "/Provider/SingUp",
        data: userData,
      })
        .then((res) => {
          const {
            data: { data },
          } = res;
          if (data) {
            const registrationData = Array.isArray(res.data?.data)
              ? res.data?.data[0]
              : res.data?.data;
            setAuthInfo(registrationData);
            navigate("OtpVerify", {
              phone,
              code,
            });
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  const uploadImage = (image) => {
    const formData = new FormData();
    formData.append("image", {
      uri: image.path,
      type: image.mime,
      name: "image.jpg",
    });
    setUploadLoading(true);
    api({
      baseURL: "http://52.39.158.82:8001",
      url: "/api/uploadImage",
      method: "post",
      data: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        if (res.data?.data) {
          setResponseImage(res.data?.data.original);
        }
      })
      .finally(() => {
        setUploadLoading(false);
      });
  };

  const selectedCategory = React.useMemo(() => {
    return (CategoryData || []).find((each) => each.value === categoryId);
  }, [categoryId, CategoryData]);

  const onPickSuccess = (image) => {
    uploadImage(image);
  };

  const renderOpenModalButton = (handlePresentModalPress) => (
    <Touchable onPress={handlePresentModalPress}>
      <Image
        resizeMode="cover"
        source={responseImage ? { uri: responseImage } : Avatar}
        style={styles.avatar}
      />
    </Touchable>
  );

  return (
    <Background contentStyle={styles.contentStyle}>
      {uploadLoading && <FullScreenLoader />}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Create your account</Text>
        <View style={styles.desc}>
          <Text style={styles.alreadyAccountLabel}>
            Already have an account?
          </Text>
          <Touchable onPress={() => navigate("Login")}>
            <Text style={styles.loginLabel}>Login?</Text>
          </Touchable>
        </View>
        <ImagePick
          renderOpenModalButton={renderOpenModalButton}
          onPickSuccess={onPickSuccess}
        />
        <View>
          <TextInput
            onChangeText={(val) => setName(val)}
            label="Full Name"
            placeholder="Enter your name"
            errorMessage={errorInfo?.type === "name" && errorInfo?.message}
          />
          <View style={styles.space} />
          <TextInput
            onChangeText={(val) => {
              setEmail(val);
            }}
            label="Email"
            keyboardType="email-address"
            placeholder="Enter your email"
            errorMessage={errorInfo?.type === "email" && errorInfo?.message}
          />
          <View style={styles.space} />
          <TextInput
            onChangeText={(val) => {
              setPassword(val);
            }}
            label="Password"
            withEye
            errorMessage={errorInfo?.type === "password" && errorInfo?.message}
            placeholder="Enter your password"
          />
          <View style={styles.space} />
          <Text style={styles.label}>Phone Number</Text>
          <PhoneInput
            onChangeText={(val) => {
              setPhone(val);
            }}
            onChangeCode={(code) => {
              setCode(code);
            }}
          />
          <View style={styles.space} />
          <Text style={styles.label}>Categories</Text>
          <Touchable
            style={[
              styles.dropdowncontainer,
              {
                borderColor:
                  selectedCategory && selectedCategory.value
                    ? Colors.primary
                    : "#e4e9f2",
              },
            ]}
          >
            <Dropdown
              itemKey="drop"
              itemData={CategoryData}
              onValueChange={(value) => setCategoryId(value)}
              placeholder={{
                label: "Select Category",
              }}
            >
              {selectedCategory && selectedCategory.value ? (
                <Text style={{ padding: 12 }}>{selectedCategory.label}</Text>
              ) : null}
            </Dropdown>
          </Touchable>
        </View>
        <Button
          isLoading={loading}
          style={styles.signUp}
          title="Sign up"
          onPress={initSignUp}
        />
        <SocialLogin desc="Or sign up with social account" />
        <View style={styles.wrapTerms}>
          <Text style={styles.terms}>
            By Clicking "SignUp" you agree to our{" "}
          </Text>
          <Touchable
            onPress={() =>
              navigate("TermsInfo", {
                info: termsInfo?.termsCondition,
                title: "Terms and Conditions",
              })
            }
          >
            <Text style={styles.termsTextButton}>Terms and conditions</Text>
          </Touchable>
          <Text style={styles.terms}>as well as our</Text>
          <Touchable
            onPress={() =>
              navigate("TermsInfo", {
                info: termsInfo?.policy,
                title: "Privacy Policy",
              })
            }
          >
            <Text style={styles.termsTextButton}>privacy policy</Text>
          </Touchable>
        </View>
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  contentStyle: {
    paddingHorizontal: 0,
  },
  title: {
    fontSize: FontSizes.xxLarge,
    fontFamily: FontFamilies.sfBold,
    marginTop: 20,
    color: Colors.black,
  },
  loginLabel: {
    color: Colors.primary,
    fontSize: FontSizes.small,
    marginLeft: 12,
    fontFamily: FontFamilies.sfSemiBold,
    top: 1,
  },
  alreadyAccountLabel: {
    color: "#8f9bb3",
    fontSize: FontSizes.small,
    fontFamily: FontFamilies.sfSemiBold,
  },
  desc: {
    marginTop: 8,
    flexDirection: "row",
  },
  avatar: {
    alignSelf: "center",
    marginTop: 20,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  space: {
    height: 20,
  },
  signUp: {
    height: 60,
    justifyContent: "center",
    borderRadius: 15,
    marginTop: 30,
  },
  wrapButton: {
    marginBottom: 100,
  },
  scrollContainer: {
    paddingHorizontal: SCREEN_WIDTH * 0.04,
    paddingVertical: 50,
  },
  termsTextButton: {
    color: Colors.primary,
    fontSize: FontSizes.small,
    marginHorizontal: 8,
    lineHeight: 22,
    textDecorationLine: "underline",
  },
  terms: {
    color: Colors.gray,
    fontSize: FontSizes.small,
    lineHeight: 22,
  },
  wrapTerms: {
    marginVertical: 50,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  dropdowncontainer: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.primary,
    height: 50,
    justifyContent: "center",
    paddingLeft: 20,
  },
  downarrowimg: {
    alignItems: "flex-end",
  },
  label: {
    marginBottom: 8,
    color: Colors.black,
    fontFamily: FontFamilies.sfSemiBold,
  },
});
