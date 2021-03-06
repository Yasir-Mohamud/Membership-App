import React, { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    phoneNumber: "",
    password: "",
    isActive: false,
    date: new Date(),
  });

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  }

  //   useEffect(() => {
  //     axios
  //       .post("http://localhost:4000/users/update/" + email, user)
  //       .then((response) => {
  //         console.log(response.data);
  //         document.getElementById("loginButton").setAttribute("disabled", true);
  //       });
  //   }, [user.isActive]);

  function handleSubmit(e) {
    e.preventDefault();

    axios.get("http://localhost:4000/users/" + email).then((res) => {
      if (res.data.email === email && res.data.password === password) {
        setUser((prev) => {
          return {
            ...prev,
            name: res.data.name,
            email: res.data.email,
            phoneNumber: res.data.phoneNumber,
            password: res.data.password,
            isActive: true,
          };
        });
        setError("");
      } else {
        setError("Login failed. Email and Password do not match");
      }
    });

    //   .catch((err) =>
    //     setError("Login failed. Email and Password do not match")
    //   );
  }

  function handleClick() {
    navigate("/register");
  }
  return (
    <>
      <div className="login--form">
        {error && (
          <p style={{ color: "red", fontSize: "14pt", marginTop: "10px" }}>
            {" "}
            {error}
          </p>
        )}
        {user.isActive && (
          <p style={{ color: "green", fontSize: "14pt", marginTop: "10px" }}>
            You have been successfully logged in!
          </p>
        )}
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
          <button id="loginButton"> LOGIN</button>
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
    </>
  );
}
