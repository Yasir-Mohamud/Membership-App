import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import AdminLogin from "./components/AdminLogin";
import RequireAuth from "./components/RequireAuth";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route element={<RequireAuth />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}
