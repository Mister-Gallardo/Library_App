import baseApi from "../../../shared/api/baseApi";
import { IUser } from "../../../shared/types/types";

export const loginUser = async (user: IUser) => {
  try {
    const { data } = await baseApi.get("/users");

    const currentUser = data.find(
      (u: IUser) => u.login === user.login && u.password === user.password
    );

    console.log(currentUser);

    if (!currentUser) {
      throw new Error("Неверные учетные данные");
    }

    localStorage.setItem("token", currentUser.token);

    return currentUser;
  } catch (error) {
    throw new Error((error as { message: string }).message);
  }
};

export const registerUser = async (user: IUser) => {
  try {
    const { data } = await baseApi.post("/users", user);

    if (!data.token) {
      throw new Error("Ошибка сервера: отсутствует токен");
    }

    localStorage.setItem("token", data.token);

    return data;
  } catch (error) {
    throw new Error((error as { message: string }).message);
  }
};
