import { Box, Button, Pagination, TextField, Typography } from "@mui/material";
import React, { useState, useMemo } from "react";
import { useQuery, useMutation } from "react-query";
import BookCard from "./ui/BookCard";
import { IBook } from "./type";
import { getBookList } from "../../features/bookList/api/bookListApi"; 
import NoBooksMessage from "../../shared/ui/NoBooksMessage";
import LogOutButton from "../../shared/ui/LogOutButton";
import BookPageModal from "./ui/BookPageModal";
import { addBook } from "../../features/bookList/api/bookListApi";

const BookPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);

  const { data, isLoading, error, refetch } = useQuery(["books"], getBookList);

  const mutation = useMutation(addBook, {
    onSuccess: () => {
      refetch();
    },
  });

  const filteredBooks = useMemo(() => {
    if (!data) return [];
    return data.filter((book: IBook) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentBooks = filteredBooks.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

  if (isLoading) return <h3>Загрузка...</h3>;
  if (error) return <h3>Ошибка...</h3>;

  return (
    <>
      <Box
        sx={{
          width: "70vw",
          minWidth: 310,
          maxWidth: 900,
          margin: "0 auto",
          marginTop: "30px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{ paddingBottom: "20px", textAlign: "center" }}
        >
          Список книг
        </Typography>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 2, sm: 0 },
            justifyContent: "space-between",
          }}
        >
          <Button
            onClick={() => setOpen(true)}
            sx={{ alignSelf: "start", fontSize: "18px", borderRadius: "10px" }}
            variant="contained"
          >
            Добавить книгу
          </Button>
        </Box>

        <TextField
          type="text"
          placeholder="Поиск по названию"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginTop: 15, width: "100%" }}
          variant="filled"
        />

        {currentBooks.length > 0 ? (
          currentBooks.map((book: IBook) => (
            <BookCard key={book.id} book={book} refetch={refetch} />
          ))
        ) : (
          <NoBooksMessage />
        )}

        <Pagination
          page={currentPage}
          onChange={(_, page) => setCurrentPage(page)}
          count={totalPages}
          variant="outlined"
          size="large"
          shape="rounded"
          siblingCount={0}
        />

        <LogOutButton />
      </Box>

      <BookPageModal
        open={open}
        setOpen={setOpen}
        mutation={mutation } 
      />
    </>
  );
};

export default BookPage;
