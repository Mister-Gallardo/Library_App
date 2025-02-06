import React, { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { ThemeProvider } from "./providers/ThemeContext";
import Routes from "./providers/Routes/Routes";

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // обработка redirect-параметра из URL
  useEffect(() => {
    const redirect = searchParams.get("redirect");
    if (redirect) {
      navigate(redirect, { replace: true });
    }
  }, [searchParams, navigate]);

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
