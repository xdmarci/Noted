import React from "react";

const Admin = () => {
  var users = [];

  fetch("http://localhost:3000/Admgetusers", {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-access-token": localStorage.getItem("token"),
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log(data);
        users = data;
      } else {
        console.log(data);
      }
    });

  const handleEdit = () => {};

  const renderContent = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
            {users.map((user) => (
                <tr>
                <td>{user.FelhasznaloNev}</td>
                <td>{user.Email}</td>
                <td>{user.Jelszo}</td>
                <td>
                    <button onClick={handleEdit}>Edit</button>
                    <button>Delete</button>
                </td>
                </tr>
            ))}
        </tbody>
      </table>
    );
  };

  return renderContent();
};

export default Admin;
