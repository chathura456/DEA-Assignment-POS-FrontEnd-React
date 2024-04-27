import React, { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";

function AddDiscount() {
  const [discount, setDiscount] = useState({
    discountName: "",
    discountAmount: "",
    discountType: ""
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDiscount((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8092/discount/addDiscount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(discount)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Discount added successfully!" });

        // Clear the input fields by resetting the discount state
        setDiscount({
          discountName: "",
          discountAmount: "",
          discountType: ""
        });
      } else {
        setMessage({
          type: "danger",
          text: data.message || "Error adding discount."
        });
      }
    } catch (error) {
      setMessage({ type: "danger", text: "Network error. Please try again." });
    }
  };

  return (
    <div className="main-cont1">
      <h1>Add Discount</h1>
      <Container style={{ margin: "20px", width: "50%" }}>
        {message && <Alert variant={message.type}>{message.text}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="discountName">
            <Form.Label>Discount Name</Form.Label>
            <Form.Control
              type="text"
              name="discountName"
              value={discount.discountName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="discountAmount">
            <Form.Label>Discount Amount</Form.Label>
            <Form.Control
              type="number"
              name="discountAmount"
              value={discount.discountAmount}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="discountType">
            <Form.Label>Discount Type</Form.Label>
            <Form.Control
              as="select"
              name="discountType"
              value={discount.discountType}
              onChange={handleChange}
            >
              <option value="">Select Type</option>
              <option value="value">Value</option>
              <option value="percentage">Percentage</option>
            </Form.Control>
          </Form.Group>

          <br />

          <Button variant="primary" type="submit">
            Add Discount
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default AddDiscount;
