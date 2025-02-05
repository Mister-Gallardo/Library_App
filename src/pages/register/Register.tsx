import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import AuthProfileWrapper from "../../shared/ui/PageWrapper";
import InputPassword from "../../shared/ui/InputPassword";
import SnackbarError from "../../shared/ui/SnackbarError";
import { InputProps } from "../../shared/types/types";
import apiStore from "../../shared/api/fetchUser";

const Register: React.FC = React.memo(() => {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const navigate = useNavigate();

  const theme = useTheme();
  const color = theme.palette.mode === "dark" ? "#f0f0f0" : "#333333";

  const { handleSubmit, control } = useForm<InputProps>();

  const submitOnValid: SubmitHandler<InputProps> = async (data) => {
    try {
      const jwtToken = (await apiStore.Register(data)).token;
      localStorage.setItem("token", jwtToken);
      axios.defaults.headers["Authorization"] = `${jwtToken}`;
      navigate('/profile');
    } catch (error) {
      setOpenSnackbar(true);
      console.log(error);
    }
  };

  const submitOnInValid: SubmitErrorHandler<InputProps> = (data) => {
    setOpenSnackbar(true);
    console.log(data);
  }

  return (
    <AuthProfileWrapper>
      <Typography sx={{ fontWeight: "700", marginBottom: 4 }} variant="h4">
        Регистрация
      </Typography>
      <form
        onSubmit={handleSubmit(submitOnValid, submitOnInValid)}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 50,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box sx={{ width: { xs: "90%", sm: "75%" } }}>
            <Typography
              variant="h6"
              sx={{ alignSelf: "start", marginBottom: 0.5 }}
            >
              Email
            </Typography>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: "Укажите почту",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Неверный формат почты",
                },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  sx={{ width: "100%" }}
                  label="Введите ваш Email"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Box>
          <Box sx={{ width: { xs: "90%", sm: "75%" } }}>
            <Typography
              variant="h6"
              sx={{ alignSelf: "start", marginBottom: 0.5 }}
            >
              Password
            </Typography>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: "Укажите пароль",
                pattern: {
                  value: /^[a-zA-Z0-9]{6,}$/,
                  message: "Неверный формат пароля",
                },
              }}
              render={({ field, fieldState }) => (
                <InputPassword
                  {...field}
                  label="Придумайте пароль"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message as string}
                />
              )}
            />
          </Box>
          <Box
            sx={{ width: { xs: "90%", sm: "75%" }, display: "flex", gap: 1 }}
          >
            <Typography>Уже есть аккаунт?</Typography>
            <Link to="/auth" style={{ color: color }}>
              Войти
            </Link>
          </Box>
        </Box>
        <Button
          type="submit"
          variant="outlined"
          size="large"
          sx={{
            fontSize: 18,
            borderColor: color,
            color: color,
            width: { xs: "90%", sm: "75%" },
          }}
        >
          Создать аккаунт
        </Button>
      </form>
      <SnackbarError
        open={openSnackbar}
        handleClose={() => setOpenSnackbar(false)}
      />
    </AuthProfileWrapper>
  );
});

export default Register;
