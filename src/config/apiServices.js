/* eslint-disable handle-callback-err */
import { Toast } from "../common";

const baseUrl = "http://35.175.195.75:8001";

var AuthAPI = (apiName, apiMethod, token, data) => {
  var init =
    apiMethod == "GET"
      ? {
          method: "GET",

          headers: {
            Authorization: token,
          },
        }
      : apiMethod == "POST"
      ? {
          method: apiMethod,
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      : {
          method: apiMethod,
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(data),
        };
  return fetch(baseUrl + apiName, init)
    .then((response) =>
      response.json().then((responseData) => {
        if (responseData.message == "success") {
          return responseData;
        } else {
          Toast(responseData.message);
        }
      })
    )
    .catch((error) => {
      //   return { message: "Server encountered a problem please retry." };

      Toast.show({
        text: "Server encountered a problem please retry",
        type: "error",
      });
    });
};
var NoAuthAPI = (apiName, apiMethod, data) => {
  // if (navigator.onLine) {
  var init =
    apiMethod == "GET"
      ? {
          method: "GET",
        }
      : apiMethod == "POST"
      ? {
          method: apiMethod,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      : {
          method: apiMethod,

          body: JSON.stringify(data),
        };
  return fetch(baseUrl + apiName, init)
    .then((response) =>
      response.json().then((responseData) => {
        if (responseData.statusCode == 200) {
          return responseData;
        } else {
          Toast.show({
            text: responseData.message,
            type: "error",
          });
          return false;
        }
      })
    )
    .catch((err) => {
      return { message: " Server encountered a problem please retry ! " };
    });
};

export { AuthAPI, NoAuthAPI };
