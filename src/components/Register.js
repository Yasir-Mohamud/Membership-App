import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { Hidden } from "@mui/material";

export default function Register() {
  const [registerUser, setRegisterUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    isActive: false,
  });
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");

  let visi = "";

  function handleChange(e) {
    const { name, value } = e.target;

    return setRegisterUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (registerUser.password !== registerUser.confirmPassword) {
      return setError("Your Password and ConfirmPassword DO NOT match !");
    }

    // get all the users info
    const newUser = {
      name: registerUser.name,
      email: registerUser.email,
      phoneNumber: registerUser.phoneNumber,
      password: registerUser.password,
      isActive: false,
    };

    console.log(newUser);

    // axios does a post to the backend and adds the newUser to our db
    axios
      .post("http://localhost:4000/users/add", newUser)
      .then((response) => {
        setIsRegistered((prev) => !prev);
        setRegisterUser({
          name: "",
          email: "",
          phoneNumber: "",
          password: "",
          confirmPassword: "",
          isActive: false,
        });
        setError("");
        console.log(response.data);
      })
      .catch((err) =>
        setEmailError("Email in use , please pick another email")
      );
    // set the setRegisterUser to have empty string to make the form as well as allow others to register
    isRegistered ? (visi = "visible") : (visi = "hidden");
  }

  return (
    <>
      {isRegistered ? (
        <div className="modal">
          <p> You have been successfully registered !!</p>
        </div>
      ) : emailError.length > 0 ? (
        <div className="error-modal" style={{ visibility: { visi } }}>
          <p> {emailError}</p>
        </div>
      ) : (
        emailError
      )}
      <div className="register--form">
        {error && <p style={{ color: "red" }}> {error}</p>}

        <form onSubmit={handleSubmit}>
          <br />
          <label className="form--label" htmlFor="name">
            NAME
          </label>
          <br />
          <input
            className="form--input"
            id="name"
            type="text"
            name="name"
            value={registerUser.name}
            onChange={handleChange}
            placeholder=" example : John Doe"
            required
          />
          <br />
          <label className="form--label" htmlFor="email">
            EMAIL
          </label>
          <br />
          <input
            className="form--input"
            id="email"
            type="email"
            name="email"
            value={registerUser.email}
            onChange={handleChange}
            placeholder=" example : JohnDoe@email.com"
            required
          />
          <br />
          <label className="form--label" htmlFor="phoneNumber">
            PHONE NUMBER
          </label>
          <br />
          <input
            className="form--input"
            id="phoneNumber"
            type="tel"
            placeholder=" example : 123-45-678"
            name="phoneNumber"
            value={registerUser.phoneNumber}
            onChange={handleChange}
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            required
          />
          <br />
          <label className="form--label" htmlFor="password">
            PASSWORD
          </label>
          <br />
          <input
            className="form--input"
            id="password"
            type="password"
            name="password"
            value={registerUser.password}
            onChange={handleChange}
            placeholder=" example : @Test123"
            pattern="(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
            required
          />
          <br />
          <label className="form--label" htmlFor="confirmPassword">
            CONFIRM PASSWORD
          </label>
          <br />
          <input
            className="form--input"
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={registerUser.confirmPassword}
            onChange={handleChange}
            required
          />
          <br />
          <button className="form--button">REGISTER</button>
        </form>
      </div>
    </>
  );
}
