import axios from "axios";

export const createAxiosInstance = (info) => {
  const { url, method, headers, data, params } = info;
  const axiosInstance = axios.create({
    baseURL: "http://13.234.108.242:31782/api",
    // baseURL: API.baseUrls[API.currentEnv],
    headers,
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (!error?.response) {
        return Promise.reject("Internal server error");
      }

      console.log("AXIOS Error response", error.response.data);
      // error?.response?.data?.statusCode === 401 && error?.response?.data?.message?.toLowercase() === 'unauthorized'
      if (
        // error.response.config.url !== API.authUrls.refreshAuthToken &&
        error?.response?.data?.statusCode === 401 &&
        error?.response?.data?.message?.toLowerCase() === "unauthorized"
      ) {
        //Session Timeout - Auto logout
        __DEV__ && console.log("Session - expire auto logout");
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance({ url, method, headers, data, params });
};
