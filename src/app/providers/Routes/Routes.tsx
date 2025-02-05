import React from "react";
import { Navigate, Route, Routes as RoutesWrap } from "react-router-dom";
import Layout from "../../Layout/Layout";
import Register from "../../../pages/register/Register";
import Auth from "../../../pages/auth/Auth";
import Profile from "../../../pages/profile/Profile";

const Routes: React.FC = () => (
  <RoutesWrap>
    <Route element={<Layout />}>
      <Route path="/register" element={<Register />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/" element={<Navigate to="/register" />} />
    </Route>
  </RoutesWrap>
);

export default Routes;
