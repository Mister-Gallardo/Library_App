import axios from "axios";
import { InputProps } from "../types/types";

const api = axios.create({
  baseURL: "https://backend-ashen-seven-22.vercel.app",
});

const apiStore = {
  async Auth(user: InputProps) {
    const { data } = await api.post("/login", user);

    return data;
  },

  async Register(user: InputProps) {
    const { data } = await api.post("/register", user);

    return data;
  },

  async Profile() {
    const { data } = await api.get("/profile");

    return data;
  },
};

export default apiStore;

