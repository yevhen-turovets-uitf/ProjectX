import axios from "axios";
import { Loading } from "quasar";
import { Notify } from "quasar";

const API_URL = process.env.VUE_APP_BACKEND_URL;

axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const allError = error?.response?.data?.error;

    return Promise.reject(allError);
  }
);
const requestService = {
  get(url, params = {}, headers = {}) {
    Loading.show();
    return axios
      .get(API_URL + url, {
        params,
        headers,
      })
      .then((response) => {
        Loading.hide();
        return response;
      })
      .catch((error) => {
        Loading.hide();
        Notify.create(error);
        throw error;
      });
  },
  post(url, body = {}, config = {}) {
    Loading.show();
    return axios
      .post(API_URL + url, body, config)
      .then((response) => {
        Loading.hide();
        return response;
      })
      .catch((error) => {
        Loading.hide();
        Notify.create(error);
        throw error;
      });
  },
  put(url, body = {}, config = {}) {
    Loading.show();
    return axios
      .put(API_URL + url, body, config)
      .then((response) => {
        Loading.hide();
        return response;
      })
      .catch((error) => {
        Loading.hide();
        Notify.create(error);
        throw error;
      });
  },
  patch(url, body = {}, config = {}) {
    Loading.show();
    return axios
      .patch(API_URL + url, body, config)
      .then((response) => {
        Loading.hide();
        return response;
      })
      .catch((error) => {
        Loading.hide();
        Notify.create(error);
        throw error;
      });
  },
  delete(url, config = {}) {
    Loading.show();
    return axios
      .delete(API_URL + url, config)
      .then((response) => {
        Loading.hide();
        return response;
      })
      .catch((error) => {
        Loading.hide();
        Notify.create(error);
        throw error;
      });
  },
};

export default requestService;
