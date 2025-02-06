import React from "react";
import { Navigate, Route, Routes as RoutesWrap } from "react-router-dom";
import Layout from "../../Layout/Layout";
import Register from "../../../pages/RegisterPage";
import Auth from "../../../pages/LoginPage";
import BookPage from "../../../pages/BooksPage";

const Routes: React.FC = () => (
  <RoutesWrap>
    <Route element={<Layout />}>
      <Route path="/register" element={<Register />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/books" element={<BookPage />} />
      <Route path="/" element={<Navigate to="/register" />} />
    </Route>
  </RoutesWrap>
);

export default Routes;
