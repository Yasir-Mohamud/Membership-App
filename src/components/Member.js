import React from "react";

export default function Member() {
  const date = new Date().toString().slice(3, 24);
  console.log(date);

  return (
    <tr>
      <td> Yasir </td>
      <td> Yasir@email.com </td>
      <td> 11-11-1111 </td>
      <td> ACTIVE </td>
      <td> {date} </td>
    </tr>
  );
}
