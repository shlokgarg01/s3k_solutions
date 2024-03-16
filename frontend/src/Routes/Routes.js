import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/layout/Header/Header";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../components/Home";
import NotFound from "../components/layout/NotFound/NotFound";
import Login from "../components/Admin/Auth/Login"
import { loadUser } from "../actions/userActions";
import store from "../store";
import UsersList from "../components/Admin/Users/UsersList";
import UpdateUser from "../components/Admin/Users/UpdateUser";
import NewUser from "../components/Admin/Users/NewUser";
import ResetPassword from '../components/Admin/Users/ResetPassword'

export default function AdminRoutes() {
  useEffect(() => {
    store.dispatch(loadUser());
  });

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route exact path="/" element={<Home />} />
        </Route>

        <Route element={<ProtectedRoute isAdmin />}>
          <Route exact path="/admin/users" element={<UsersList />} />
          <Route exact path="/admin/users/new" element={<NewUser />} />
          <Route exact path="/admin/user/:id/reset_password" element={<ResetPassword />} />
          <Route exact path="/admin/user/:id" element={<UpdateUser />} />
        </Route>

        <Route exact path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
