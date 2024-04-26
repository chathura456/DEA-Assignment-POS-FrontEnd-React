import React, { useEffect, useState } from "react";
import { Table, Form, Button } from "react-bootstrap";
import "./Customer.css";
import { Link } from "react-router-dom";

function Customers() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    // Fetch data from the endpoint
    fetch("http://localhost:8092/api/all")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleEdit = (user) => {
    setEditUser(user);
  };

  const handleSave = () => {
    
    fetch(`http://localhost:8092/api/users/${editUser.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editUser)
    })
    .then(response => {
      if (response.ok) {
        // Handle success
        console.log(`User ${editUser.id} updated successfully.`);
        setEditUser(null); // Clear editUser after saving
  
        // Fetch updated user list and set it as state to refresh the table
        fetch("http://localhost:8092/api/all")
          .then((response) => response.json())
          .then((data) => setUsers(data))
          .catch((error) => console.error("Error fetching data:", error));
      } else {
        // Handle error
        console.error(`Failed to update user ${editUser.id}.`);
      }
    })
    .catch(error => {
      console.error('Error updating user:', error);
    });
  };
  

  const handleDelete = (id) => {
    // Implement delete functionality here
    fetch(`http://localhost:8092/api/users/${id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        // Handle success
        console.log(`User ${id} deleted successfully.`);
        // Remove the deleted user from the state
        setUsers(users.filter(user => user.id !== id));
      } else {
        // Handle error
        console.error(`Failed to delete user ${id}.`);
      }
    })
    .catch(error => {
      console.error('Error deleting user:', error);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  return (
    <div className="main-cont1">
      <h1>Users</h1>
      <Link to="/addUser">
        <Button>Add Users</Button>
      </Link>
      <br />
      <div className="table-container">
        {editUser ? (
          <div>
            <h2>Edit User</h2>
            <Form>
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  name="firstName"
                  value={editUser.firstName}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  name="lastName"
                  value={editUser.lastName}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={editUser.email}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button variant="primary" onClick={handleSave}>
                Save
              </Button>
              <Button variant="secondary" onClick={() => setEditUser(null)}>
                Cancel
              </Button>
            </Form>
          </div>
        ) : (
          <Table bordered>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td style={{ textAlign: "center" }}>
                    <span
                      role="img"
                      aria-label="edit"
                      style={{ cursor: "pointer", marginRight: "10px" }}
                      onClick={() => handleEdit(user)}
                    >
                      ✏️
                    </span>
                    <span
                      role="img"
                      aria-label="delete"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDelete(user.id)}
                    >
                      🗑️
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
}

export default Customers;
