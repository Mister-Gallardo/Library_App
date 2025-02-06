import React, { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { ThemeProvider } from "./providers/ThemeContext";
import Routes from "./providers/Routes/Routes";

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const jwtToken = localStorage.getItem("token");
    const redirect = searchParams.get("redirect");

    // если есть redirect или токен — выполняем нужную навигацию
    if (redirect) {
      navigate(redirect, { replace: true });
    } else if (jwtToken && location.pathname !== "/books") {
      navigate("/books", { replace: true });
    }
  }, [location.pathname, navigate, searchParams]);

  return (
    <ThemeProvider>
      <Routes />
    </ThemeProvider>
  );
};

export default App;
