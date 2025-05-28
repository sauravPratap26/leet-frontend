import axios from "axios";

const baseURL =
  import.meta.env.ENV === "PROD"
    ? import.meta.env.VITE_BACKEND
    : import.meta.env.VITE_BACKEND_PROD;

    console.log({baseURL})
export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});
