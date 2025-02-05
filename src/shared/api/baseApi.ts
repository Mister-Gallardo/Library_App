import axios from "axios";

const baseApi = axios.create({
  baseURL: "https://67a38af231d0d3a6b783ec6c.mockapi.io/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default baseApi;
