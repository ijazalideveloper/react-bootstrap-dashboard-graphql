import axios from "axios";
import CONSTANTS from "../constants";
const requestInterceptor = async (request) => {
  let userInfo = await window.localStorage.getItem("aimfit-user");
  if (userInfo) {
    userInfo = JSON.parse(userInfo);
    request.headers.Authorization = userInfo?.token;
  }

  request.url = 'https://api.mux.com' + request.url;
  return request;
};

const successInterceptor = (response) => {
  // console.log(`Success: ${response}`);
};

const errorInterceptor = (error) => {
  console.log(`Error: ${error}`);
};

let axiosInstance = axios.create();
class HTTPClientMux {
    constructor() {
      axiosInstance.interceptors.request.use(requestInterceptor);
      axiosInstance.interceptors.response.use(
        (response) => {
          successInterceptor(response);
          return response;
        },
        (error) => {
          errorInterceptor(error);
          if (error.response.status === CONSTANTS.GLOBAL.UNAUTHORIZED) {
            console.log("unauthorized ");
          }
          return Promise.reject({ ...error });
        }
      );
    }
  
    get(url) {
      return axiosInstance
        .get(url)
        .then((response) => Promise.resolve(response))
        .catch((error) => Promise.reject(error));
    }
  
    post(url, data) {
      return axiosInstance
        .post(url, data)
        .then((response) => Promise.resolve(response))
        .catch((error) => Promise.reject(error));
    }
  
    put(url, data = {}) {
      return axiosInstance
        .put(url, data)
        .then((response) => Promise.resolve(response))
        .catch((error) => Promise.reject(error));
    }
  
    delete(url) {
      return axiosInstance
        .delete(url)
        .then((response) => Promise.resolve(response))
        .catch((error) => Promise.reject(error));
    }
  }
  
  export default new HTTPClientMux();
  