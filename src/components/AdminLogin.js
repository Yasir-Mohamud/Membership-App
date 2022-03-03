import React, { useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [sucess, setSuccess] = useState(false);
  const { setUser } = useAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/admin/login", {
        email,
        password,
      });

      console.log(response);
      setUser({ email, password });
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (err) {
      err ? setErr("Login Failed") : setErr("");
    }
  };

  return (
    <div className="admin-login">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email"> Email </label>
        <br />
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail((prev) => e.target.value)}
        />
        <br />
        <label htmlFor="password"> Password </label>
        <br />
        <input
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword((prev) => e.target.value)}
        />
        <br />
        <button type="submit"> LOGIN </button>
      </form>
    </div>
  );
}
