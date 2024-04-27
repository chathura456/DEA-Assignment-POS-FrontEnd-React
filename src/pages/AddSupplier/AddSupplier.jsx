import React, { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";

function AddSupplier() {
  const [supplier, setSupplier] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    contact: ""
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8092/api/AddSupplier", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(supplier),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Supplier added successfully!" });

        // Clear the input fields by resetting the supplier state
        setSupplier({
          firstName: "",
          lastName: "",
          email: "",
          address: "",
          contact: ""
        });
      } else {
        setMessage({
          type: "danger",
          text: data.message || "Error adding supplier.",
        });
      }
    } catch (error) {
      setMessage({ type: "danger", text: "Network error. Please try again." });
    }
  };

  return (
    <div className="main-cont1">
      <h1>Add Supplier</h1>
      <Container style={{ margin: "20px", width: "50%" }}>
        {message && <Alert variant={message.type}>{message.text}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={supplier.firstName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={supplier.lastName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={supplier.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={supplier.address}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="contact">
            <Form.Label>Contact No.</Form.Label>
            <Form.Control
              type="text"
              name="contact"
              value={supplier.contact}
              onChange={handleChange}
            />
          </Form.Group>

          <br />

          <Button
            variant="primary"
            type="submit"
          >
            Add Supplier
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default AddSupplier;
