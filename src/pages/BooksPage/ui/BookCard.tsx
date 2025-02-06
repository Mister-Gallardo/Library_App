import { useState } from "react";
import { Card, CardContent, Typography, Box, useTheme } from "@mui/material";
import BookCardModal from "./BookCardModal";
import { IBook } from "../type";

const BookCard: React.FC<{ book: IBook, refetch: () => void }> = ({ book, refetch }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const theme = useTheme();

  return (
    <>
      <Card
        sx={{
          width: "100%",
          minWidth: 270,
          margin: "16px auto",
          cursor: "pointer",
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, rgb(40, 46, 68), rgb(61, 78, 103))"
              : "linear-gradient(135deg, rgba(220, 235, 255, 1), rgba(200, 220, 255, 1))",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
          borderRadius: "16px",
          padding: "10px 16px",
          transition: "transform 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: "0 12px 20px rgba(0, 0, 0, 0.2)",
          },
        }}
        onClick={handleOpen}
      >
        <CardContent>
          <Typography variant="h5" fontWeight="bold">
            📕 Название: {book.title}
          </Typography>
          <Box
            sx={{
              width: { lg: "70%", md: "100%" },
              marginTop: "20px",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: { xs: "none", sm: "space-between" },
              gap: { xs: 1, sm: "none" },
            }}
          >
            <Typography variant="body1">
              <strong>Автор:</strong> {book.author}
            </Typography>
            <Typography variant="body1">
              <strong>Жанр:</strong> {book.genre}
            </Typography>
            <Typography variant="body1">
              <strong>Год:</strong> {book.year}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <BookCardModal open={open} handleClose={handleClose} book={book} refetch={refetch} />
    </>
  );
};

export default BookCard;
