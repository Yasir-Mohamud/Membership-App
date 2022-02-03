import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function Register() {
  const [registerUser, setRegisterUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [message, setMessage] = useState(" You are registered");
  const [error, setError] = useState("");

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
    };

    console.log(newUser);

    // axios does a post to the backend and adds the newUser to our db
    axios.post("http://localhost:4000/users/add", newUser).then((response) => {
      setIsRegistered((prev) => !prev);
      console.log(response.data);
    });
    // set the setRegisterUser to have empty string to make the form as well as allow others to register
    setRegisterUser({
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    });
    setError("");
  }

  return (
    <>
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
            pattern=""
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
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
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
          <button className="form--button" onClick={handleShow}>
            {" "}
            REGISTER
          </button>
        </form>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
