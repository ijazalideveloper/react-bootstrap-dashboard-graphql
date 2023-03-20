import axios from "axios";
import CONSTANTS from "../constants";
const requestInterceptor = async (request) => {


  let userInfo = await window.localStorage.getItem("aimfit-user");
  if (userInfo) {
    userInfo = JSON.parse(userInfo);
    request.headers.Authorization = userInfo?.token;
  }


  if( CONSTANTS.GLOBAL.PAYMENTS_BACKEND ){
    let paymentServiceRoute  = CONSTANTS.GLOBAL.PAYMENT_ROUTES.filter(url => request.url.includes(url));
    if( CONSTANTS.GLOBAL.PAYMENTS_URL && paymentServiceRoute && paymentServiceRoute.length > 0)
      request.url = CONSTANTS.GLOBAL.PAYMENTS_URL + request.url; 
    else     
      request.url = CONSTANTS.GLOBAL.BASE_URL + request.url;
  }else{
    request.url = CONSTANTS.GLOBAL.BASE_URL + request.url;
  }

  return request;
};

const successInterceptor = (response) => {
  // console.log(`Success: ${response}`);
};

const errorInterceptor = (error) => {
  console.log(`Error: ${error}`);
};

let axiosInstance = axios.create();

class HTTPClient {
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
          window.localStorage.clear();
          
          
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

export default new HTTPClient();
