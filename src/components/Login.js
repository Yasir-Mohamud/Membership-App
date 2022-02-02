import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleClick() {
    navigate("/register");
  }
  return (
    <div className="login--form">
      <form onSubmit={handleSubmit}>
        <br />
        <label htmlFor="email"> EMAIL</label>
        <br />
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="password"> PASSWORD</label>
        <br />
        <input
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />{" "}
        <br />
        <button> LOGIN</button>
        <br />
        <span> Dont have an account ?</span>
        <button
          onClick={handleClick}
          style={{ backgroundColor: "black", color: "white" }}
        >
          SIGN UP
        </button>
      </form>
    </div>
  );
}
