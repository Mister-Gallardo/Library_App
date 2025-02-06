import React from "react";
import { Navigate, Route, Routes as RoutesWrap } from "react-router-dom";
import Layout from "../../Layout/Layout";
import BookPage from "../../../pages/BooksPage";
import RegisterPage from "../../../pages/RegisterPage";
import LoginPage from "../../../pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";

const Routes: React.FC = () => (
  <RoutesWrap>
    <Route element={<Layout />}>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/books"
        element={<ProtectedRoute element={<BookPage />} />}
      />
      <Route path="/" element={<Navigate to="/register" />} />
    </Route>
  </RoutesWrap>
);

export default Routes;
