import baseApi from "../../../shared/api/baseApi";
import { IUser } from "../../../shared/types/types";

export const loginUser = async (user: IUser) => {
  try {
    const { data } = await baseApi.get("/users");

    const currentUser = data.find(
      (u: IUser) => u.login === user.login && u.password === user.password
    );

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
    // Ввиду ограничений mock api приходится для проверки уникальности логина
    // сначала получать всех пользователей, проверять уникальность и только потом отправлять данные.
    const { data: users } = await baseApi.get("/users");

    const existingUser = users.find((u: IUser) => u.login === user.login);

    if (existingUser) {
      throw new Error("Пользователь с таким логином уже существует");
    }

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


