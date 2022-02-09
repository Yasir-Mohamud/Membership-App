import React, { useState, useEffect } from "react";
import Member from "../components/Member";
import "./HomePage.css";
import axios from "axios";

export default function HomePage() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/users/")
      .then((res) => setMembers(res.data))
      .catch((err) => console.log(`ERROR ${err}`));
  }, []);

  const membersTable = members.map((member) => {
    return <Member key={member._id} member={member} />;
  });

  return (
    <div className="home--page">
      <h1> MEMBERS OF THE HOLY GRAIL ASSOCIATION</h1>
      <div className="filter">
        <span> SHOW </span>
        <select>
          <option> All Members</option>
          <option> Active Members</option>
          <option> Non-Active Members</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th> Image</th>
            <th> NAME </th>
            <th> EMAIL </th>
            <th> PHONE NUMBER </th>
            <th> MEMBERSHIP STATUS </th>
            <th> DATE </th>
          </tr>
        </thead>
        <tbody>{membersTable}</tbody>
      </table>
    </div>
  );
}
