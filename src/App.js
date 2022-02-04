import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import axios from "axios";

export default function App() {
  const { user, setUser } = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    isActive: false,
    date: new Date(),
  });
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
