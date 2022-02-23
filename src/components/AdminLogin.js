import React, { useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [sucess, setSuccess] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/admin/login", {
        email,
        password,
      });

      console.log(response);
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (err) {
      err ? setErr("Login Failed") : setErr("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label> Email </label>
        <br />
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail((prev) => e.target.value)}
        />
        <br />
        <label> Password </label>
        <br />
        <input
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword((prev) => e.target.value)}
        />
        <br />
        <button> LOGIN </button>
      </form>
    </div>
  );
}
