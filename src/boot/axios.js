import { boot } from "quasar/wrappers";
import axios from "axios";

const api = axios.create({ baseURL: process.env.BASE_URL_API + "/sapi/" });
const axiosInstanceBaseURL = process.env.BASE_URL_API + "/sapi/";
const axiosInstance = axios.create({
  baseURL: axiosInstanceBaseURL,
});

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { api, axiosInstance };
