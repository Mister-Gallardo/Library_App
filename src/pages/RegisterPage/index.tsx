import React, { useState } from "react";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import AuthWrapper from "../../shared/ui/AuthWrapper";
import InputPassword from "../../shared/ui/InputPassword";
import SnackbarError from "../../shared/ui/SnackbarError";
import { IUser } from "../../shared/types/types";
import { registerUser } from "../../features/auth/api/authApi";

const Register: React.FC = React.memo(() => {
  const { handleSubmit, control } = useForm<IUser>();
  const navigate = useNavigate();

  const [errorValue, setErrorValue] = useState("");

  const theme = useTheme();
  const color = theme.palette.mode === "dark" ? "#f0f0f0" : "#333333";

  const submitOnValid: SubmitHandler<IUser> = async (data) => {
    try {
      await registerUser(data);
      navigate("/profile");
    } catch (error) {
      const errorMessage = (error as { message: string }).message;
      setErrorValue(errorMessage);
      console.error(errorMessage);
    }
  };

  const submitOnInValid: SubmitErrorHandler<IUser> = (data) => {
    console.log(data);
  };

  return (
    <AuthWrapper>
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
              sx={{
                alignSelf: "start",
                marginBottom: 0.5,
                color: errorValue ? "red" : "white",
              }}
            >
              Login
            </Typography>
            <Controller
              name="login"
              control={control}
              defaultValue=""
              rules={{
                required: "Укажите логин",
                minLength: {
                  value: 4,
                  message: "Логин должен быть не менее 4 символов",
                },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  sx={{ width: "100%" }}
                  label="Введите ваш логин"
                  error={!!fieldState.error || !!errorValue}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Box>
          <Box sx={{ width: { xs: "90%", sm: "75%" } }}>
            <Typography
              variant="h6"
              sx={{
                alignSelf: "start",
                marginBottom: 0.5,
                color: errorValue ? "red" : "white",
              }}
            >
              Password
            </Typography>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: "Укажите пароль",
                minLength: {
                  value: 6,
                  message: "Пароль должен быть не менее 6 символов",
                },
              }}
              render={({ field, fieldState }) => (
                <InputPassword
                  {...field}
                  label="Придумайте пароль"
                  error={!!fieldState.error || !!errorValue}
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
        open={!!errorValue}
        message={errorValue}
        handleClose={() => setErrorValue("")}
      />
    </AuthWrapper>
  );
});

export default Register;
