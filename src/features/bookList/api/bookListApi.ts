import { IBook } from "../../../pages/BooksPage/type";
import baseApi from "../../../shared/api/baseApi";

export const getBookList = async () => {
  const { data } = await baseApi.get("/books");
  return data.reverse();
};

export const addBook = async (newBook: IBook) => {
  try {
    const { data } = await baseApi.post("/books", newBook);

    return data;
  } catch (error) {
    throw new Error((error as { message: string }).message);
  }
};
