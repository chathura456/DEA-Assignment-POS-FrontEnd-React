import React, { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";

function AddUser() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8092/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "User added successfully!" });

        // Clear the input fields by resetting the user state
        setUser({
          firstName: "",
          lastName: "",
          email: "",
          password: ""
        });
      } else {
        setMessage({
          type: "danger",
          text: data.message || "Error adding user.",
        });
      }
    } catch (error) {
      setMessage({ type: "danger", text: "Network error. Please try again." });
    }
  };

  return (
    <div className="main-cont1">
      <h1>Add User</h1>
      <Container style={{ margin: "20px", width: "50%" }}>
        {message && <Alert variant={message.type}>{message.text}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
          </Form.Group>

          <br />

          <Button
            variant="primary"
            type="submit"
          >
            Add User
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default AddUser;
