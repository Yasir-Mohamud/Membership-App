import React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/register");
  }
  return (
    <div className="login--form">
      <form>
        <br />
        <label> EMAIL</label>
        <br />
        <input /> <br />
        <label> PASSWORD</label>
        <br />
        <input /> <br />
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
