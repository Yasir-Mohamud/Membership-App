import React from "react";
import Member from "../components/Member";
import "./HomePage.css";

export default function HomePage() {
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
            <th> NAME </th>
            <th> EMAIL </th>
            <th> PHONE NUMBER </th>
            <th> MEMBERSHIP STATUS </th>
            <th> DATE </th>
          </tr>
        </thead>
        <tbody>
          <Member />
        </tbody>
      </table>
    </div>
  );
}
