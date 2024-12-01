import axios from "axios";
import axiosRetry from "axios-retry";

axios.defaults.baseURL =
  process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:3001/";
// axios.defaults.timeout = 15000;
axios.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};
const API = axios.create();
API.interceptors.response.use((response) => response.data);
axiosRetry(API, { retries: 3, retryDelay: axiosRetry.exponentialDelay });
export default API;
