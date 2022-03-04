import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Register() {
  const [registerUser, setRegisterUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    isActive: false,
    image: null,
  });
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");

  let visi = "";

  function handleChange(e) {
    const { name, value } = e.target;

    return setRegisterUser((prev) => ({ ...prev, [name]: value }));
  }

  //On file select (from the pop up)
  function onFileChange(event) {
    // Update the state
    return setRegisterUser((prev) => ({
      ...prev,
      image: event.target.files[0],
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(registerUser.image);
    if (registerUser.password !== registerUser.confirmPassword) {
      return setError("Your Password and ConfirmPassword DO NOT match !");
    }

    const formData = new FormData();

    formData.append("name", registerUser.name);
    formData.append("email", registerUser.email);
    formData.append("phoneNumber", registerUser.phoneNumber);
    formData.append("image", registerUser.image, registerUser.image.name);
    formData.append("password", registerUser.password);
    formData.append("isActive", registerUser.isActive);
    // get all the users info
    const newUser = {
      name: registerUser.name,
      email: registerUser.email,
      phoneNumber: registerUser.phoneNumber,
      password: registerUser.password,
      isActive: false,
      image: registerUser.image,
    };

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    // axios does a post to the backend and adds the newUser to our db
    axios
      .post("http://localhost:4000/users/add", formData)
      .then((response) => {
        // setIsRegistered((prev) => !prev);
        // setRegisterUser({
        //   name: "",
        //   email: "",
        //   phoneNumber: "",
        //   password: "",
        //   confirmPassword: "",
        //   isActive: false,
        // });
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

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label className="form--label" htmlFor="image">
            Upload Image
          </label>
          <br />
          <input
            id="image"
            filename="image"
            type="file"
            onChange={onFileChange}
          />
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
          <label> Date Of Birth</label>
          <br />
          <input /> <br />
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
          <label> Name of Doctor</label>
          <br />
          <input /> <br />
          <label>Allergies </label>
          <br />
          <textarea /> <br />
          <button className="form--button">REGISTER</button>
        </form>
        <p>
          Already have an account? <Link to="/"> Login</Link>
        </p>
      </div>
    </>
  );
}
