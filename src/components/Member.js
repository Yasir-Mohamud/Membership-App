import React from "react";

export default function Member(props) {
  const date = new Date().toString().slice(3, 24);
  console.log(date);
  console.log(props.member);
  return (
    <tr>
      <td> {props.member.name} </td>
      <td> {props.member.email} </td>
      <td> {props.member.phoneNumber} </td>
      <td> {props.member.isActive ? " ACTIVE " : " UNACTIVE"} </td>
      <td> {date} </td>
    </tr>
  );
}
