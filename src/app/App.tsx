import React, { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { ThemeProvider } from "./providers/ThemeContext";
import Routes from "./providers/Routes/Routes";

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Обработка redirect-параметра из URL
  useEffect(() => {
    const redirect = searchParams.get("redirect");
    if (redirect) {
      // Переходим на нужный маршрут, заменяя запись в истории, чтобы убрать параметр из URL
      navigate(redirect, { replace: true });
    }
  }, [searchParams, navigate]);

  // Пример существующей логики для проверки токена и перехода на профиль
  useEffect(() => {
    const jwtToken = localStorage.getItem("token");

    if (jwtToken) {
      if (location.pathname !== "/books") navigate("/books");
    }
  }, [location.pathname, navigate]);

  return (
    <ThemeProvider>
      <Routes />
    </ThemeProvider>
  );
};

export default App;
