import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const axiosinstance = axios.create({
    baseURL: `${VITE_API_URL}/api/v1`,  // Added closing backtick and fixed placement
    withCredentials: true,
});
