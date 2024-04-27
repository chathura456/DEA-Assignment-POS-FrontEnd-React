import React, { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import "./AddProduct.css";

function AddProduct() {
  const [product, setProduct] = useState([{
    pname: "",
    pamount: 0.0,
    quantity: 0,
  }]);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8092/products/AddProducts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Product added successfully!" });

        // Clear the input fields by resetting the user state
        setProduct({
          pname : "",
          pamount : 0.0,
          quantity : 0
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
      <h1>Add Product</h1>
      <Container style={{ margin: "20px", width: "50%" }}>
        {message && <Alert variant={message.type}>{message.text}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="firstName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              name="pname"
              value={product.pname}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="lastName">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              name="pamount"
              value={product.pamount}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Qty</Form.Label>
            <Form.Control
              type="text"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
            />
          </Form.Group>

          <br />

          <Button
            variant="primary"
            type="submit"
          >
            Add Product
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default AddProduct;
