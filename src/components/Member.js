import React from "react";

export default function Member(props) {
  const date = new Date().toDateString();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  console.log(tomorrow);
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
