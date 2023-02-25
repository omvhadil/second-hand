import axios from "axios";
import { useAuthStore } from "../stores";

const instance = axios.create({
  baseURL: "https://market-final-project.herokuapp.com",
});
instance.interceptors.request.use(
  // kondisi ok
  (config) => {
    config.headers.access_token = useAuthStore().getToken;
    return config;
  },
  // kondisi error
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  // rersponse ok
  (response) => {
    return response;
  },
  (error) => {
    switch (error.response.status) {
      case 403:
        useAuthStore().logOut();
        break;
      default:
        alert(error.response.data.message || "Something went wrong");
        break;
    }
    return Promise.reject(error);
  }
);

export { instance };
