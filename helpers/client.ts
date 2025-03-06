import axios from "axios";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=UTF-8",
  },
  timeout: 1000 * 60,
});

export default client;
