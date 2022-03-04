import React, { useState, useEffect } from "react";
import Member from "../components/Member";
import "./HomePage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [members, setMembers] = useState([]);
  let navigate = useNavigate();
  //   useEffect(() => {
  //     axios
  //       .get("http://localhost:4000/users/")
  //       .then((res) => setMembers(res.data))
  //       .catch((err) => console.log(`ERROR ${err}`));
  //   }, []);

  //   const membersTable = members.map((member) => {
  //     return <Member key={member._id} member={member} />;
  //   });

  return (
    <div className="home--page">
      <h1> MEMBERS OF MAYF </h1>
      <div className="filter">
        <button onClick={() => navigate("/register")}> Register User</button>
        <select>
          <option> All Members</option>
          <option> Active Members</option>
          <option> Non-Active Members</option>
        </select>
      </div>
    </div>
  );
}
