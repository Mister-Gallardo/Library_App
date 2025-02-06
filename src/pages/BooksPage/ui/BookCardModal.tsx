import { Typography, Modal, Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useMutation } from "react-query";
import { IBook } from "../type";
import baseApi from "../../../shared/api/baseApi";

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

interface BookCardModalProps {
  open: boolean;
  handleClose: () => void;
  book: IBook;
  refetch: () => void;
}

const BookCardModal: React.FC<BookCardModalProps> = ({
  open,
  handleClose,
  book,
  refetch
}) => {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [genre, setGenre] = useState(book.genre);
  const [year, setYear] = useState(book.year);

  const saveMutation = useMutation(
    (updatedBook: IBook) => {
      console.log("Сохранение на сервере:", updatedBook);
      return baseApi.put(`/books/${updatedBook.id}`, updatedBook);
    },
    {
      onSuccess: () => {
        const currentBook: IBook = {
          id: Date.now(),
          title,
          author,
          genre,
          year,
        };
        console.log(`Успешно! ${currentBook}`);
        refetch();
        handleClose();
      },
      onError: (error) => {
        console.error("Ошибка при сохранении:", error);
      },
    }
  );

  const deleteMutation = useMutation(
    (id: number) => {
      console.log("Удаление с сервера книги с id:", id);
      return baseApi.delete(`books/${id}`);
    },
    {
      onSuccess: () => {
        refetch();
        handleClose();
      },
      onError: (error) => {
        console.error("Ошибка при удалении:", error);
      },
    }
  );

  const handleSave = () => {
    const updatedBook = { ...book, title, author, genre, year };
    saveMutation.mutate(updatedBook);
  };

  const handleDelete = () => {
    deleteMutation.mutate(book.id);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography variant="h4" textAlign="center">
          Редактировать книгу
        </Typography>
        <Box
          sx={{
            width: "100%",
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            label="Название"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
          <TextField
            label="Автор"
            variant="outlined"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            fullWidth
          />
          <TextField
            label="Жанр"
            variant="outlined"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            fullWidth
          />
          <TextField
            label="Год"
            variant="outlined"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            fullWidth
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            marginTop: 4,
            width: "100%",
          }}
        >
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{ fontSize: 18, fontWeight: "bold" }}
          >
            Сохранить изменения
          </Button>
          <Button
            onClick={handleDelete}
            variant="outlined"
            color="error"
            sx={{ fontSize: 18, fontWeight: "bold" }}
          >
            Удалить книгу
          </Button>
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{ fontSize: 18, fontWeight: "bold" }}
          >
            Отмена
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default BookCardModal;
