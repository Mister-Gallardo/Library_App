import React, { useCallback, useState } from "react";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
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
import { IUser } from "../../shared/types/types";
import { loginUser } from "../../features/auth/api/authApi";

const LoginPage: React.FC = React.memo(() => {
  const { handleSubmit, control } = useForm<IUser>();
  const navigate = useNavigate();

  const [errorValue, setErrorValue] = useState("");

  const theme = useTheme();
  const color = theme.palette.mode === "dark" ? "#f0f0f0" : "#333333";

  const submitOnValid: SubmitHandler<IUser> = useCallback(
    async (data) => {
      try {
        await loginUser(data);
        navigate("/profile");
      } catch (error) {
        const errorMessage = (error as { message: string }).message;
        setErrorValue(errorMessage);
        console.error(errorMessage);
      }
    },
    [navigate]
  );

  const submitOnInValid: SubmitErrorHandler<IUser> = useCallback((data) => {
    console.log(data);
  }, []);

  return (
    <AuthProfileWrapper>
      <Typography sx={{ fontWeight: "700", marginBottom: 4 }} variant="h4">
        Авторизация
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
              Login
            </Typography>
            <Controller
              name="login"
              control={control}
              defaultValue=""
              rules={{
                required: "Укажите логин",
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
              }}
              render={({ field, fieldState }) => (
                <InputPassword
                  {...field}
                  label="Введите пароль"
                  error={!!fieldState.error || !!errorValue}
                  helperText={fieldState.error?.message as string}
                />
              )}
            />
          </Box>
          <Box
            sx={{ width: { xs: "90%", sm: "75%" }, display: "flex", gap: 1 }}
          >
            <Typography>Нет аккаунта?</Typography>
            <Link to="/register" style={{ color: color }}>
              Зарегистрироваться
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
          Войти
        </Button>
      </form>
      <SnackbarError
        open={!!errorValue}
        message={errorValue}
        handleClose={() => setErrorValue("")}
      />
    </AuthProfileWrapper>
  );
});

export default LoginPage;
