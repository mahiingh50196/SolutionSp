import axios from "axios";
import { Toast } from "../common";

const instance = axios.create({
  baseURL: "http://35.175.195.75:8001",
});

instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error?.response?.data?.message) {
      console.log(error.response.data.message);
      Toast.show({
        text: error.response.data.message,
        type: "error",
      });
    }
    return Promise.reject(error);
  }
);

export default instance;
