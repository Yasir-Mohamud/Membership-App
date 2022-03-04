import React from "react";
import "./Navbar.css";
import { BsPersonCircle } from "react-icons/bs";

export default function Navbar() {
  return (
    <div className="navbar">
      <span> The Holy Grail Association</span>
      <div className="dropdown">
        <BsPersonCircle />
        <div className="dropdown-content">
          <a href="/register"> Add New User</a>
          <a href="#">Logout</a>
        </div>
      </div>
    </div>
  );
}
