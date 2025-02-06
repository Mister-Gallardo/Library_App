import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { IBook } from "../type";

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40vw",
  minWidth: 300,
  bgcolor: "background.paper",
  boxShadow: 30,
  p: 4,
  borderRadius: 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const BookPageModal: React.FC<{
  open: boolean;
  setOpen: (newVal: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutation: any;
}> = ({ open, setOpen, mutation }) => {
  const [titleValue, setTitleValue] = useState<string>("");
  const [authorValue, setAuthorValue] = useState<string>("");
  const [genreValue, setGenreValue] = useState<string>("");
  const [yearValue, setYearValue] = useState<string>("");

  const handleAddBook = () => {
    if (!titleValue || !authorValue || !genreValue || !yearValue) {
      alert("Введите все значения.");
      return;
    }

    const newBook: IBook = {
      id: Date.now(),
      title: titleValue,
      author: authorValue,
      genre: genreValue,
      year: +yearValue,
    };

    // Отправляем запрос на добавление книги
    mutation.mutate(newBook);

    // Очистка формы и закрытие модалки
    setTitleValue("");
    setAuthorValue("");
    setGenreValue("");
    setYearValue("");
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={modalStyle}>
        <Typography variant="h4" textAlign="center">
          Добавить книгу
        </Typography>
        <Box
          sx={{
            width: "70%",
            minWidth: 250,
            marginTop: "30px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            label="Название"
            variant="outlined"
          />
          <TextField
            value={authorValue}
            onChange={(e) => setAuthorValue(e.target.value)}
            label="Автор"
            variant="outlined"
          />
          <TextField
            value={genreValue}
            onChange={(e) => setGenreValue(e.target.value)}
            label="Жанр"
            variant="outlined"
          />
          <TextField
            value={yearValue}
            onChange={(e) => setYearValue(e.target.value)}
            label="Год"
            type="number"
            variant="outlined"
          />
        </Box>
        <Button
          onClick={handleAddBook}
          variant="contained"
          sx={{ mt: 4, width: "60%", fontSize: 18, fontWeight: "bold" }}
        >
          Добавить
        </Button>
      </Box>
    </Modal>
  );
};

export default BookPageModal;
