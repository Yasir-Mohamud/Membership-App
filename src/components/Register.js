import React from "react";
import "./Register.css";
import { UsersContext } from "../App";
import { useContext } from "react";

export default function Register() {
  const user = useContext(UsersContext);
  return (
    <div className="register--form">
      <form>
        <br />
        <label> NAME</label>
        <br />
        <input /> <br />
        <label> EMAIL</label>
        <br />
        <input /> <br />
        <label>PHONE NUMBER</label>
        <br />
        <input /> <br />
        <label> PASSWORD </label>
        <br />
        <input /> <br />
        <label> CONFIRM PASSWORD</label>
        <br />
        <input /> <br />
        <button> REGISTER</button>
      </form>
    </div>
  );
}
